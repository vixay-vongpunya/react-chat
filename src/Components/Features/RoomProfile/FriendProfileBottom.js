import Textarea from "../../Common/Textarea";
import Input from "../../Common/Input";
import { styled } from "styled-components";
const FileContainer = styled.div`
  height: 90%;
  border: solid 2px var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--background-color);
  margin: 10px;
`;
const ListContainer = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 2px;
  .bio-box {
    display: flex;
    flex-direction: column;
  }
`;
function FriendProfileBottom({ friend }) {
  return (
    <ListContainer>
      <li className="bio-box">
        <label>Bio</label>
        <Textarea value=" " text={friend.bio} readOnly></Textarea>
      </li>
      <li>
        <label>email</label>
        <Input type="text" value={friend.email} />
      </li>
      <li className="flex-1">
        <label>shared files</label>
        <FileContainer></FileContainer>
      </li>
    </ListContainer>
  );
}
export default FriendProfileBottom;
