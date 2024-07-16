import ProfileImage from "../Components/Features/RoomProfile/ProfileImage";
import FriendProfileBottom from "./../Components/Features/RoomProfile/FriendProfileBottom";
import styled from "styled-components";

const Container = styled.div`
  width: 100wv;
  position: fixed;
  inset: 0;
  z-index: 10;
  overflow: hidden;
`;
const Wrapper = styled.div`
  display: flex;
  min-height: 100%;
  background-color: rgb(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  display: relative;
  width: 25vw;
  height: 90vh;
  border-radius: var(--border-radius);
  background-color: var(--background-color);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  translate: all 0.3s ease;
`;
function FriendProfileModal({ profile, setProfileOpened }) {
  return (
    <Container>
      <Wrapper>
        <Box>
          {/* shared files br khuam u nai n */}
          <div className="h-full flex flex-col">
            <ProfileImage
              room={profile}
              handleProfileOpened={setProfileOpened}
            />
            <div className="h-3/5 w-full">
              <FriendProfileBottom friend={profile} />
            </div>
          </div>
        </Box>
      </Wrapper>
    </Container>
  );
}
export default FriendProfileModal;
