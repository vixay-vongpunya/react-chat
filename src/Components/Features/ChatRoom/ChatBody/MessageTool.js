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
  const handleDownload = (fileUrl) => {
    const url = window.URL.createObjectURL(new Blob([fileUrl]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", message.content); // Set the download attribute with the filename
    document.body.appendChild(link);
    link.click();

    // Clean up the link element
    link.parentNode.removeChild(link);
  };
  return (
    <Container>
      <li>
        <BsTranslate />
      </li>
      <li onClick={() => navigator.clipboard.writeText(message.content)}>
        Copy
      </li>
      {message.file && (
        <li onClick={() => handleDownload(message.file)}>Download</li>
      )}

      {message.sender.id === user.id && (
        <li onClick={() => deleteMessage(message)}>Remove </li>
      )}
    </Container>
  );
}
export default MessageTool;
