import ProfileImage from "./FriendProfile/ProfileImage";
import FriendProfileBottom from "./FriendProfile/FriendProfileBottom";
function PopupFriendProfile() {
  return (
    <div className="h-full flex flex-col">
      <ProfileImage room={room} handleProfileOpened={handleProfileOpened} />
      <div className="h-3/5 w-full">
        <FriendProfileBottom friend={room} />
      </div>
    </div>
  );
}
export default PopupFriendProfile;
