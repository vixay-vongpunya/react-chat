import { server } from "../../../Actions/Index";
import { useState, useEffect } from "react";
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
  console.log(props.isFriend);
  const addFriend = () => {
    const data = { friend_id: props.friend.id };
    server.post("./friendship/request", data).then((response) => {
      console.log(response);
    });
  };
  return (
    <Container>
      <ProfileCard friend={props.friend} />
      <div className="button-box">
        <Button
          text={
            props.isFriend
              ? props.friend.friendship.status === "pending"
                ? "pending"
                : "added"
              : "Add Friend"
          }
          disabled={props.isFriend ? true : false}
          onClick={addFriend}
        />
      </div>
    </Container>
  );
}

export default FriendCard;
