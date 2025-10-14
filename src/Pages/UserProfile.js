import { useState, useEffect } from "react";
import { server } from "../Actions/Index";
import { VscDeviceCamera } from "react-icons/vsc";
import { connect } from "react-redux";
import { fetchUser, updateUserProfile } from "../Actions/User-Action";
import ChatImage from "./../Components/Common/ChatImage";
import ImageModal from "./../Components/Features/ImageModal";
import { styled } from "styled-components";
import Textarea from "../Components/Common/Textarea";

const Container = styled.div`
  height: 100%;
  padding: 2rem 1rem;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  border-radius: var(--border-radius);
`;

const StyledBackground = styled.div`
  background-image: ${(props) => `url(${props.$backgroundImage})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  height: 60%;
  width: 100%;
  position: absolute;
  top: 0;
  content: "";
`;

const HeaderSection = styled.div`
  height: 40%;
  width: 100%;
  position: relative;
`;

const BackgroundContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`;

const ProfileContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 2rem;
`;

const ProfileWrapper = styled.div`
  width: 13rem;
  height: 13rem;
  position: relative;
`;

const ProfileImageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
`;

const CameraIcon = styled(VscDeviceCamera)`
  cursor: pointer;
  border: 1px solid white;
  border-radius: 50%;
  background-color: transparent;
  padding: 0.25rem;
  position: absolute;
  right: 2rem;
  bottom: 2rem;
`;

const UserName = styled.h3`
  padding-top: 0.5rem;
`;

const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  position: absolute;
  bottom: 6rem;
`;

const UserInfoList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
  background-color: white;

  li {
    display: flex;
    flex-direction: column;
  }
  p {
    width: 90%;
    margin: 0px;
    padding: 7px 14px;
    border: 1px solid var(--border-color);
    border-radius: var(--small-border-radius);
  }
`;

function UserProfile({ user, updateUserProfile }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [profileSelected, setProfileSelected] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    if (!user) fetchUser();
    setProfileImage(user.profile?.profile_image);
    setBackgroundImage(user.profile?.background_image);
  }, [user]);

  const updateImage = async (dataUrl) => {
    if (!dataUrl) {
      return;
    }
    const data = new FormData();

    try {
      let bgImage = backgroundImage;
      let proImage = profileImage;
      if (profileSelected) {
        data.append("profile_image", dataUrl);
        await server.post("/user/profile", data);
        setProfileImage(dataUrl);
        proImage = dataUrl;
      } else {
        data.append("background_image", dataUrl);
        await server.post("/user/background", data);
        setBackgroundImage(dataUrl);
        bgImage = dataUrl;
      }

      const profileData = {
        ...user,
        profile: {
          ...user.profile,
          background_image: bgImage,
          profile_image: proImage,
        },
      };

      updateUserProfile(profileData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <HeaderSection>
          <BackgroundContainer>
            <StyledBackground
              $backgroundImage={backgroundImage}
            ></StyledBackground>
            <ProfileContainer>
              <ProfileWrapper>
                <ProfileImageContainer>
                  <ChatImage src={profileImage} size="--large-image" />
                </ProfileImageContainer>
                <CameraIcon
                  size="32"
                  color="white"
                  onClick={() => {
                    setModalOpen(true);
                    setProfileSelected(true);
                  }}
                />
              </ProfileWrapper>
              <UserName>{user.name}</UserName>
            </ProfileContainer>
            <IconWrapper>
              <CameraIcon
                size="32"
                color="white"
                onClick={() => {
                  setModalOpen(true);
                  setProfileSelected(false);
                }}
              />
            </IconWrapper>
          </BackgroundContainer>
        </HeaderSection>
        <UserInfoList>
          <li>
            <label>email</label>
            <p>{user.email}</p>
          </li>
          <li>
            <label>Bio</label>
            <Textarea value=" " text={user.bio} readOnly />
          </li>
        </UserInfoList>
      </Wrapper>
      {modalOpen && (
        <ImageModal
          closeModal={() => setModalOpen(false)}
          updateImage={updateImage}
        />
      )}
    </Container>
  );
}

function mapStateToProps(state) {
  return { user: state.userStore.data };
}

export default connect(mapStateToProps, { fetchUser, updateUserProfile })(
  UserProfile
);
