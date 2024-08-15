import { connect } from "react-redux";
import styled from "styled-components";
import { useMemo, useState, useEffect } from "react";
import GroupRoomListCard from "./GroupRoomListCard";
import SearchBar from "../../Custom/SearchBar";

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
  border-radius: 0.5rem;
  max-height: 480px;
  overflow-y: scroll;
  padding: 0px 5px;
`;

const RoomListDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
function GroupFriendList(props) {
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
  const friendList = roomList.map((friend, index) => (
    <GroupRoomListCard
      key={friend?.pivot ? "pivot" + friend.id : friend.id}
      friend={friend}
      onClick={props.onClick}
      clickedId={props.clickedId}
      index={index}
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
export default connect(mapStateToProps, {})(GroupFriendList);
