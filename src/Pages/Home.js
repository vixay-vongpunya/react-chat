import FriendList from "../Components/Features/FriendList";
import { changeRoom, updateRooms } from "../Actions/Room-Action";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { styled } from "styled-components";
import AppendMessage from "../Utils/AppendMessage";
import SmallUserCard from "../Components/Features/SmallUserCard"
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem 0 2rem 1rem;
  gap: 1rem;
  @media (max-width: 576px) {
    padding: 0; 
  }
`;

function Home(props) {
  const [roomList, setRoomList] = useState([]);
  const [clickedId, setClickedId] = useState(null);
  const { message, setMessage } = useOutletContext();


  //append new message
  useEffect(() => {
    if (props.userMessage) {
      setRoomList((prev) => AppendMessage(props.userMessage, prev));
    }
  }, [props.userMessage]);
  useEffect(() => {
    if (message) {
      setRoomList((prev) => AppendMessage(message, prev));
    }
  }, [message]);

  useEffect(() => {
    setRoomList(props.rooms);
  }, [props.rooms]);

  const changeRoom = (friend) => {
    setClickedId(friend.email ? "user" + friend.id : "group" + friend.id);
   
    //updateRooms, to update the order of chatrooms
    setMessage("");
    
    
    props.updateRooms(roomList);
    props.changeRoom(friend);
  };

  return (
    <Container>
      <Link to="/user/Profile" className="decoration-transparent">
        <div>
          <SmallUserCard user={props.user}/>
        </div>
      </Link>
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
