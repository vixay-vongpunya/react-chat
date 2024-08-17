import { Outlet } from "react-router-dom";
import SideBar from "../Components/Features/SideBar";
import ChatRoom from "../Components/Features/ChatRoom";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { fetchUser } from "../Actions/User-Action";
import { addMessagesToRooms, fetchRooms } from "../Actions/Room-Action";
import { fetchMessage } from "../Actions/Message-Action";
import InitializePusher from "../InitializePusher";
import { server } from "./../Actions/Index";
import { VscMenu } from "react-icons/vsc";
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 2fr 5fr 11fr;
  background-color: white;
  .chatroom-container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding-right: 10px;
  }
  .outlet-container {
    height: 100%;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 0.3rem;
  }
  .outlet-wrapper {
    height: 95%;
    width: 100%;
    border-radius: 0.5rem;
  }
  .side-bar {
    display: block;
  }
  .hamburger-icon {
    display: none;
  }

  @media (max-width: 391px) {
    display: flex;
    .chatroom-container {
      display: none;
    }
    .side-bar {
      display: none;
    }
    .outlet-wrapper {
      height: 100%;
    }
    .hamburger-icon {
      display: block;
    }
  }
`;
function Layout({
  user,
  rooms,
  selectedRoom,
  groups,
  fetchUser,
  fetchRooms,
  fetchMessage,
  addMessagesToRooms,
}) {
  const [message, setMessage] = useState("");

  //fetch initial data
  useEffect(() => {
    const fetchUserData = async () => {
      //since useAuth detects when route is changed doesnt applied to refreshing page need to get token
      const token = localStorage.getItem("chat_token");
      server.defaults.headers.Authorization = `Bearer ${token}`;
      await fetchUser();
    };
    fetchUserData();
  }, [fetchUser]);

  useEffect(() => {
    InitializePusher();
  }, [user]);

  useEffect(() => {
    if (rooms.length === 0) {
      const fetchData = async () => {
        const rooms = await fetchRooms();
        console.log("before", rooms);
        try {
          for (const room of rooms) {
            const messages = await fetchMessage(room);
            const isGroup = room.email ? false : true;
            addMessagesToRooms(messages, room.id, isGroup);
            console.log("msg", messages);
          }
          console.log("times");
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [rooms, addMessagesToRooms, fetchMessage, fetchRooms, user]);

  //Realtime event listener
  useEffect(() => {
    console.log("grops", groups);
    if (groups.length !== 0) {
      const groupMessageListeners = groups.map((group) => {
        const groupMessageListener = window.Echo.private(
          `group.message.${group.id}`
        );
        groupMessageListener.listen("MessageSent", (response) => {
          console.log("group Message", response);
          setMessage(response.message);
        });
        groupMessageListener.listen("MessageDeleted", (response) => {
          console.log("group Message", response);
          setMessage(response.message);
        });
        return groupMessageListener;
      });

      return () => {
        groupMessageListeners.forEach((groupMessage) => {
          groupMessage.stopListening("MessageSent");
          groupMessage.stopListening("MessageDeleted");
        });
      };
    }
  }, [groups]);
  useEffect(() => {
    if (user.length > 0) {
      const userMessage = window.Echo.private(`message.${user.id}`);
      userMessage.listen("MessageSent", (response) => {
        setMessage(response.message);
      });
      userMessage.listen("MessageDeleted", (response) => {});

      return () => {
        userMessage.stopListening("MessageSent");
        userMessage.stopListening("MessageDeleted");
      };
    }
  }, [user]);

  return (
    <Container>
      <div className="side-bar">
        <SideBar />
      </div>
      <div className="outlet-container">
        <div className="outlet-wrapper">
          <VscMenu className="hamburger-icon" size={22} />
          <Outlet context={{ message }} />
        </div>
      </div>
      <div className="chatroom-container">
        {selectedRoom && selectedRoom.id ? (
          <ChatRoom message={message} />
        ) : (
          <p>welcome!</p>
        )}
      </div>
    </Container>
  );
}
function mapStateToProps(state) {
  return {
    selectedRoom: state.roomStore.data,
    user: state.userStore.data,
    groups: state.groupStore.data,
    rooms: state.roomStore.rooms,
  };
}
export default connect(mapStateToProps, {
  fetchUser,
  fetchRooms,
  fetchMessage,
  addMessagesToRooms,
})(Layout);
