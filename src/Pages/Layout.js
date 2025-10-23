import { Outlet } from "react-router-dom";
import SideBar from "../Components/Features/SideBar";
import ChatRoom from "../Components/Features/ChatRoom";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { fetchUser } from "../Actions/User-Action";
import { fetchRooms, updateRooms } from "../Actions/Room-Action";
import { fetchMessage } from "../Actions/Message-Action";
import InitializePusher from "../InitializePusher";
import { server } from "./../Actions/Index";
import { VscMenu } from "react-icons/vsc";
const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 2fr 5fr 11fr;
  background-image: url('/default.jpg');
  overflow: hidden;

  .chatroom-container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  .outlet-container {
    height: 100%;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 0.3rem;
  }

  .outlet-wrapper {
    height: 100vh;
    width: 100%;
  }

  .side-bar {
    height: 100%;

    z-index: 1000;
    display: block;
  }
  .hamburger-icon {
    display: none;
  }

  @media (max-width: 576px) {
    .chatroom-container {
      position: fixed;  
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 2000;    
      background-image: url('/default.jpg'); 
      flex-direction: column;
      transition: transform 0.2s ease-in-out;
      transform: ${({ selectedroom }) => (selectedroom ? "translateX(0)" : "translateX(100%)")};
    }
    .side-bar {
      flex: 1;
      width: 100%;
      left: 0;
      position: absolute;
      transform: ${({ showHam }) =>
        showHam ? "translateX(0)" : "translateX(-100%)"};
      transition: transform 0.3s ease-in-out;
      z-index: 1000;
    }

    .outlet-wrapper {
      height: 95vh;
      width: 100vw;
      margin-top: 5vh;
    }

    .outlet-container {
      padding:0;
    }

    .hamburger-icon {
      position: fixed;
      top: 1rem;
      left: 1rem;
      display: ${(props) => (props.showHam ? "none" : "block")};
    }
}

  @media(orientation: landscape) and (max-width: 1367px) {
    grid-template-columns: 3fr 6fr;
    .hamburger-icon {
        position: fixed;
        top: 1rem;
        left: 1rem;
        display: ${(props) => (props.showHam ? "none" : "block")};
        
      }
    .side-bar {
      flex: 1;
      width: 20%;
      left: 0;
      position: absolute;
      transform: ${({ showHam }) =>
        showHam ? "translateX(0)" : "translateX(-100%)"};
      transition: transform 0.3s ease-in-out;
      z-index: 1000;
    }
      .outlet-wrapper {
        height: 97vh;
      }
  }
`;


const WelcomeBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;  
  justify-content: center;
  h4 {
    color: gray;
  }
    @media (max-width: 576px) {
    display:none
    }
`
function Layout({
  user,
  rooms,
  selectedRoom,
  groups,
  fetchUser,
  fetchRooms,
  fetchMessage,
  updateRooms,
}) {
  const [message, setMessage] = useState("");
  const [showHam, setShowHam] = useState(false);
  //then use ref to close

  //fetch initial data
  console.log(selectedRoom)
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
    if (rooms.length === 0) {
      const fetchData = async () => {
        const rooms = await fetchRooms();
   
        try {
          const roomList = await Promise.all(
            rooms.map(async (room, index) => {
              if (index < 5) {
                const messages = await fetchMessage(room);
                return { ...room, messages: messages };
              }
              return room;
            })
          );
          updateRooms(roomList);
        } catch (error) {
   
        }
      };
      fetchData();
      InitializePusher();
    }
  }, [rooms.length, fetchMessage, fetchRooms, updateRooms]);

  //Realtime event listener
  useEffect(() => {
   
    if (groups.length !== 0) {
      const groupMessageListeners = groups.map((group) => {
        const groupMessageListener = window.Echo.private(
          `group.message.${group.id}`
        );
        groupMessageListener.listen("MessageSent", (response) => {
   
          setMessage(response.message);
        });
        groupMessageListener.listen("MessageDeleted", (response) => {});
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
   
    if (user) {
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
    <Container showHam={showHam} selectedroom={!!selectedRoom?.id}>
      <div className="side-bar">
        <SideBar setShowHam={setShowHam} showHam={showHam} />
      </div>
      <div className="outlet-container">
        <VscMenu
          className="hamburger-icon"
          size={22}
          onClick={() => setShowHam(true)}
        />
        <div className="outlet-wrapper">
          <Outlet context={{ message, setMessage }} />
        </div>
        
      </div>
      <div className="chatroom-container">
        {selectedRoom && selectedRoom.id ? (
          <ChatRoom
            message={message}
            setMessage={setMessage}
            selectedRoom={selectedRoom}
          />
        ) : (
          <WelcomeBox>
            <h4>welcome!</h4>
          </WelcomeBox>
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
  updateRooms,
})(Layout);
