import { connect } from "react-redux";
import styled from "styled-components";

import RoomListCard from "../Custom/RoomListCard";

const RoomListDiv = styled.div`
  height: ${(props) => props.height}px;
`;

function FriendList(props) {
  const friendList = props.roomList.map((friend) => (
    <RoomListCard
      key={friend.pivot ? "pivot" + friend.id : friend.id}
      friend={friend}
      onClick={props.onClick}
      clickedId={props.clickedId}
      isPendingFriendship={props.isPendingFriendship}
    />
  ));

  return <RoomListDiv height={props.height}>{friendList}</RoomListDiv>;
}

function mapStateToProps(state) {
  return {
    userMessage: state.messageStore.userMessage,
  };
}
export default connect(mapStateToProps, {})(FriendList);
