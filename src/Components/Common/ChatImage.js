import styled from "styled-components";
const Image = styled.img`
  height: var(${(props) => props.$size});
  width: var(${(props) => props.$size});
  border: solid 2px white;
  border-radius: 50%;
  object-fit: cover;
`;
function ChatImage({ src, size }) {
  return (
    <Image
      src={src ? src : `${process.env.PUBLIC_URL}/profile.jpg`}
      $size={size}
      alt="not found"
      loadin="lazy"
    />
  );
}
export default ChatImage;
