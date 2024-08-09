import { styled } from "styled-components";
import { BsTranslate } from "react-icons/bs";
import { server } from "./../../../../Actions/Index";
const Container = styled.ul`
  height: 100%;
  display: flex;
  dlex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 0px 10px;
  li {
    display: flex;
    gap: 3px;
    cursor: pointer;
  }
`;
function MessageTool({ message, user, deleteMessage }) {
  const handleDownload = async () => {
    try {
      const fileName = message.file.split("/").pop();
      const response = await server.get(`/message/download/${fileName}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", message.content);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  return (
    <Container>
      <li>
        <BsTranslate />
      </li>
      <li onClick={() => navigator.clipboard.writeText(message.content)}>
        Copy
      </li>
      {message.file && <li onClick={() => handleDownload()}>Download</li>}

      {message.sender.id === user.id && (
        <li onClick={() => deleteMessage(message)}>Remove </li>
      )}
    </Container>
  );
}
export default MessageTool;
