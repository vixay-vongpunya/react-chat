import { styled } from "styled-components";
import ChatImage from "./../Common/ChatImage";
const Container = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin-top: 5%;
  }
`;
const BackgroundStyle = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
  background-image: ${(props) => `url(${props.$backgroundImage})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  top: 0;
  content: "";
`;
const ImageBox = styled.div`
  height: 20%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
`;
function ProfileCard(props) {
  return (
    <Container>
      <BackgroundStyle
        $backgroundImage={props.friend.profile?.background_image}
      ></BackgroundStyle>
      <ImageBox>
        <ChatImage
          src={props.friend.profile?.profile_image}
          size="--large-image"
        />
      </ImageBox>
      <p>{props.friend.name}</p>
    </Container>
  );
}
export default ProfileCard;
