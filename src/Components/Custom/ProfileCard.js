import { styled } from "styled-components";
import ChatImage from "./../Common/ChatImage";
const Container = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const BackgroundStyle = styled.div`
  width: 100%;
  height: 140px;
  display: flex;
  background-image: ${(props) => `url(${props.$backgroundImage})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-top-right-radius: var(--border-radius);
  border-top-left-radius: var(--border-radius);
  top: 0;
  content: "";
`;
const ImageBox = styled.div`
  height: 95%;
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  gap: 10px;
`;
function ProfileCard(props) {
  console.log(props.friend.name);
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
        <h4>{props.friend.name}</h4>
      </ImageBox>
    </Container>
  );
}
export default ProfileCard;
