import { connect } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { server } from "./../../../../Actions/Index";
import { styled } from "styled-components";

import {
  fetchMessage,
  updateRoomMessage,
} from "../../../../Actions/Message-Action";
import Message from "./Message";

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
  padding: 0px 10px;
`;
const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 2px;
`;

function Body(props) {
  const { user, setMessages, messages } = props;
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // have room usestate here to match prior and current room

  const messageEndRef = useRef([]);
  // useEffect(() => {
  //already update at home.js so no need for this, but kept just in case
  //   // need the check room.id since when updating profile image causes unexpected outdated data update. referred to at room-reducer(update_group_profile)
  //   // group and normal room can possibly have the same id, so message wont change

  //   // in case the room doesnt have latest_message
  //   // i dont want to update redux everytime. So, only update just before selectedRoom is changed

  //   if (room === undefined || selectedRoom.id !== room.id) {
  //     let latest_message = null;
  //     if (messages.length !== 0) {
  //       const formattedDate = FormatDate(messages[0].created_at);
  //       latest_message = { ...messages[0], format_date: formattedDate };
  //     }

  //     //this is where room is needed
  //     const oldRoomData = {
  //       ...room,
  //       messages: messages,
  //       latest_message: latest_message,
  //     };
  //     console.log("latestMsg", latest_message);
  //     updateRoomMessage(oldRoomData);
  //     setMessages(selectedRoom.messages);
  //     setRoom(selectedRoom);
  //   }
  // }, [selectedRoom, updateRoomMessage, setMessages, messages, room]);

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
  console.log("the msg", messages);
  const messageList = messages?.map((message, index) => {
    let isPrevId = message.sender_id === messages[index + 1]?.sender_id;

    return (
      //make ul later
      <div key={message.id}>
        {user.id === message.sender_id ? (
          <MessageContainer>
            <Message
              index={index}
              user={user}
              message={message}
              deleteMessage={deleteMessage}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          </MessageContainer>
        ) : (
          <SenderDiv
            $destinationType={message.destination_type}
            $isPrevId={isPrevId}
          >
            <p className="sender-name">{message.sender.name}</p>
            <Message
              index={index}
              user={user}
              message={message}
              deleteMessage={deleteMessage}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
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
    loading: state.messageStore.loading,
    user: state.userStore.data,
    groups: state.groupStore.data,
  };
}
export default connect(mapStateToProps, { updateRoomMessage, fetchMessage })(
  Body
);
