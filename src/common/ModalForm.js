import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { postAPIpdfCall } from "../api/apiService";
import TransactionData from "../Group/TransactionData";
// import { deleteAPICall } from '../api/apiService';
const ModalForm = ({
  showModal,
  title,
  contents,
  onCancel,
  modalId = "modal-form",
  size,
}) => {
  // const navigate = useNavigate();
  const [onButton, setOnButton] = useState(false);
  const onSave = () => {
    setOnButton(true);
  };
  const handleFileChange = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("userid", "65ad993bd74404710e5984b3");
    await postAPIpdfCall(formData, "http://127.0.0.1:5000/");
  };
  return (
    <>
      <Modal
        show={showModal}
        size={size}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={true}
        id={modalId}
        backdrop="static"
        keyboard={false}
        onHide={onCancel}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {<input type="file" onChange={handleFileChange} />}
          {/* <h5>{subTitle}</h5> */}
          {contents}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onCancel} variant="secondary">
            Cancel
          </Button>
          <Button onClick={onSave} variant="primary">
            Save
          </Button>
          <button type="submit">Upload</button>
          {onButton && <TransactionData name="john" />}
        </Modal.Footer>
      </Modal>
    </>
  );
};

ModalForm.displayName = "ModalForm";

export default ModalForm;
