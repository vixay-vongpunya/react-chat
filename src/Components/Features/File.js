import { BsFileEarmarkText } from "react-icons/bs";
import { styled } from "styled-components";
import SlicedFilename from "../../Utils/SlicedFilename";
const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 110px;
  height: 100%;
  align-items: center;
  background-color: var(--background-color);
  border-radius: var(--small-border-radius);
  padding: 10px;
  gap: 5px;
`;
function File({ file_name }) {
  return (
    <FileContainer>
      <BsFileEarmarkText size={64} />
      <p>{SlicedFilename(file_name)}</p>
    </FileContainer>
  );
}
export default File;
