import ChatImage from "./../Common/ChatImage";
import styled from "styled-components";
import SlicedFilename from "./../../Utils/SlicedFilename";
const RoomListCardDiv = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;
  margin-bottom: 5px;
  padding: 5px 10px;
  background-color: ${(props) =>
    props.$friend.email
      ? "user" + props.$friend.id === props.$clickedId && "var(--hover-color)"
      : "group" + props.$friend.id === props.$clickedId &&
        "var(--hover-color)"};

  p {
    margin: 0px;
  }
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
  .created-time {
    margin-left: 5px;
  }
`;
function RoomListCard({ friend, onClick, clickedId }) {
  const {name, extension} = SlicedFilename(friend.latest_message?.content || "");
  return (
    <RoomListCardDiv
      onClick={() => onClick && onClick(friend)}
      $clickedId={clickedId}
      $friend={friend}
    >
      <ChatImage
        src={friend.profile?.profile_image}
        name={friend.name}
        size="--medium-image"
      />
      <RoomDetail>
        <p className="flex-1">{friend.name}</p>
        {friend.latest_message && (
          <MessageContainer>
            {friend.latest_message.message_type === "file" ? (
              <p className="line-clamp-1">{name}.{extension}</p>
            ) : (
              <p className="line-clamp-1">
                {friend.latest_message.content}
              </p>
            )}
            <p className="created-time">
              {friend.latest_message?.format_date &&
                friend.latest_message?.format_date}
            </p>
          </MessageContainer>
        )}
      </RoomDetail>
    </RoomListCardDiv>
  );
}

export default RoomListCard;
