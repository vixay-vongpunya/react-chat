import Button from "../../Common/Button";
import styled from "styled-components";
import { connect } from "react-redux";
import GroupProfileBottom from "./GroupProfileBottom";
import FriendProfileBottom from "./FriendProfileBottom";
import ProfileImage from "./ProfileImage";
import { leaveGroup } from "../../../Actions/Group-Action";
import { unFriend } from "../../../Actions/Friend-Action";
import { useNavigate } from "react-router-dom";
import { changeRoom } from "../../../Actions/Room-Action";
const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  .btn-box {
    width: 100%;
    padding-bottom: 8px;
    padding: 4px 8px;
  }
`;

function RoomProfile({
  room,
  leaveGroup,
  unFriend,
  handleProfileOpened,
  changeRoom,
}) {
  const navigate = useNavigate();
  const handleClick = async () => {
    if (room.email) {
      await unFriend(room);
    } else {
      try {
        await leaveGroup(room);
      } catch (error) {
        alert(error);
      }
    }
    await changeRoom(null);
    navigate("/home");
  };

  return (
    <Container>
      <ProfileImage room={room} handleProfileOpened={handleProfileOpened} />
      <div className="flex-1 w-full ">
        {room.email ? (
          <FriendProfileBottom friend={room} />
        ) : (
          <GroupProfileBottom room={room} />
        )}
      </div>
      <div className="btn-box">
        {/* text color not working */}
        <Button
          text={room.email ? "unfriend" : "leave group"}
          onClick={handleClick}
        />
      </div>
    </Container>
  );
}
export default connect(null, { leaveGroup, unFriend, changeRoom })(RoomProfile);
