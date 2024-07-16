import { styled } from "styled-components";
const StyledInput = styled.input`
  width: 100%;
  outline: none;
  padding: 8px 10px;
  border-radius: var(--small-border-radius);
`;
function SearchBar({ value, onChange, placeholder, onKeyDown }) {
  return (
    <StyledInput
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
    ></StyledInput>
  );
}
export default SearchBar;
