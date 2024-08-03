import ChatImage from "./../Common/ChatImage";
import styled from "styled-components";
const RoomListCardDiv = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;
  margin-bottom: 5px;
  padding: 5px 10px;
  background-color: ${(props) =>
    props.$friend.email
      ? "user" + props.$friend.id === props.clickedId && "var(--hover-color)"
      : "group" + props.$friend.id === props.clickedId && "var(--hover-color)"};
`;
const RoomDetail = styled.div`
  display: grid;
  width: 100%;
  align-items: center;
  padding-left: 10px;
`;
const MessageContainer = styled.div`
  display: flex;
  p {
    color: grey;
  }
`;
function RoomListCard({ friend, onClick, clickedId }) {
  console.log("clcikedID", clickedId);
  return (
    <RoomListCardDiv
      onClick={() => onClick && onClick(friend)}
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
        <MessageContainer>
          <p>
            {friend.latest_message?.content && (
              <>
                {friend.latest_message.content.slice(0, 10)}
                {friend.latest_message.content.length > 10 && "..."}
                {"・"}
              </>
            )}
            {friend.latest_message?.format_date &&
              friend.latest_message?.format_date}
          </p>
        </MessageContainer>
      </RoomDetail>
    </RoomListCardDiv>
  );
}

export default RoomListCard;
