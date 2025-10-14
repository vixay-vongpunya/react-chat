import { styled } from "styled-components";
import { useState } from "react"; 
import { BiSolidTrashAlt } from "react-icons/bi";
import { BiDownload } from "react-icons/bi";
import DownloadFile from "./../../../../Utils/DownloadFile";
import { BsTranslate } from "react-icons/bs";
import { server } from "./../../../../Actions/Index";
import CustomDropdown from "../../../Custom/CustomDropdown";
const languages = [
  { text: "English", value: "en" },
  { text: "Japanes", value: "ja" },
  { text: "Spanish", value: "es" },
  { text: "Lao", value: "lo" },
];
const Container = styled.ul`
  display: flex;
  align-items: center;
  margin: 0px;
  padding: 0px 10px;
  li {
    display: flex;
    gap: 3px;
    cursor: pointer;
    padding: 3px;
  }

  li:hover {
    background-color: var(--hover-color);
    border-radius: 10px;
  }
`;

function MessageTool({ message, user, setTranslatedMessage, deleteMessage }) {
  const [copied, setCopied] = useState(false);
  const translateMessage = async (destination_language, item, optionType) => {
    const data = {
      content: message.content,
      destination_language: destination_language,
    };
    try {
      const response = await server.post("/message/translate", data);
      console.log(response);
      setTranslatedMessage(response.data.data);
    } catch (error) {
      console.error("Error while translating:", error);
    }
  };

  const handleCopy = () =>{
    navigator.clipboard.writeText(message.content)
    setCopied(!copied)
    setTimeout(()=>setCopied(false),1500)
  }
  return (
    <Container>
      <li>
        {!message.file && (
          <CustomDropdown
            options={languages}
            handleOption={translateMessage}
            title={<BsTranslate />}
          />
        )}
      </li>
      <li onClick={handleCopy}>
        {copied ? "Copied" : "Copy" }
      </li>
      {message.file && <li onClick={() => DownloadFile(message)}>
        <BiDownload  size={20}/>
        </li>}

      {message.sender.id === user.id && (
        <li onClick={() => deleteMessage(message)}>
          <BiSolidTrashAlt color="red" size={20}/>
        </li>
      )}
    </Container>
  );
}
export default MessageTool;
