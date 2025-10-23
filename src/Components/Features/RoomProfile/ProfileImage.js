import ChatImage from "../../Common/ChatImage";
import { VscChevronLeft } from "react-icons/vsc";
import { styled } from "styled-components";

const Container = styled.div`
  height: 35%;
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
`;
const IconBox = styled.div`
  width: 100%;
  position: relative;
  padding: 1.5rem 0 0 0.5rem ;
`;
const BackgroundStyle = styled.div`
  background-image: ${(props) => `url(${props.$backgroundImage})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 60%;
  width: 100%;
  position: absolute;
  top: 0;
  content: "";
`;
const ImageBox = styled.div`
  height: 100%;
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: end;

  h3 {
    margin: 0;
    padding-top: 0.5rem;
    width: 100%;
    text-align: center;
  }
`;
function ProfileImage({ room, handleProfileOpened }) {
  return (
    <Container>
      <Wrapper>
        <BackgroundStyle
          $backgroundImage={room.profile?.background_image}
        ></BackgroundStyle>
        <IconBox>
          <VscChevronLeft
            className="cursor-pointer"
            size={32}
            onClick={() => handleProfileOpened()}
          />
        </IconBox>
        <ImageBox>
          <ChatImage src={room.profile?.profile_image} size="--large-image" />
          <h3 className="line-clamp-1">{room.name}</h3>
        </ImageBox>
      </Wrapper>
    </Container>
  );
}

export default ProfileImage;
