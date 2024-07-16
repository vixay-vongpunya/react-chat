import ChatHeader from "./ChatRoom/ChatHeader/ChatHeader";
import Body from "./ChatRoom/ChatBody/Body";
import ChatInput from "./ChatRoom/ChatInput";
import RoomProfile from "./RoomProfile/RoomProfile";
import { connect } from "react-redux";
import { useState } from "react";
import { styled } from "styled-components";
const Container = styled.div`
  display: flex;
  width: 100%;
`;
const Wrapper = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: ${(props) =>
    props.$profileOpened ? "6fr 3fr" : " 1fr"};
  align-items: center;
  border: solid 1px white;
  border-radius: 10px;
  background-color: var(--background-color);
`;
const ChatroomContainer = styled.div`
  height: 90vh;
  display: grid;
  grid-template-rows: 2fr 14fr 1fr;
`;

const ProfileContainer = styled.div`
  height: 90vh;
  align-items: center;
  border-left: solid 1px white;
`;
function ChatRoom({ user, room, message }) {
  const [profileOpened, setProfileOpened] = useState(true);
  return (
    <Container>
      <Wrapper $profileOpened={profileOpened}>
        <ChatroomContainer>
          <ChatHeader
            name={room.name}
            profile_image={room.profile?.profile_image}
            handleProfileOpened={() => setProfileOpened((prev) => !prev)}
          />
          <Body room={room} message={message} />
          <ChatInput room={room} />
        </ChatroomContainer>
        {profileOpened && (
          <ProfileContainer>
            <RoomProfile
              room={room}
              handleProfileOpened={() => setProfileOpened((prev) => !prev)}
            />
          </ProfileContainer>
        )}
      </Wrapper>
    </Container>
  );
}
function mapStateToProps(state) {
  return { room: state.roomStore.data };
}
export default connect(mapStateToProps, {})(ChatRoom);
