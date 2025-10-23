import { connect } from "react-redux";
import styled from "styled-components";
import { useMemo, useState, useEffect } from "react";
import RoomListCard from "../Custom/RoomListCard";
import SearchBar from "../Custom/SearchBar";
const RoomListDiv = styled.div`
  flex: 1;
  overflow-y: auto;
`;
const FriendContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  background-color: white;
  border-radius: var(--border-radius);
  gap: 10px;
  overflow:hidden;
  flex: 1;
  @media (max-width: 576px) {
    border-radius: 0;
    padding-bottom:0;
  }

  `;

function FriendList(props) {
  const [keyword, setKeyword] = useState("");
  const roomList = useMemo(() => {
    if (keyword.trim() !== "") {
      return props.roomList.filter((room) =>
        room.name.toLowerCase().includes(keyword.toLowerCase())
      );
    } else {
      return props.roomList;
    }
  }, [keyword, props.roomList]);

  useEffect(() => {
    if (props.message) {
      roomList.map((room) => {
        if (
          room.latest_message?.destination_id ===
          props.userMessage?.destination_id
        ) {
          return {
            ...room,
            latest_message: props.userMessage,
          };
        } else {
          return room;
        }
      });
    }
  }, [props.message, props.userMessage, roomList]);
  const friendList = roomList.map((friend) => (
    <RoomListCard
      key={friend?.pivot ? "pivot" + friend.id : friend.id}
      friend={friend}
      onClick={props.onClick}
      clickedId={props.clickedId}
    />
  ));

  return (
    <FriendContainer>
      <SearchBar
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="search..."
      />
      <RoomListDiv className="no-scrollbar">{friendList}</RoomListDiv>
    </FriendContainer>
  );
}

function mapStateToProps(state) {
  return {
    userMessage: state.messageStore.userMessage,
  };
}
export default connect(mapStateToProps, {})(FriendList);
