import { BsX } from "react-icons/bs";
import Input from "./../Components/Common/Input";
import ChatImage from "./../Components/Common/ChatImage";
import GroupFriendList from "../Components/Features//CreateGroup/GroupFriendList";
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
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  border-radius: var(--border-radius);
  .input-container {
    padding: 8px 10px;
  }
  .btn-box {
    padding: 4px 8px;
  }
`;
const SelectedContainer = styled.div`
  overflow-x: auto;
  .list-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin: 0px 10px;
    padding: 5px;
  }
  .selected-box {
    position: relative;
    display: flex;
    justify-content: flex-end;
    flex-shrink: 0;
  }
  .icon {
    position: absolute;
    cursor: pointer;
    margin-top: -3px;
    margin-right: -5px;
    background-color: white;
    border-radius: 50%;
  }
`;

const FormContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 2fr 8fr;

  box-sizing: border-box;
  & > :nth-child(1) {
    margin-bottom: 0.3rem;
  }
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
  const onClick = (friend, index) => {
    setRoomList((prevRoomList) =>
      prevRoomList.map((room, i) =>
        i === index ? { ...room, clicked: !room.clicked } : room
      )
    );
    if (selectedFriend.find((selected) => selected.id === friend.id)) {
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
  const cancelSelection = (friend, index) => {
    setRoomList((prev) =>
      prev.map((room) =>
        room.id === friend.id ? { ...room, clicked: false } : room
      )
    );
    const newSelectedFriends = [...selectedFriend];
    newSelectedFriends.splice(index, 1);
    setSelectedFriend(newSelectedFriends);
  };
  return (
    <Container>
      <h2>Create Group</h2>
      <FormContainer>
        <Wrapper>
          <div className="input-container">
            <Input
              type="text"
              value={groupName}
              onChange={groupNameHandler}
              placeholder="group name"
            />
          </div>
          <SelectedContainer className="no-scrollbar">
            <div className="list-container">
              {selectedFriend.map((friend, index) => (
                <div className="selected-box">
                  <ChatImage
                    key={friend?.id}
                    src={friend.profile?.profile_image}
                    size="--medium-image"
                  />
                  <BsX
                    className="icon"
                    size={24}
                    onClick={() => cancelSelection(friend, index)}
                  />
                </div>
              ))}
            </div>
          </SelectedContainer>
        </Wrapper>
        <Wrapper>
          <GroupFriendList onClick={onClick} roomList={roomList} />
          <div className="btn-box">
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
