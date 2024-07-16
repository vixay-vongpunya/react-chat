import { useMemo, useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import SearchBar from "../Custom/SearchBar";
import RoomListCard from "../Custom/RoomListCard";
import FriendList from "./FriendList";
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
  width: 90%;
  border-radius: 0.5rem;
  overflow-y: auto;
  padding: 0px 5px;
`;
function FullFriendList(props) {
  const [keyword, setKeyword] = useState("");
  const roomList = useMemo(() => {
    if (keyword.trim() != "") {
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

  return (
    <Container>
      <SearchBar
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="search..."
      />
      <Wrapper className="no-scrollbar">
        <FriendList
          roomList={roomList}
          height={props.height}
          onClick={props.onClick}
        />
      </Wrapper>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    userMessage: state.messageStore.userMessage,
  };
}
export default connect(mapStateToProps, {})(FullFriendList);
