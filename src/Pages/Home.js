import FullFriendList from "../Components/Features/FullFriendList";
import { changeRoom, fetchRooms } from "../Actions/Room-Action";
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
  padding: 0px 5px;
  gap: 10px;
`;

function Home(props) {
  const [roomList, setRoomList] = useState([]);
  const [clickedId, setClickedId] = useState(null);
  const { message } = useOutletContext();
  useEffect(() => {
    if (props.rooms.length === 0) props.fetchRooms();
  }, []);

  //append new message
  useEffect(() => {
    const data = AppendMessage(props.userMessage, roomList);
    setRoomList(data);
  }, [props.userMessage]);
  useEffect(() => {
    const data = AppendMessage(message, roomList);
    setRoomList(data);
  }, [message]);

  useEffect(() => {
    setRoomList(props.rooms);
  }, [props.rooms]);

  const changeRoom = (friend) => {
    setClickedId(friend.email ? "user" + friend.id : "group" + friend.id);
    const data = friend;
    props.changeRoom(data);
  };

  return (
    <Container>
      <h2>Chats</h2>
      <FullFriendList
        onClick={changeRoom}
        roomList={roomList}
        height={630}
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
  fetchRooms,
  changeRoom,
})(Home);
