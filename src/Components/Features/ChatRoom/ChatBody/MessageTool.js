import { styled } from "styled-components";
import { BsTranslate } from "react-icons/bs";
import { server } from "./../../../../Actions/Index";
const Container = styled.ul`
  display: flex;
  dlex-direction: column;
  gap: 5px;
  padding: 0px 10px;
  li {
    display: flex;
    gap: 3px;
    cursor: pointer;
  }
`;
function MessageTool({ message, user, deleteMessage }) {
  return (
    <Container>
      <li>
        <BsTranslate />
      </li>
      <li onClick={() => navigator.clipboard.writeText(message.content)}>
        Copy
      </li>
      {message.sender.id === user.id && (
        <li onClick={() => deleteMessage(message)}>Remove </li>
      )}
    </Container>
  );
}
export default MessageTool;
