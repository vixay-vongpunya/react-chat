import { styled } from "styled-components";
import { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";

import {
  fetchPendingFriendship,
  acceptFriendship,
  declineFriendship,
} from "../../../Actions/Friend-Action";
import SearchBar from "./../../Custom/SearchBar";
import Button from "./../../Common/Button";
import RoomListCard from "./../../Custom/RoomListCard";

const RoomListDiv = styled.div`
  height: 517px;
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const ActionContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding-bottom: 10px;
  .button-box {
    display: flex;
    width: 100%;
    padding-bottom: 5px;
    gap: 2px;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  border-radius: 0.5rem;
  overflow-y: auto;
  padding: 0px 5px;
`;
const RequestContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 10px;
`;
const RequestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

function FriendRequest({
  fetchPendingFriendship,
  acceptFriendship,
  declineFriendship,
  friends,
}) {
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    if (friends.length === 0) {
      fetchPendingFriendship();
    }
  }, [fetchPendingFriendship, friends]);
  const sortedRooms = useMemo(() => {
    return friends.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
  }, [friends]);
  const roomList = useMemo(() => {
    if (keyword.trim() !== "") {
      return sortedRooms.filter((room) =>
        room.name.toLowerCase().includes(keyword.toLowerCase())
      );
    } else {
      return sortedRooms;
    }
  }, [keyword, sortedRooms]);
  const friendList = roomList.map((friend) => (
    <CardWrapper key={friend.id}>
      <RoomListCard friend={friend} />
      <ActionContainer>
        <div className="button-box">
          <Button
            text="decline"
            borderColor="red"
            onClick={() => declineFriendship(friend)}
          />
          <Button
            text="accept"
            primary
            onClick={() => acceptFriendship(friend)}
          />
        </div>
      </ActionContainer>
    </CardWrapper>
  ));
  return (
    <RequestContainer>
      <h4>Friend Requests</h4>
      <RequestWrapper>
        <SearchBar
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="search..."
        />
        <Wrapper className="no-scrollbar">
          <RoomListDiv>{friendList}</RoomListDiv>
        </Wrapper>
      </RequestWrapper>
    </RequestContainer>
  );
}
function mapStateToProps(state) {
  return {
    friends: state.friendStore.pendingFriendship,
  };
}
export default connect(mapStateToProps, {
  fetchPendingFriendship,
  acceptFriendship,
  declineFriendship,
})(FriendRequest);
