import { styled } from "styled-components";
const StyledInput = styled.input`
  width: ${(props) => (props.width ? props.width : "90%")};
  padding: 8px 10px;
  border: solid 2px var(--border-color);
  border-radius: var(--small-border-radius);
  outline: none;
  background-color: transparent;
`;
function Input({ type, value, onChange, placeholder, width }) {
  return (
    <StyledInput
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      width={width}
    />
  );
}
export default Input;
