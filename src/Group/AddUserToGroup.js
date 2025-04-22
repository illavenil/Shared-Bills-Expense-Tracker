import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { putAPICall } from "../api/apiService";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../common/commonUtils";
import { getAPICall } from "../api/apiService";
const AddUserToGroup = ({
  title,
  showModal,
  modalId = "modal-form",
  size,
  onCancel,
  updateMessage,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { id } = useParams();
  const userId = getUserId();
  // const userName=getUserName();
  const navigate = useNavigate();
  if (userId == null) {
    navigate("/login");
  }
  const onSave = async (data) => {
    data["groupID"] = id;
    const response = await getAPICall(
      "/userEmail?userEmail=" + data["emailId"],
    );
    if (response != null) {
      data["userName"] = response["userName"];
      await putAPICall("/groups", data);
    }
    // Make a POST Call here.

    reset();
    onCancel();
    updateMessage(Math.random());
    // updateMessage("fail")
  };

  // const handleClick = () => {
  //     updateMessage('Hello from Child!');
  // };

  const onClose = () => {
    reset();
    onCancel();
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
        onHide={onClose}
      >
        <form onSubmit={handleSubmit(onSave)}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {/* {"Add User"} */}
              {title}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="modal-form">
              <FloatingLabel controlId="floatingInput" label="Email-id">
                <Form.Control
                  type="text"
                  placeholder="Email-id"
                  {...register("emailId", {
                    required: "Email id is required",
                  })}
                  name="emailId"
                  className="form-control"
                />
              </FloatingLabel>
              {errors?.emailId && (
                <p style={{ color: "red" }}>{errors.emailId.message}</p>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onClose} variant="secondary">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      {/* <button onClick={handleClick}>Update Parent Message11</button> */}
      {/* <ToastContainer /> */}
    </>
  );
};

AddUserToGroup.displayName = "AddUserToGroup";

export default AddUserToGroup;

// import React from 'react';

// const AddUserToGroup = ({ updateMessage }) => {
//   const handleClick = () => {
//     updateMessage('Hello from Child!');
//   };

//   return (
//     <div>
//       <h2>Child Component</h2>
//       <button onClick={handleClick}>Update Parent Message</button>
//     </div>
//   );
// };

// export default AddUserToGroup;
