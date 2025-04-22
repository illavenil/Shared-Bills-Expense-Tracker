import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getAPICall, postAPICall } from "../api/apiService";
// import { useData } from './DataContext';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../common/commonUtils";
function EditTransaction(props) {
  const [show, setShow] = useState(true);
  
  const { onCancel } = props;
  const { onDataNewReposnseUpdate } = props;
  const [error, setError] = useState("");
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

  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [allUserName, setAllUserName] = useState([]);
  // const [userSelect, setUserSelect] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [amount,setAmount]=useState(0);
  const [transactionDescription, setTransactionDescription] = useState('');
  const [transactionType,setTransactionType]=useState('')
  const handleClose = () => onCancel(0);
  const userId = getUserId();

  // useEffect(() => {
  //   // Check if transactions.transactionDescription is available
  //   if (transactions && transactions.transactionDescription) {
  //     setTransactionDescription(transactions.transactionDescription);
  //   }
  // }, [transactions]);


  // useEffect(() => {
  //   // Check if transactions.transactionDescription is available
  //   if (transactions && transactions.transactionSplitType) {
  //     setTransactionType(transactions.transactionSplitType);
  //   }
  // }, [transactions]);

  const navigate = useNavigate();
  if (userId == null) {
    navigate("/login");
  }

  useEffect(() => {
    setTransactions(props.data);
    setTransactionType(props.data.splitType);
    setTransactionDescription(props.data.transactionDescription)
    setAmount(props.data.transactionAmount);
    let all_users = [];
    for (let i = 0; i < props.data.userSplit.length; i++) {
      if (props.data.userSplit[i].userBalance > 0) {
        // setUserSelect(userSelect + 1);
        setFinalAmount(props.data.userSplit[i].userBalance);
      }
      const temp1 = {
        userID: props.data.userSplit[i].userID,
        userName: props.data.userSplit[i].userName,
        userBalance: props.data.userSplit[i].userBalance,
      };
      all_users.push(temp1);
    }

    setUsers(all_users);
  }, [props.data]);

  // useEffect(() => {
  //   setTransactions(props.data);
  //   let all_users = [];

  //   for (let i = 0; i < props.data.userSplit.length; i++) {
  //     if (props.data.userSplit[i].userBalance > 0) {
  //       // Use functional update to avoid stale state issues
  //       setUserSelect(prevUserSelect => prevUserSelect + 1);

  //       setFinalAmount(props.data.userSplit[i].userBalance);
  //     }

  //     const temp1 = {
  //       userID: props.data.userSplit[i].userID,
  //       userName: props.data.userSplit[i].userName,
  //       userBalance: props.data.userSplit[i].userBalance,
  //     };

  //     all_users.push(temp1);
  //   }

  //   setUsers(all_users);
  // }, [props.data]);

  const handleChangeBalance = (event, index) => {
    const newValue = parseFloat(event.target.value);

    // Check if the value is negative
    if (newValue < 0) {
      setError("Please enter a positive value.");
      // alert("Please enter a positive value."); // Alert or handle as needed
      return; // Stop the function if the value is negative
    }
     else {
      const { value } = event.target;
      const updatedUsers = [...users];
      updatedUsers[index].userBalance = value;
      setUsers(updatedUsers);
    }
  };

  const handleCheckboxChange = (event, index, userID, balance) => {
    const updatedUsers = [...users];
    let totalUserSelected = 0;
    for (let i = 0; i < users.length; i++) {
      if (users[i].userBalance > 0) {
        totalUserSelected += 1;
      }
    }
    if (balance > 0) {
      totalUserSelected = totalUserSelected - 1;
      setFinalAmount(transactions.transactionAmount / totalUserSelected);
      updatedUsers[index].userBalance = 0;
    } else {
      totalUserSelected = totalUserSelected + 1;
      setFinalAmount(transactions.transactionAmount / totalUserSelected);
      updatedUsers[index].userBalance = 1;
    }

    for (let i = 0; i < updatedUsers.length; i++) {
      if (updatedUsers[i].userBalance > 0) {
        updatedUsers[i].userBalance =
          transactions.transactionAmount / totalUserSelected;
      }
    }
    setUsers(updatedUsers);
  };
  useEffect(() => {
    setAllUserName(users.map((user) => user.userName));
  }, [users]);

  const handleAmountChange =(e)=>{
    const { name, value } = e.target;
    console.log("value",name);
    if(value>1000000){
      setError("Value is greater than 1000000");
    }
    else{
      setError("")
    }
    const updatedUsers = [...users];
    let totalUserSelected = 0;
    for (let i = 0; i < users.length; i++) {
      if (users[i].userBalance > 0) {
        totalUserSelected += 1;
      }
    }
    for (let i = 0; i < updatedUsers.length; i++) {
      if (updatedUsers[i].userBalance > 0) {
        updatedUsers[i].userBalance = value / totalUserSelected;
      }
    }
    setUsers(updatedUsers);
    setFinalAmount(value / totalUserSelected);
  }

  const handleSelectChangeDescription = (value) => {
    setTransactionDescription(value);
  };
  const handleTransactionChange =(value)=>{
    setTransactionType(value);

    const updatedUsers = [...users];
    let totalUserSelected = 0;
    for (let i = 0; i < users.length; i++) {
      if (users[i].userBalance > 0) {
        totalUserSelected += 1;
      }
    }
    for (let i = 0; i < updatedUsers.length; i++) {
      if (updatedUsers[i].userBalance > 0) {
        updatedUsers[i].userBalance = amount / totalUserSelected;
      }
    }
    setUsers(updatedUsers);
    setFinalAmount(amount / totalUserSelected);

  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactions((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    let userSplitTotal = 0;
    for (let i = 0; i < users.length; i++) {
      userSplitTotal += parseFloat(users[i].userBalance);
    }

    if (transactions["transactionAmount"]===0){
      setError("Amount is null");
    }
    else if(error!==''){
      setError('Value is greater 1000000')
    }
    else if (userSplitTotal === 0 && transactions["splitType"] === "equal") {
      setError("Select at least one user");
    }

    else if (
      Math.abs(
        parseFloat(userSplitTotal).toFixed(2) -
          parseFloat(transactions.transactionAmount).toFixed(2),
      ) > 0.01 &&
      transactions.splitType === "unequal"
    ) {
      setError("Total not matched");
      // setError("userSplit", { type: "custom", message: "Total not matched" });
    } 
    else {
      transactions["userSplit"] = users;
      transactions["splitType"] = transactionType;
      transactions["transactionDescription"]=transactionDescription
      for (const user of users) {
        if (user.userName === transactions.payeeName) {
          let updatedValue = user.userID;
          let updatedName = "transactionPayeeID";
          transactions["transactionPayeeID"] = user.userID;

          setTransactions((prevData) => ({
            ...prevData,
            [updatedName]: updatedValue,
          }));
        }
      }
      const response = await postAPICall("/transactions", transactions);
      const response2 = await getAPICall(`/transactions1/${id}`);
      if (response != null) {
        onDataNewReposnseUpdate(response2);
        const fetchData = async () => {
          await getAPICall(`/listUserPrice/${id}`);
        };
        fetchData();
      }
      setShow(false);
      onCancel(0);
      setError("");
    }
  };

  return (
    <div>
      {transactions && (
        <Modal show={show} onCancel={handleClose} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Select
                value={transactions.payeeName}
                name="payeeName"
                onChange={handleChange}
              >
                <option value="">Select</option>
                {allUserName.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
              </Form.Select>
              <Form.Group controlId="transactionName">
                <Form.Label>Description</Form.Label>

                <Form.Control
                  type="text"
                  name="transactionName"
                  value={transactions.transactionName}
                  onChange={handleChange}
                  pattern="[a-zA-Z0-9-_]*"
                />
              </Form.Group>
              <Form.Group controlId="transactionAmount">
                <Form.Label>Transaction Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="transactionAmount"
                  value={transactions.transactionAmount}
                  // onChange={handleChange}
                  onChange={(e) => {
                    handleChange(e);         
                    handleAmountChange(e);    
                  }}
                  min={0.01}
                  max={1000000}
                  step={0.01}
                />
              </Form.Group>
              <Form.Group controlId="transactionDescription">
                <Form.Label>Category</Form.Label>
                {/* <Form.Control
                  type="text"
                  name="transactionDescription"
                  value={transactions.transactionDescription}
                  onChange={handleChange}
                  pattern="[a-zA-Z0-9-_]*"
                /> */}
                
                <Form.Select
                  name="type"
                  className="form-control"
                  // onChange={handleChange}
                  onChange={(e) => handleSelectChangeDescription(e.target.value)}
                  value={transactionDescription}
                >
                {categories.map((description, idx) => (
                  <option key={idx} value={description.index}>
                    {description.content}
                  </option>
                ))}
            </Form.Select>
              </Form.Group>
              <Form.Group controlId="transactionSplitType">
                <Form.Label>Transaction Type</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="transactionSplitType"
                  value={transactionType}
                  // onChange={handleChange}
                  onChange={(e) => {
                    // handleChange();  
                    // handleAmountChange(e)       
                    handleTransactionChange(e.target.value);    
                  }}
                >
                  <option value="equal">Equal</option>
                  <option value="unequal">Unequal</option>
                </Form.Select>
              </Form.Group>

              {transactionType && transactionType === "unequal" &&
                users.map((u, index) => (
                  // !transactions.splitType && (
                  <Container>
                    <Row>
                      <Col>{u.userName}</Col>
                      <Col>
                      <Form.Control
                        type="number"
                        step={0.01}
                        key={index}
                        min={0}
                        max={1000000}
                        name={u.userName}
                        value={u.userBalance}
                        // value={
                        //   u.userBalance != null && !isNaN(u.userBalance)
                        //     ? Number(u.userBalance).toFixed(2)
                        //     : '0.00' // Fallback value if userBalance is null or not a number
                        // }
                        onChange={(event) => handleChangeBalance(event, index)} // Handle amount change
                      />

                      </Col>
                    </Row>
                  </Container>
                  // )
                ))}

              {transactionType && transactionType=== "equal" &&
                users.map((u, index) => (
                  <Form.Check
                    inline
                    label={u.userName}
                    type={"checkbox"}
                    key={index}
                    checked={u.userBalance > 0}
                    onChange={(e) =>
                      handleCheckboxChange(e, index, u.userID, u.userBalance)
                    }
                  />
                  // )
                ))}
              {error && <p style={{ color: "red" }}>{error}</p>}
              {transactionType === "equal" &&
                typeof finalAmount === "number" &&
                !isNaN(finalAmount) &&
                finalAmount !== Infinity && (
                  <p>Final Amount: {finalAmount.toFixed(3)} / per person</p>
                )}
              {/* Add other form fields for editing */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button>
            {/* {totalTransactions && <GroupTransactions data={totalTransactions} />} */}
          </Modal.Footer>
        </Modal>
      )}

      {/* <p>{props.data}</p> */}
    </div>
  );
}

export default EditTransaction;
