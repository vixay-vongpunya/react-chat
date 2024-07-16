import { Outlet } from "react-router-dom";
import SideBar from "../Components/Features/SideBar";
import ChatRoom from "../Components/Features/ChatRoom";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { fetchUser } from "../Actions/User-Action";
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 2fr 5fr 11fr;
  background-color: white;
  .chat-room-container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding-right: 10px;
  }
  .outlet-container {
    height: fit;
    display: flex;
    align-items: center;
    width: 100%;

    padding: 0 0.5rem;
    .outlet-wrapper {
      height: 90%;
      width: 100%;
      border-radius: 0.5rem;
    }
  }
`;
function Layout({ user, room, groups, fetchUser }) {
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (user.length === 0) fetchUser();
  }, []);
  useEffect(() => {
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
  }, [groups]);
  useEffect(() => {
    const userMessage = window.Echo.private(`message.${user.id}`);
    userMessage.listen("MessageSent", (response) => {
      setMessage(response.message);
    });
    userMessage.listen("MessageDeleted", (response) => {});

    return () => {
      userMessage.stopListening("MessageSent");
      userMessage.stopListening("MessageDeleted");
    };
  }, [user]);
  return (
    <Container>
      <SideBar />
      <div className="outlet-container">
        <div className="outlet-wrapper">
          <Outlet context={{ message }} />
        </div>
      </div>
      <div className="chat-room-container">
        {room && room.id ? <ChatRoom message={message} /> : <p>welcome!</p>}
      </div>
    </Container>
  );
}
function mapStateToProps(state) {
  return {
    room: state.roomStore.data,
    user: state.userStore.data,
    groups: state.groupStore.data,
  };
}
export default connect(mapStateToProps, { fetchUser })(Layout);
