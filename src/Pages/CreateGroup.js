import Input from "./../Components/Common/Input";
import ChatImage from "./../Components/Common/ChatImage";
import FullFriendList from "../Components/Features/FullFriendList";
import Button from "./../Components/Common/Button";
import { server } from "../Actions/Index";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { styled } from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0px 5px;
  gap: 10px;
`;
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  border-radius: var(--border-radius);
  .input-container {
    padding: 8px 10px;
  }
`;
const SelectedContainer = styled.div`
  height: 90px;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  align-items: center;
  gap: 10px;
  margin: 0px 10px;
`;

const FormContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 2fr 7fr;
  gap: 10px;
`;
function CreateGroup(props) {
  const [selectedFriend, setSelectedFriend] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [groupName, setGroupName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setRoomList([...props.friends]);
  }, [props.friends]);
  const createGroup = (event) => {
    event.preventDefault();
    const data = {
      name: groupName,
      users: selectedFriend,
    };
    server.post("./group/create", data).then((response) => {
      console.log("create group", response);
      navigate("/home");
    });
  };
  const onClick = (friend) => {
    if (selectedFriend.find((selected) => selected.id == friend.id)) {
      setSelectedFriend(
        selectedFriend.filter((selected) => friend !== selected)
      );
    } else {
      setSelectedFriend([...selectedFriend, friend]);
    }
  };
  const groupNameHandler = (event) => {
    setGroupName(event.target.value);
  };
  return (
    <Container>
      <h2>Create Group</h2>
      <FormContainer>
        <Wrapper className="pb-3">
          <div className="input-container">
            <Input
              type="text"
              value={groupName}
              onChange={groupNameHandler}
              placeholder="group name"
            />
          </div>
          <SelectedContainer className="no-scrollbar">
            {selectedFriend.map((friend) => (
              <ChatImage
                key={friend?.id}
                src={friend.profile?.profile_image}
                size="--medium-image"
              />
            ))}
          </SelectedContainer>
        </Wrapper>
        <Wrapper>
          <FullFriendList onClick={onClick} roomList={roomList} height={420} />
          <div className="flex justify-end  pr-5 pb-2">
            <Button onClick={createGroup} text="create" primary />
          </div>
        </Wrapper>
      </FormContainer>
    </Container>
  );
}
function mapStateToProps(state) {
  return {
    friends: state.friendStore.data,
    groups: state.groupStore.data,
  };
}
export default connect(mapStateToProps, {})(CreateGroup);
