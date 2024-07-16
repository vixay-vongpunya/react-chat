import Button from "./../Components/Common/Button";
import { useState, useEffect, useRef } from "react";
import { server } from "../Actions/Index";
import { VscDeviceCamera } from "react-icons/vsc";
import { connect } from "react-redux";
import { fetchUser } from "../Actions/User-Action";
import ChatImage from "./../Components/Common/ChatImage";
import ImageModal from "./../Components/Features/ImageModal";
import { styled } from "styled-components";

const Container = styled.div`
  height: 100%;
  padding: 0px 5px;
`;
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: var(--background-color);
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
function UserProfile({ user }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [profileSelected, setProfileSelected] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const backgroundInputRef = useRef(null);
  const profileInputRef = useRef(null);
  useEffect(() => {
    if (!user) fetchUser();
    console.log(user);
    setProfileImage(user.profile?.profile_image);
    setBackgroundImage(user.profile?.background_image);
  }, []);

  const updateImage = (dataUrl) => {
    if (!dataUrl) {
      return;
    }
    console.log(dataUrl);
    const data = new FormData();

    try {
      if (profileSelected) {
        data.append("profile_image", dataUrl);
        server.post("/user/profile", data).then((response) => {
          setProfileImage(dataUrl);
          console.log(response);
        });
      } else {
        data.append("background_image", dataUrl);
        server.post("/user/background", data).then((response) => {
          setBackgroundImage(dataUrl);
          console.log(response);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <div className="h-2/5 w-full relative">
          <div className="h-full w-full flex items-center ">
            <StyledBackground
              $backgroundImage={backgroundImage}
            ></StyledBackground>
            <div className="h-full w-full flex flex-col items-center justify-center top-8 absolute">
              <div className="w-52 h-52 relative ">
                <div className="h-full w-full flex flex-col justify-end items-center absolute ">
                  <ChatImage src={profileImage} size="--large-image" />
                </div>
                <VscDeviceCamera
                  size="32"
                  color="white"
                  className="cursor-pointer border rounded-full bg-transparent p-1 flex absolute right-3 bottom-8 right-8"
                  onClick={() => {
                    setModalOpen(true);
                    setProfileSelected(true);
                  }}
                  // onClick={() => profileInputRef.current.click()}
                />
                <input
                  className="hidden"
                  type="file"
                  ref={profileInputRef}
                  onChange={(event) => setProfileImage(event.target.files[0])}
                />
              </div>

              <div className="pt-4">
                <h3>{user.name}</h3>
                {/* <Button onClick={storeBackgroundImage} text="save" /> */}
              </div>
            </div>
            <div className="w-full flex flex-row-reverse">
              <VscDeviceCamera
                size="32"
                color="white"
                className="cursor-pointer absolute border rounded-full bg-transparent p-1 m-4 bottom-32"
                onClick={() => {
                  setModalOpen(true);
                  setProfileSelected(false);
                }}
              />
              <input
                className="hidden"
                type="file"
                ref={backgroundInputRef}
                onChange={(event) => setBackgroundImage(event.target.files[0])}
              />
            </div>
          </div>
        </div>
        <hr />
        <ul>
          <li>{user.email}</li>
          <li>bio</li>
        </ul>
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

export default connect(mapStateToProps, { fetchUser })(UserProfile);
