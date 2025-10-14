import ChatImage from "../../../Common/ChatImage";
import { styled } from "styled-components";
import ChatHeaderRight from "./ChatHeaderRight";
const Container = styled.div`
  display: flex;
  padding: 10px 15px;
  justify-content: space-between;
  align-items: center;
  .daterange-container {
    right: 1rem;
    top: 1.2rem;
  }
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  .image-box:hover {
    cursor: pointer;
  }
`;
const NameBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: space-between;
  p {
    margin: 0px;
  }
`;
function ChatHeader({ profile_image, room, handleProfileOpened }) {
  return (
    <Container>
      <Wrapper onClick={handleProfileOpened}>
        <div className="image-box">
          <ChatImage
            src={profile_image}
            name={room.name}
            size="--medium-image"
          />
        </div>
        <NameBox>
          <p className="line-clamp-1">{room.name}</p>
          <p>active</p>
        </NameBox>
      </Wrapper>
      <div className="daterange-container">
        <ChatHeaderRight
          roomId={room.pivot ? room.id : room.friendship.id}
          roomType={room.pivot ? "group" : "private"}
        />
      </div>
    </Container>
  );
}
export default ChatHeader;
