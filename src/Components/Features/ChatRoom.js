import ChatHeader from "./ChatRoom/ChatHeader/ChatHeader";
import Body from "./ChatRoom/ChatBody/Body";
import ChatInput from "./ChatRoom/ChatInput";
import RoomProfile from "./RoomProfile/RoomProfile";
import { fetchMessage } from "../../Actions/Message-Action";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
const Container = styled.div`
  display: flex;
  width: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  border: solid 1px white;
  border-radius: 10px;
  background-color: var(--background-color);
  overflow-x: hidden;
  position: relative;
`;
const ChatroomContainer = styled.div`
  height: 95vh;
  transition: width 0.2s ease-in;
  display: grid;
  position: relative;
  width: ${(props) => (props.$profileOpened ? "65%" : "100%")};
  grid-template-rows: ${(props) =>
    props.$toolsOpened ? "2fr 11fr 4fr" : "2fr 14fr 1fr"};
`;

const ProfileContainer = styled.div`
  position: absolute;
  right: ${(props) => (props.$profileOpened ? "0" : "-35%")};
  height: 100%;
  width: 35%;
  overflow-x: hidden;
  transition: right 0.2s ease-in;
  border-left: 2px solid white;
`;
function ChatRoom({ user, selectedRoom, message, fetchMessage }) {
  const [profileOpened, setProfileOpened] = useState(false);
  const [toolsOpened, setToolsOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState({});
  useEffect(() => {
    setRoom(selectedRoom);
    if (!room.messages) {
      setLoading(true);
      const fetchData = async () => {
        console.log("selectedRoom", selectedRoom);
        const messages = await fetchMessage(selectedRoom);
        setRoom((prev) => ({ ...prev, messages: messages }));
        setLoading(false);
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, [selectedRoom]);
  return (
    <Container>
      <Wrapper>
        <ChatroomContainer
          $toolsOpened={toolsOpened}
          $profileOpened={profileOpened}
        >
          <ChatHeader
            room={room}
            profile_image={room.profile?.profile_image}
            handleProfileOpened={() => setProfileOpened((prev) => !prev)}
          />
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <p>loading...</p>
            </div>
          ) : (
            <Body selectedRoom={room} message={message} />
          )}

          <ChatInput room={room} setToolsOpened={setToolsOpened} />
        </ChatroomContainer>

        <ProfileContainer $profileOpened={profileOpened}>
          <RoomProfile
            room={room}
            handleProfileOpened={() => setProfileOpened((prev) => !prev)}
          />
        </ProfileContainer>
      </Wrapper>
    </Container>
  );
}
function mapStateToProps(state) {
  return { selectedRoom: state.roomStore.data };
}
export default connect(mapStateToProps, { fetchMessage })(ChatRoom);
