import FriendList from "../Components/Features/FriendList";
import { changeRoom, updateRooms } from "../Actions/Room-Action";
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
    setRoomList((prev) => AppendMessage(props.userMessage, prev));
  }, [props.userMessage]);
  useEffect(() => {
    setRoomList((prev) => AppendMessage(message, prev));
  }, [message]);

  useEffect(() => {
    setRoomList(props.rooms);
  }, [props.rooms]);

  const changeRoom = (friend) => {
    setClickedId(friend.email ? "user" + friend.id : "group" + friend.id);
    console.log("data2", friend);
    //updateRooms, to update the order of chatrooms
    props.updateRooms(roomList);
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
  updateRooms,
})(Home);
