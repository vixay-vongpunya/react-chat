import ChatImage from "../../Common/ChatImage";
import styled from "styled-components";
const RoomListCardDiv = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;
  margin-bottom: 5px;
  padding: 5px 10px;
  background-color: ${(props) => props.$friend.clicked && "var(--hover-color)"};
`;
const RoomDetail = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-left: 10px;
`;

function GroupRoomListCard({ friend, onClick, clickedId, index }) {
   
  return (
    <RoomListCardDiv
      onClick={() => onClick(friend, index)}
      clickedId={clickedId}
      $friend={friend}
    >
      <ChatImage
        src={friend.profile?.profile_image}
        name={friend.name}
        size="--medium-image"
      />
      <RoomDetail>
        <p>{friend.name}</p>
      </RoomDetail>
    </RoomListCardDiv>
  );
}

export default GroupRoomListCard;
