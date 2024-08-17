import FriendList from "../Components/Features/FriendList";
import { changeRoom } from "../Actions/Room-Action";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { styled } from "styled-components";
import AppendMessage from "../Utils/AppendMessage";
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

function Home(props) {
  const [roomList, setRoomList] = useState([]);
  const [clickedId, setClickedId] = useState(null);
  const { message } = useOutletContext();

  //append new message
  useEffect(() => {
    const data = AppendMessage(props.userMessage, roomList);
    setRoomList(data);
  }, [roomList, props.userMessage]);
  useEffect(() => {
    const data = AppendMessage(message, roomList);
    setRoomList(data);
  }, [roomList, message]);

  useEffect(() => {
    //this state updates alot since i append messages in background
    setRoomList(props.rooms);
  }, [roomList, props.rooms]);

  const changeRoom = (friend) => {
    setClickedId(friend.email ? "user" + friend.id : "group" + friend.id);
    console.log("data2", friend);
    props.changeRoom(friend);
  };

  return (
    <Container>
      <h2>Chats</h2>
      <FriendList
        onClick={changeRoom}
        roomList={roomList}
        clickedId={clickedId}
      />
    </Container>
  );
}
function mapStateToProps(state) {
  return {
    userMessage: state.messageStore.userMessage,
    rooms: state.roomStore.rooms,
    user: state.userStore.data,
  };
}
export default connect(mapStateToProps, {
  changeRoom,
})(Home);
