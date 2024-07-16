import { styled } from "styled-components";
const StyledTextarea = styled.textarea`
  max-height: 100px;
  width: 90%;
  padding: 5px 10px;
  border: solid 2px var(--border-color);
  border-radius: var(--small-border-radius);
  background-color: transparent;
  cursor: text;
  outline: none;
  resize: none;
`;
function Textarea({ value, readOnly, onDoubleClick, onChange }) {
  return (
    <StyledTextarea
      value={value ? value : ""}
      readOnly={readOnly ? true : false}
      onDoubleClick={onDoubleClick}
      onChange={onChange}
    />
  );
}
export default Textarea;
