import Textarea from "../../Common/Textarea";
import Input from "../../Common/Input";
import SharedFiles from "./../SharedFiles";
import { styled } from "styled-components";
const FileContainer = styled.div`
  border: solid 2px var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--background-color);
  overflow-y: auto;
`;
const ListContainer = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
  margin: 0px;
  .bio-box {
    display: flex;
    flex-direction: column;
  }
  .email {
    width: 90%;
    margin: 0px;
    padding: 7px 14px;
    border: 1px solid var(--border-color);
    border-radius: var(--small-border-radius);
  }
  label {
    margin-bottom: 5px;
  }
`;
function FriendProfileBottom({ friend }) {
  return (
    <ListContainer>
      <li className="bio-box">
        <label>Bio</label>
        <Textarea value=" " text={friend.bio} readOnly />
      </li>
      <li>
        <label>email</label>
        <p className="email">{friend.email}</p>
      </li>
      <li className="flex-1">
        <label>shared files</label>
        <FileContainer className="scrollbar">
          <SharedFiles room={friend} height="220" />
        </FileContainer>
      </li>
    </ListContainer>
  );
}
export default FriendProfileBottom;
