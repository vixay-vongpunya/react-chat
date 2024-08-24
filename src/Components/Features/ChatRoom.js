import ChatHeader from "./ChatRoom/ChatHeader/ChatHeader";
import Body from "./ChatRoom/ChatBody/Body";
import ChatInput from "./ChatRoom/ChatInput";
import RoomProfile from "./RoomProfile/RoomProfile";
import { emptyUserMessage, fetchMessage } from "../../Actions/Message-Action";
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
function ChatRoom({
  selectedRoom,
  message,
  fetchMessage,
  userMessage,
  emptyUserMessage,
}) {
  const [profileOpened, setProfileOpened] = useState(false);
  const [toolsOpened, setToolsOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState({});
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setRoom(selectedRoom);
    emptyUserMessage();
    if (!selectedRoom.messages) {
      setLoading(true);
      const fetchData = async () => {
        console.log("selectedRoom", selectedRoom);
        const messages = await fetchMessage(selectedRoom);

        setRoom((prev) => ({ ...prev, messages: messages }));
        setMessages(selectedRoom.messages);
        setLoading(false);
      };
      fetchData();
    } else {
      setMessages(selectedRoom.messages);
      setLoading(false);
    }
  }, [selectedRoom, fetchMessage, emptyUserMessage]);

  //reason for moving realtime mgs here is, when the selecetdRoom doesnt have messages, it will trigger body to re-render, causing userMessage
  // to run again making userMessage saved on the new clicked room
  useEffect(() => {
    if (selectedRoom.friendship) {
      if (userMessage.destination_id === selectedRoom.friendship.id) {
        setMessages((prev) => [userMessage, ...prev]);
      }
    } else {
      if (userMessage.destination_id === selectedRoom.id) {
        setMessages((prev) => [userMessage, ...prev]);
      }
    }
  }, [userMessage, selectedRoom]);
  useEffect(() => {
    if (selectedRoom.friendship) {
      if (message.destination_id === selectedRoom.friendship.id) {
        setMessages((prev) => [message, ...prev]);
      }
    } else {
      if (message.destination_id === selectedRoom.id) {
        setMessages((prev) => [message, ...prev]);
      }
    }
  }, [message, selectedRoom]);
  return (
    <Container>
      <Wrapper>
        <ChatroomContainer
          $toolsOpened={toolsOpened}
          $profileOpened={profileOpened}
        >
          <ChatHeader
            room={selectedRoom}
            profile_image={selectedRoom.profile?.profile_image}
            handleProfileOpened={() => setProfileOpened((prev) => !prev)}
          />
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <p>loading...</p>
            </div>
          ) : (
            <Body
              selectedRoom={room}
              message={message}
              setMessages={setMessages}
              messages={messages}
            />
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
  return {
    userMessage: state.messageStore.userMessage,
  };
}
export default connect(mapStateToProps, { fetchMessage, emptyUserMessage })(
  ChatRoom
);
