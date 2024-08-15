import Modal from "react-bootstrap/Modal";
import ModalPlaceholder from "./ModalPlaceholder";
import Button from "./../Common/Button";
function SummarizedModal({ body, show, setShow, loading }) {
  return (
    <Modal show={show} backdrop={false} keyboard={false}>
      <Modal.Header>
        <Modal.Title>Summarized Content</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{loading ? <ModalPlaceholder /> : body}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button text="close" onClick={() => setShow(false)} />
      </Modal.Footer>
    </Modal>
  );
}
export default SummarizedModal;
