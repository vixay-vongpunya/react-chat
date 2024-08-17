import styled from "styled-components";
import { useState } from "react";
import MessageTool from "./MessageTool";
import File from "../../File";

const MessageBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
  height: 100%;
  width: 80%;
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: ${(props) => (props.$isUser ? "row-reverse" : "row")};
    padding: 0px;
  }
  .message {
    border: solid 1px black;
    border-radius: var(--border-radius);
    padding: 2px 5px;
    display: block;
    margin: 0px;
  }
  .translation-action-box {
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
  }
  p {
    margin: 0px;
  }
`;
const ToolWrapper = styled.div`
  display: flex;
  align-items: center;
  visibility: ${(props) => (props.hovered ? "visible" : "hidden")};
`;
function Message({
  index,
  user,
  message,
  hoveredIndex,
  setHoveredIndex,
  deleteMessage,
}) {
  const [translatedMessage, setTranslatedMessage] = useState(null);
  return (
    <MessageBox $isUser={message.sender.id === user.id}>
      <div className="container">
        <div
          className="message"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {message.message_type === "file" ? (
            <File file={message.file} file_name={message.content} />
          ) : (
            <>
              <p>{message.content}</p>
              {translatedMessage && (
                <div className=" bg-color-black-200">
                  <hr
                    style={{
                      borderTop: "solid 1px black",
                      margin: "4px 0px",
                      padding: "0px",
                    }}
                  />
                  <p>{translatedMessage}</p>
                  <div className="translation-action-box">
                    <button onClick={() => setTranslatedMessage(null)}>
                      close
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <ToolWrapper
          hovered={hoveredIndex === index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => {
            setHoveredIndex(null);
          }}
        >
          <MessageTool
            setTranslatedMessage={setTranslatedMessage}
            message={message}
            user={user}
            deleteMessage={deleteMessage}
          />
        </ToolWrapper>
      </div>
    </MessageBox>
  );
}
export default Message;
