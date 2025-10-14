import { BsFileEarmarkText } from "react-icons/bs";
import { styled } from "styled-components";
import SlicedFilename from "../../Utils/SlicedFilename";
const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  align-items: center;
  padding: 10px;
  gap: 5px;
`;

const image_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.webp'];

function File({ file, file_name }) {
  const {name, extension} = SlicedFilename(file_name);
  const isImage = image_extensions.includes(extension);
  console.log("extension", extension, isImage);
  return (
    <FileContainer>
      {
        isImage ?
        <img src={file} type="file" width="400px" alt={file_name}/>
        :
        <>
          <BsFileEarmarkText size={64} />
          <div className="flex gap-0">
            <span className="truncate max-w-[70px]">{name}</span>
            <span className="flex-shrink-0">{extension}</span>
          </div>
        </>
        }
    </FileContainer>
  );
}
export default File;
