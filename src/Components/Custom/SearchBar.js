import { styled } from "styled-components";
import { BiSearch } from "react-icons/bi";

const StyledInput = styled.input`
  outline: none;
  background-color: transparent;
`;

const InputBox = styled.div`  
  display:flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 1em;
  border-radius: var(--big-border-radius);
  background-color: var(--background-color);
`
function SearchBar({ value, onChange, placeholder, onKeyDown }) {
  return (
    <InputBox>
      <StyledInput
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
      <BiSearch/>
    </InputBox>
    
  );
}
export default SearchBar;
