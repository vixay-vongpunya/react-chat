import Placeholder from "react-bootstrap/Placeholder";
import styled from "styled-components";
const CPlaceholder = styled(Placeholder)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
function ModalPlaceholder() {
  return (
    <>
      <CPlaceholder animation="glow">
        <Placeholder xs={9} />
        <Placeholder xs={7} size="sm" />
        <Placeholder xs={4} />
        <Placeholder xs={6} />
        <Placeholder xs={9} size="sm" />
        <Placeholder xs={6} size="sm" />
        <Placeholder xs={8} />
        <Placeholder xs={3} />
        <Placeholder xs={12} />
      </CPlaceholder>
    </>
  );
}
export default ModalPlaceholder;
