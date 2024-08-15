import { styled } from "styled-components";
import DownloadFile from "./../../../../Utils/DownloadFile";
import { BsTranslate } from "react-icons/bs";
import { server } from "./../../../../Actions/Index";
import CustomDropdown from "../../../Custom/CustomDropdown";
const languages = [
  { text: "English", value: "eng" },
  { text: "Japanes", value: "ja" },
  { text: "Spanish", value: "es" },
  { text: "Lao", value: "lo" },
];
const Container = styled.ul`
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0px;
  padding: 0px 10px;
  li {
    display: flex;
    gap: 3px;
    cursor: pointer;
  }
`;

function MessageTool({ message, user, setTranslatedMessage, deleteMessage }) {
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
      <li onClick={() => navigator.clipboard.writeText(message.content)}>
        Copy
      </li>
      {message.file && <li onClick={() => DownloadFile(message)}>Download</li>}

      {message.sender.id === user.id && (
        <li onClick={() => deleteMessage(message)}>Remove </li>
      )}
    </Container>
  );
}
export default MessageTool;
