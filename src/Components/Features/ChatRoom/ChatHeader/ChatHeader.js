import ChatImage from "../../../Common/ChatImage";
import { styled } from "styled-components";
import ChatHeaderRight from "./ChatHeaderRight";
import { VscChevronLeft } from "react-icons/vsc";
import { connect } from "react-redux";
import { changeRoom} from "../../../../Actions/Room-Action";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .daterange-container {
    right: 1rem;
    top: 1.2rem;
  }

`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  .image-box:hover {
    cursor: pointer;
  }

  .icon{
    display: none;
    cursor: pointer;
    margin-right: 1rem;
  }
  @media (max-width: 576px) {
    .icon{
      display: block
    }
  }
`;
const NameBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  padding-left: 10px;
  justify-content: space-between;
  p {
    margin: 0px;
  }
`;
function ChatHeader({ profile_image, room, handleProfileOpened, changeRoom }) {
  return (
    <Container>
      <Wrapper>
          <VscChevronLeft
            className="icon"
            size={32} 
            // could be navigaet back, but
            onClick={() => changeRoom([])}
          />
      
        <div className="image-box"  onClick={handleProfileOpened}>
          <ChatImage
            src={profile_image}
            name={room.name}
            size="--medium-image"
          />
        </div>
        <NameBox>
          <p className="line-clamp-1">{room.name}</p>
          <p>active</p>
        </NameBox>
      </Wrapper>
      <div className="daterange-container">
        <ChatHeaderRight
          roomId={room.pivot ? room.id : room.friendship.id}
          roomType={room.pivot ? "group" : "private"}
        />
      </div>
    </Container>
  );
}

export default connect(null, {
  changeRoom
})(ChatHeader);

