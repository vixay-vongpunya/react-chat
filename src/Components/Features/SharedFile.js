import ListCard from "./ListCard";
import styled from "styled-components";

const Container = styled.div`
  padding-top: 10px;
  overflow: auto;
  .wrapper {
    height: ${(props) => props.height}px;
  }
`;
const options = [{ key: 1, text: "download", value: 1 }];
function SharedFiles({ room, height }) {
  const handleOption = () => {};
  const fileMessages = room.messages?.filter(
    (message) => message.message_type === "file"
  );

  const Files = fileMessages?.map((message) => (
    <ListCard
      key={message.id}
      options={options}
      handleOption={handleOption}
      data={message}
    />
  ));
  return (
    <Container className="scrollbar" height={height}>
      <div className="wrapper">{Files}</div>
    </Container>
  );
}
export default SharedFiles;
