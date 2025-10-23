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
  width: 100%;
  align-items: center;
  overflow-x: hidden;
  position: relative;
`;
const ChatroomContainer = styled.div`
  height: 100vh;
  transition: width 0.2s ease-in;
  padding: 2rem 1rem;
  display: grid;
  position: relative;
  width: ${(props) => (props.$profileOpened ? "65%" : "100%")};
  grid-template-rows: ${(props) =>
    props.$toolsOpened ? "1fr 11fr 4fr" : "1fr 14fr 1fr"};
  h4 {
    color: gray;
  }

  @media (max-width: 576px) {
    padding: 0.5rem;
    width: 100%;
  }
`;

const ProfileContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 35%;
  overflow-x: hidden;
  transition: right 0.2s ease-in;

  right: ${(props) => (props.$profileOpened ? "0" : "-35%")};

  @media (max-width: 576px) {
    width: 100vw;
    position: fixed;
    right: ${(props) => (props.$profileOpened ? "0" : "-100%")};
    z-index: 2000;
    transition: right 0.3s ease;
  }
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
  if (!selectedRoom) return;

  const loadMessages = async () => {
    setLoading(true);
    emptyUserMessage();

    let messagesData = [];
    if (!selectedRoom.messages) {
      messagesData = await fetchMessage(selectedRoom);
    } else {
      messagesData = selectedRoom.messages;
    }

    setRoom(selectedRoom);
    setMessages(messagesData);
    setLoading(false);
  };

  loadMessages();
}, [selectedRoom, fetchMessage, emptyUserMessage]);

  

  //reason for moving realtime mgs here is, when the selecetdRoom doesnt have messages, it will trigger body to re-render, causing userMessage
  // to run again making userMessage saved on the new clicked room
  useEffect(() => {
    if (selectedRoom.friendship) {
      if (userMessage.destination_id === selectedRoom.friendship.id) {
        setMessages((prev) => {
          if (prev)  return [userMessage, ...prev]
          else return [userMessage]
        });
      }
    } else {
      if (userMessage.destination_id === selectedRoom.id) {
        setMessages((prev) => {
          if (prev)  return [userMessage, ...prev]
          else return [userMessage]
        });
      }
    }
  }, [userMessage, selectedRoom]);
  useEffect(() => {
    if (selectedRoom.friendship) {
      if (message.destination_id === selectedRoom.friendship.id) {
        setMessages((prev) => {
          if (prev)  return [message, ...prev]
          else return [message]
        });
      }
    } else {
      if (message.destination_id === selectedRoom.id) {
        setMessages((prev) => {
          if (prev)  return [message, ...prev]
          else return [message]
        });
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
              <h4>loading...</h4>
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
