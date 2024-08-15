import styled from "styled-components";
import { Dropdown, DropdownButton } from "react-bootstrap";

const CustomDropdownButton = styled(DropdownButton)`
  .btn-link {
    color: black;
  }
  .dropdown-toggle::after {
    display: none;
  }
  .dropdown-toggle {
    padding: 0px;
  }
`;
function CustomDropdown({ options, handleOption, item, optionType, title }) {
  return (
    <CustomDropdownButton variant="link" title={title}>
      {options.map((option) => (
        <Dropdown.Item
          key={option.value}
          onClick={(event) => {
            handleOption(option.value, item, optionType);
          }}
        >
          {option.text}
        </Dropdown.Item>
      ))}
    </CustomDropdownButton>
  );
}
export default CustomDropdown;
