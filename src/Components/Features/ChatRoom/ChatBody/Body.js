import MessageTool from "./MessageTool";
import { connect } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { server } from "./../../../../Actions/Index";
import { styled } from "styled-components";
import FormatDate from "../../../../Utils/FormatDate";
import {
  fetchMessage,
  updateRoomMessage,
} from "../../../../Actions/Message-Action";
import File from "../../File";

const SenderDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 2px;
  .sender-name {
    margin: 0px;
    margin-top: 10px;
    display: ${(props) =>
      props.$destinationType === "group" && !props.$isPrevId
        ? "block"
        : "none"};
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: full;
  overflow-y: auto;
  padding: 0px 5px;
`;
const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 2px;
`;
const MessageBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 100%;
  width: 80%;
  .message {
    border: solid 1px black;
    border-radius: var(--border-radius);
    padding: 2px 5px;
    display: block;
    margin: 0px;
  }
`;
function Body(props) {
  const {
    user,
    message,
    selectedRoom,
    userMessage,
    updateRoomMessage,
    groups,
  } = props;
  const [HoveredIndex, setHoveredIndex] = useState(null);
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState();

  const messageEndRef = useRef([]);

  useEffect(() => {
    // need the check room.id since when updating profile image causes unexpected outdated data update. referred to at room-reducer(update_group_profile)
    // group and normal room can possibly have the same id, so message wont change
    if (room && selectedRoom.id !== room.id) {
      // in case the room doesnt have latest_message
      // i dont want to update redux everytime. So, only update just before selectedRoom is changed
      let latest_message = null;
      if (messages.length !== 0) {
        const formattedDate = FormatDate(messages[0].created_at);
        latest_message = { ...messages[0], format_date: formattedDate };
      }

      const newRoomData = {
        ...room,
        messages: messages,
        latest_message: latest_message,
      };
      console.log("new data", newRoomData);
      updateRoomMessage(newRoomData);
    }

    setMessages(selectedRoom.messages);
    setRoom(selectedRoom);
  }, [selectedRoom]);

  useEffect(() => {
    if (userMessage) {
      setMessages((prev) => [userMessage, ...prev]);
    }
  }, [userMessage]);

  useEffect(() => {
    if (
      message.destination_type === "group" &&
      message.destination_id === room.id
    ) {
      setMessages((prev) => [message, ...prev]);
    } else if (
      message.destination_type === "user" &&
      message.destination_id === room.friendship_id
    ) {
      setMessages((prev) => [message, ...prev]);
    }
  }, [message]);

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const deleteMessage = (message) => {
    server
      .delete(`message/${message.id}`)
      .then((response) =>
        setMessages((prev) => prev.filter((msg) => msg.id !== message.id))
      );
  };

  const messageList = messages.map((message, index) => {
    let isPrevId = message.sender_id === messages[index + 1]?.sender_id;
    return (
      //make ul later
      <div key={message.id}>
        {user.id === message.sender_id ? (
          <MessageContainer>
            <MessageBox>
              <div className="w-full h-full flex justify-end">
                <div className="flex items-center">
                  <div
                    className={` ${
                      HoveredIndex === index ? "visible" : "invisible"
                    }`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <MessageTool
                      message={message}
                      user={user}
                      deleteMessage={deleteMessage}
                    />
                  </div>
                </div>

                <div
                  className="message"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {message.message_type === "file" ? (
                    <File file={message.file} file_name={message.content} />
                  ) : (
                    <p>{message.content}</p>
                  )}
                </div>
              </div>
            </MessageBox>
          </MessageContainer>
        ) : (
          <SenderDiv
            $destinationType={message.destination_type}
            $isPrevId={isPrevId}
          >
            <p className="sender-name">{message.sender.name}</p>
            <MessageBox>
              <div
                className="message"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {message.message_type === "file" ? (
                  <File file={message.file} file_name={message.content} />
                ) : (
                  <p>{message.content}</p>
                )}
              </div>
              <div className="flex h-full">
                <div
                  className={`${
                    HoveredIndex === index ? "visible" : "invisible"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <MessageTool
                    message={message}
                    user={user}
                    deleteMessage={deleteMessage}
                  />
                </div>
              </div>
            </MessageBox>
          </SenderDiv>
        )}
      </div>
    );
  });

  return (
    <Container ref={messageEndRef} className="no-scrollbar">
      {messageList}
    </Container>
  );
}
function mapStateToProps(state) {
  return {
    userMessage: state.messageStore.userMessage,
    loading: state.messageStore.loading,
    user: state.userStore.data,
    groups: state.groupStore.data,
  };
}
export default connect(mapStateToProps, { updateRoomMessage, fetchMessage })(
  Body
);
