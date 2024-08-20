import { connect } from "react-redux";
import styled from "styled-components";
import { useMemo, useState, useEffect } from "react";
import RoomListCard from "../Custom/RoomListCard";
import SearchBar from "../Custom/SearchBar";
const RoomListDiv = styled.div`
  height: 680px;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px 10px;
  background-color: var(--background-color);
  border-radius: var(--border-radius);
  gap: 10px;
`;
const Wrapper = styled.div`
  width: 100%;
  border-radius: 0.5rem;
  overflow-y: auto;
  padding: 0px 5px;
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
  }, [props.message]);
  const friendList = roomList.map((friend) => (
    <RoomListCard
      key={friend?.pivot ? "pivot" + friend.id : friend.id}
      friend={friend}
      onClick={props.onClick}
      clickedId={props.clickedId}
    />
  ));

  return (
    <Container>
      <SearchBar
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="search..."
      />
      <Wrapper className="no-scrollbar">
        <RoomListDiv>{friendList}</RoomListDiv>
      </Wrapper>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    userMessage: state.messageStore.userMessage,
  };
}
export default connect(mapStateToProps, {})(FriendList);
