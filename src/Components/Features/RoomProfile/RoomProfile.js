import Button from "../../Common/Button";
import { connect } from "react-redux";
import GroupProfileBottom from "./GroupProfileBottom";
import FriendProfileBottom from "./FriendProfileBottom";
import ProfileImage from "./ProfileImage";
import { leaveGroup } from "../../../Actions/Group-Action";
import { unFriend } from "../../../Actions/Friend-Action";
import { useNavigate } from "react-router-dom";
import { changeRoom } from "../../../Actions/Room-Action";
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
  console.log("3de", room);

  return (
    <div className="h-full w-full flex flex-col">
      <ProfileImage room={room} handleProfileOpened={handleProfileOpened} />
      <div className="h-3/5 w-full overflow-auto">
        {room.email ? (
          <FriendProfileBottom friend={room} />
        ) : (
          <GroupProfileBottom room={room} />
        )}
      </div>
      <div className="p-2 ">
        <hr />
        {/* text color not working */}
        <Button
          text={room.email ? "unfriend" : "leave group"}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default connect(null, { leaveGroup, unFriend, changeRoom })(RoomProfile);
