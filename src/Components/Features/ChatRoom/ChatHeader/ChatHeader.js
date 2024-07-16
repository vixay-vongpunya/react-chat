import ChatImage from "../../../Common/ChatImage";
import { styled } from "styled-components";
const Container = styled.div`
  display: flex;
  padding: 10px 15px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  .image-box:hover {
    cursor: pointer;
  }
`;
const NameBox = styled.div`
  height: 100%;
  display: grid;
  align-items: center;
  padding-left: 10px;
`;
function ChatHeader({ profile_image, name, handleProfileOpened }) {
  return (
    <Container>
      <Wrapper onClick={() => handleProfileOpened()}>
        <div className="image-box">
          <ChatImage src={profile_image} name={name} size="--medium-image" />
        </div>
        <NameBox>
          <p>{name}</p>
          <p>active</p>
        </NameBox>
      </Wrapper>
      <div className="absolute right-0"></div>
    </Container>
  );
}
export default ChatHeader;
