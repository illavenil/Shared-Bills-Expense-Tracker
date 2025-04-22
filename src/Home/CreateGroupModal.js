import { useState, useEffect } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { getUserId, getUserName } from "../common/commonUtils";
import { getAPICall, postAPICall } from "../api/apiService";

const CreateGroupModal = ({
  showModal,
  modalId = "modal-form",
  size,
  onCancel,
  onDataReceived,
}) => {
  const userId = getUserId();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await getUserName();
        setUserName(name);
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };
    fetchUserName();
  }, []);
  const onSave = async (data) => {
    data["userAmounts"] = [
      {
        userID: userId,
        userName: userName,
        userBalance: 0.0,
      },
    ];
    data["groupOwner"] = userId;
    console.log("creating group", data);
    await postAPICall("/groups", data);
    const responseGet = await getAPICall("/groups/" + userId);
    if (responseGet != null) {
      onDataReceived(responseGet);
    }

    // Home()
    // Make a POST Call here.
    reset();
    onCancel();
  };

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
              {"Create new group"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="modal-form">
              <FloatingLabel controlId="floatingInput" label="Group name">
                <Form.Control
                  type="text"
                  placeholder="Group name"
                  {...register("groupName", {
                    required: "Group name is required",
                    pattern: {
                      value: /^[a-zA-Z0-9- _]+$/i,
                      message: "Invalid Group Name",
                    },
                  })}
                  name="groupName"
                  className="form-control"
                />
              </FloatingLabel>
              {errors?.groupName && (
                <p style={{ color: "red" }}>{errors.groupName.message}</p>
              )}
              <FloatingLabel
                controlId="floatingInput"
                label="Group description"
              >
                <Form.Control
                  type="text"
                  placeholder="Group description"
                  {...register("description", {
                    pattern: {
                      value: /^[a-zA-Z0-9- _]+$/i,
                      message: "Invalid Group description",
                    },
                  })}
                  name="description"
                  className="form-control"
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingSelect" label="Group Type">
                <Form.Select
                  {...register("groupType")}
                  name="groupType"
                  className="form-control"
                >
                  <option value="">Select Group Type</option>
                  <option value="Trip">Trip</option>
                  <option value="Home">Home</option>
                  <option value="Couple">Couple</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </FloatingLabel>

              {/* <FloatingLabel controlId="floatingSelect" label="Group Type">
                            <Form.Select {...register("type")} name="type" className='form-control'>
                                <option value="">Currency Type</option> 
                                <option value="USD">Trip</option>
                                <option value="EUR">Home</option>
                                <option value="JPY">Couple</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </FloatingLabel> */}

              {errors?.description && (
                <p style={{ color: "red" }}>{errors.description.message}</p>
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
      {/* <ToastContainer /> */}
    </>
  );
};

CreateGroupModal.displayName = "CreateGroupModal";

export default CreateGroupModal;
