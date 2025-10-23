import { server } from "../../../Actions/Index";
import { styled } from "styled-components";
import ProfileCard from "../../Custom/ProfileCard";
import Button from "../../Common/Button";
const Container = styled.div`
  height: 60%;
  width: 60%;
  border-radius: var(--border-radius);
  background-color: var(--hover-color);
  box-shadow: 0px 0px 15px 1px var(--hover-color);
  .button-box {
    display: flex;
    justify-content: center;
    padding: 8px 16px;
  }
`;
function FriendCard(props) {
  const addFriend = () => {
    const data = { friend_id: props.friend.id };
    server.post("./friendship/request", data).then((response) => {
      const friendData = { ...props.friend, friendship: response.data.data };
   
      props.setFriend(friendData);
    });
  };
  return (
    <Container>
      <ProfileCard friend={props.friend} />
      <div className="button-box">
        <Button
          text={
            props.friend.friendship
              ? props.friend.friendship.status
              : "Add Friend"
          }
          disabled={props.friend.friendship}
          primary={!props.friend.friendship}
          onClick={addFriend}
        />
      </div>
    </Container>
  );
}

export default FriendCard;
