import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { postAPICall } from "../api/apiService";
import { getUserId } from "../common/commonUtils";
const { baseUrl2 } = require("../config");
function ModalAddPersonalSplit({
  amount,
  description,
  handleShowAddPersonalSplit,
  handleCloseAddpersonalSplit,
  transactionDate,
  requestComplete,
}) {
  const [details, setDetails] = useState("");
  const [formDescription, setFormDescritpion] = useState(description);
  const [formAmount, setFormAmount] = useState(amount);
  const [formDate, setFormDate] = useState(transactionDate);
  const timeString = new Date().toISOString();
  const userId = getUserId();

  const handleChangeFormDescription = (e) => {
    setFormDescritpion(e.target.value);
  };
  const handleFormAmount = (e) => {
    setFormAmount(e.target.value);
  };
  const handleFormDate = (e) => {
    console.log(e);
    const formattedDate = e.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    console.log(formattedDate);
    setFormDate(formattedDate);
  };

  const categories = [
    { index: "Miscellaneous", content: "Others" },
    { index: "House", content: "Housing & Utilities" },
    { index: "Transportation", content: "Transportation" },
    { index: "Groceries", content: "Groceries" },
    { index: "Dining", content: "Dining & Entertainment" },
    { index: "Health", content: "Health & Wellness" },
    { index: "Insurance", content: "Insurance" },
    { index: "Subscriptions", content: "Subscriptions" },
    { index: "Shopping", content: "Shopping" },
    { index: "Travel", content: "Travel" },
    { index: "Debt", content: "Debt Payments" },
    { index: "Investments", content: "Investments & Savings" },
    { index: "Family", content: "Family & Personal Care" },
  ];

  useEffect(() => {
    fetch(baseUrl2 + "/classify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: description }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response
        setDetails(data.classification); // Update state or process result
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });
  }, [description]);

  // (async () => {
  //     const data = { text: description };

  //     try {
  //         // Using await inside this async function
  //         let response = await postAPICall('/classify', data,2);
  //         setDetails(response.classification);
  //     } catch (error) {
  //         console.error('Error:', error);
  //     }
  // })();

  const handleSelectChangeDescription = (value) => {
    setDetails(value);
  };

  const handleSave = async () => {
    let data = {};
    data["transactionAmount"] = amount;
    data["transactionName"] = formDescription;
    const [month, day, year] = formDate.split("/");
    const dateObj = new Date(year, month - 1, day, 0, 0, 0);
    data["transactionDate"] = dateObj.toISOString();
    data["transactionDescription"] = details;
    data["timeStamp"] = timeString;
    data["userId"] = userId;
    let response = await postAPICall("/individualTransaction", data);

    // Logic to handle save action
    console.log("Saving:", data);
    if (response.message !== "Try Later") {
      requestComplete(1);
    }

    handleCloseAddpersonalSplit(); // Close modal after saving
  };

  return (
    <Modal
      show={handleShowAddPersonalSplit}
      onHide={handleCloseAddpersonalSplit}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Personal Split</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={formAmount}
              onChange={handleFormAmount}
              // readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDetails">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="type"
              className="form-control"
              value={details}
              onChange={(e) => handleSelectChangeDescription(e.target.value)}
            >
              {categories.map((details, idx) => (
                <option key={idx} value={details.index}>
                  {details.content}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Label>Transaction Date</Form.Label>
          <br />
          <DatePicker
            selected={formDate}
            onChange={handleFormDate}
            dateFormat="MM/dd/yyyy"
          />
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={formDescription}
              onChange={handleChangeFormDescription}
              // readOnly
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseAddpersonalSplit}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddPersonalSplit;
