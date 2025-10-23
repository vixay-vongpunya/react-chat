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
  overflow: auto;
  width: 100%;
  padding: 0 1rem;
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

const RequestContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  
  h4{
    padding-left:1rem;
  }
`;

const RequestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: var(--border-radius);
  background-color: white;
  padding: 1rem;
  gap: 1rem;
  flex: 1;
  overflow: hidden;
  @media (max-width: 576px) {
    border-radius: 0;
  }
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
      <h4>Friend requests</h4>
      <RequestWrapper>
        <SearchBar
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="search..."
        />
        <RoomListDiv className="no-scrollbar">{friendList}</RoomListDiv>
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
