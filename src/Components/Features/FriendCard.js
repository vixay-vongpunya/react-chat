import { server } from "../../Actions/Index";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import ProfileCard from "./../Custom/ProfileCard";
import Button from "./../Common/Button";
const Container = styled.div`
  height: 60%;
  width: 100%;
  background-color: var(--background-color);
  border-radius: var(--border-radius);
  .button-box {
    display: flex;
    justify-content: center;
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
          disable={props.isFriend ? true : false}
          onClick={addFriend}
        />
      </div>
    </Container>
  );
}

export default FriendCard;
