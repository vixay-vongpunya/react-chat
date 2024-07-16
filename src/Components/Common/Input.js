import { styled } from "styled-components";
const StyledInput = styled.input`
  width: 90%;
  padding: 8px 10px;
  border: solid 2px var(--border-color);
  border-radius: var(--small-border-radius);
  outline: none;
  background-color: transparent;
`;
function Input({ type, value, onChange, placeholder }) {
  return (
    <StyledInput
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
export default Input;
