import { styled } from "styled-components";
import ChatImage from "../Common/ChatImage";
const Box = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 8%;
  background-color: white;
  border-radius: var(--border-radius);
  padding: 5px 10px;
`;
const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5px;
  p {
    margin: 2px;
  }
`;
function SmallUserCard(props) {
  return (
    <Box>
      <ChatImage src={props.user.profile?.profile_image} size="--small-image" />
      <DetailBox>
        <p>{props.user.name}</p>
        <p>Notis</p>
      </DetailBox>
    </Box>
  );
}
export default SmallUserCard;
