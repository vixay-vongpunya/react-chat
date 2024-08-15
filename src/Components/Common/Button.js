import { styled } from "styled-components";

const StyledButton = styled.button`
  display: ${(props) => (props.hidden ? "hidden" : "block")};
  border: solid 1px var(--primary-color);
  border-radius: 4px;
  width: 100%;
  padding: 6px 0px;
  cursor: ${(props) => (props.disabled ? "text" : "pointer")};
  color: ${(props) => (props.$primary ? "white" : `var(--primary-color)`)};
  background-color: ${(props) =>
    props.$primary ? `var(--primary-color)` : "none"};
`;
function Button({ onClick, disabled, text, primary, hidden }) {
  return (
    <StyledButton
      onClick={onClick}
      $primary={primary}
      disabled={disabled ? true : false}
      hidden={hidden}
    >
      {text}
    </StyledButton>
  );
}
export default Button;
