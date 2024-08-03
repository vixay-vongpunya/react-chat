import { BsFileEarmarkText } from "react-icons/bs";
import { BsX } from "react-icons/bs";
import { styled } from "styled-components";
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
      <p>
        {file_name.slice(0, 10)}
        {file_name.length > 10 && (
          <>
            <br />
            <span>...</span>
            <span>
              {file_name.slice(file_name.length - 4, file_name.length)}
            </span>
          </>
        )}
      </p>
    </FileContainer>
  );
}
export default File;
