import MessageTool from "./MessageTool";
import { connect } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { server } from "./../../../../Actions/Index";
import { styled } from "styled-components";
import { deleteMessage } from "../../../../Actions/Message-Action";
import { fetchMessage } from "../../../../Actions/Message-Action";
const SenderDiv = styled.div`
  display:flex;
  flex-direction:column;
  .sender-name {
    display: ${(props) =>
      props.$destinationType === "group" && !props.$isPrevId
        ? "block"
        : "none"}}; 
    margin-top:5px;    
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
  flex-direction: row-reverse;
  padding: 2px;
`;
const MessageBox = styled.div`
  display: flex;
  span {
    border: solid 1px black;
    border-radius: var(--border-radius);
    padding: 2px 5px;
    display: "block";
  }
`;
function Body(props) {
  const { user, message, room, userMessage, roomMessages, groups } = props;
  const [HoveredIndex, setHoveredIndex] = useState(null);
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef([]);

  useEffect(() => {
    //loading messages
    if (room) {
      console.log("23", room);
      const type = room.email ? "user" : "group";
      const id = room.email ? room.friendship_id : room.id;
      props.fetchMessage(id, type);
    }
  }, [room]);

  useEffect(() => {
    if (roomMessages) {
      console.log("just vef", roomMessages);
      setMessages(roomMessages);
    }
  }, [roomMessages]);

  useEffect(() => {
    if (userMessage) {
      setMessages((prev) => [userMessage, ...prev]);
      scrollToBottom();
    }
  }, [userMessage]);

  useEffect(() => {
    //when it is user-user
    if (
      message.destination_type === "group" &&
      message.destination_id === room.id
    ) {
      setMessages((prev) => [message, ...prev]);
      scrollToBottom();
    } else if (
      message.destination_type === "user" &&
      message.destination_id === room.friendship_id
    ) {
      setMessages((prev) => [message, ...prev]);
      scrollToBottom();
    }
  }, [message]);

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
  };

  const deleteMessage = (message) => {
    const socketId = window.Echo.socketId();
    server
      .delete(`message/${message.id}`, {
        headers: {
          "X-Socket-ID": socketId,
        },
      })
      .then((response) => props.deleteMessage(message));
  };

  const messageList = messages.map((message, index) => {
    let isPrevId = message.sender_id === messages[index + 1]?.sender_id;
    return (
      //make ul later
      <div key={message.id}>
        {user.id === message.sender_id ? (
          <MessageContainer>
            <MessageBox
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span>{message.content}</span>
            </MessageBox>
            <div
              className={` ${HoveredIndex === index ? "visible" : "invisible"}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <MessageTool
                message={message}
                user={user}
                deleteMessage={deleteMessage}
              />
            </div>
          </MessageContainer>
        ) : (
          <SenderDiv
            $destinationType={message.destination_type}
            $isPrevId={isPrevId}
          >
            <span className="sender-name">{message.sender.name}</span>
            <MessageBox>
              <span
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {message.content}{" "}
              </span>
              <div
                className={` ${HoveredIndex === index ? "block" : "hidden"}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <MessageTool
                  message={message}
                  user={user}
                  deleteMessage={deleteMessage}
                />
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
    roomMessages: state.messageStore.data,
    loading: state.messageStore.loading,
    user: state.userStore.data,
    groups: state.groupStore.data,
  };
}
export default connect(mapStateToProps, { deleteMessage, fetchMessage })(Body);
