import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { sendMessage } from "../../../Actions/Message-Action";
import { VscMic } from "react-icons/vsc";
import { VscFileCode } from "react-icons/vsc";
import { BsFileEarmarkText } from "react-icons/bs";
import { BsX } from "react-icons/bs";
import { styled } from "styled-components";
import File from "./../File";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px;
  gap: 5px;
  .file-input {
    display: none;
  }
  .file-icon {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
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

  const handleEnter = (event) => {
    setMessage(event.target.value);
    if (event.key === "Enter") {
      event.preventDefault();
      if (message.trim() !== "") {
        const data = {
          receiver_id: room.id,
          destination_id: room.email ? room.friendship_id : room.id,
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
    if (files.length !== 0) {
      setToolsOpened(true);
    } else {
      setToolsOpened(false);
    }
  }, [files]);

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
    data.append("destination_id", room.email ? room.friendship_id : room.id);
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
        <div>
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
        </div>
        <div className="h-full w-full px-2 ">
          <textarea
            value={message}
            type="text"
            className="no-scrollbar w-full rounded-xl outline-none resize-none px-4 py-2"
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleEnter}
          ></textarea>
        </div>
        <VscMic size="32" />
      </Wrapper>
    </Container>
  );
}

export default connect(null, { sendMessage })(ChatInput);
