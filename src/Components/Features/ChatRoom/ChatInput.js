import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { sendMessage } from "../../../Actions/Message-Action";
import { VscMic } from "react-icons/vsc";
import { VscFileCode } from "react-icons/vsc";
import { BsX } from "react-icons/bs";
import { styled } from "styled-components";
import File from "./../File";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px;
  gap: 5px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  textarea {
    width: 100%;
    max-height: 150px;
    outline: none;
    resize: none;
    padding: 5px;
  }
  .input-bar {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: var(--border-radius);
    gap: 10px;
    padding: 5px;
  }
  .mic-box {
    height: 100%;
    display: flex;
    align-items: flex-end;
  }
  .file-input {
    display: none;
  }
  .file-icon {
    cursor: pointer;
    margin-left: 5px;
    margin-bottom: 5px;
  }
`;

const FileBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: white;
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  padding: 10px;
  gap: 10px;

  .remove-file-box {
    display: flex;
    justify-content: flex-end;
    background-color: green;
  }
  .icon {
    cursor: pointer;
    position: absolute;
    margin-right: -5px;
    margin-top: -5px;
    border-radius: 50%;
    background-color: white;
  }
`;

function ChatInput({ room, sendMessage, setToolsOpened }) {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);

  const fileRef = useRef(null);
  const textareaRef = useRef(null);

  const handleEnter = (event) => {
    setMessage(event.target.value);
    if (event.shiftKey && event.key === "Enter") {
      setMessage((prev) => prev + "\n");
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (message.trim() !== "") {
        const data = {
          receiver_id: room.id,
          destination_id: room.email ? room.friendship.id : room.id,
          destination_type: room.email ? "user" : "group",
          content: message,
        };
        sendMessage(data);
        setMessage("");
      }
      if (files) {
        files.map((item) => uploadFile(item.file));
      }
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [message]);

  useEffect(() => {
    if (files.length !== 0) {
      setToolsOpened(true);
    } else {
      setToolsOpened(false);
    }
  }, [setToolsOpened, files]);

  const FileSelected = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      setFiles((prev) => [...prev, { file: file, file_name: fileName }]);
    }
  };

  const uploadFile = (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("receiver_id", room.id);
    data.append("destination_id", room.email ? room.friendship.id : room.id);
    data.append("destination_type", room.email ? "user" : "group");
    data.append("content", file.file_name);
    sendMessage(data);
    setFiles([]);
  };
  const removeFile = (file) => {
    setFiles((prev) =>
      prev.filter((item) => item.file_name !== file.file_name)
    );
  };

  const FileList = files.map((file, index) => {
    return (
      <div>
        <div className="remove-file-box">
          <BsX className="icon" size={24} onClick={() => removeFile(file)} />
        </div>
        <File
          file={file}
          key={index}
          removeFile={removeFile}
          file_name={file.file_name}
        />
      </div>
    );
  });

  return (
    <Container>
      {files.length > 0 && <FileBox>{FileList}</FileBox>}
      <Wrapper>
        <VscFileCode
          size="32"
          className="file-icon"
          onClick={() => {
            fileRef.current.click();
          }}
        />
        <input
          type="file"
          ref={fileRef}
          className="file-input"
          onChange={FileSelected}
        />
        <div className="input-bar">
          <textarea
            rows="1"
            value={message}
            type="text"
            ref={textareaRef}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleEnter}
          ></textarea>
          <div className="mic-box">
            <VscMic size="32" />
          </div>
        </div>
      </Wrapper>
    </Container>
  );
}

export default connect(null, { sendMessage })(ChatInput);
