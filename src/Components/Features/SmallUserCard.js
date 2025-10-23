import { styled } from "styled-components";
import ChatImage from "../Common/ChatImage";
import { BiBell } from "react-icons/bi";

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 5px 10px;
  margin-bottom: 1rem;
`;
const DetailBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  p {
    margin: 2px;
    color: var(--text-color);
    text-decoration: none;
  }
  .name {
    font-weight: bold;
  }
  `;
function SmallUserCard(props) {
  return (
    <Box>
      <DetailBox>
        <ChatImage src={props.user.profile?.profile_image} size="--small-image" />
        <div>
          <p className="name">{props.user.name}</p>
          <p>the decoration about us</p>
        </div>
      </DetailBox>
      <BiBell size={24} color="black"/>
    </Box>
  );
}
export default SmallUserCard;
