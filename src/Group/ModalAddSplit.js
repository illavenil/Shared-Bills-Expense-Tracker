import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { getAPICall, postAPICall } from "../api/apiService";
import { useParams } from "react-router-dom";
import { getUserId } from "../common/commonUtils";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const ModalAddSplit = ({
  groupNameDisplay,
  amount,
  description,
  handleCloseAddSplitModal,
  onDataReceivedFromModalAddSplit,
  transactionDate,
  showAddSplitModal,
  requestComplete,
  dataFromModalAddSplit,
}) => {
  const [users, setUsers] = useState([]);
  const [splitType, setSplitType] = useState("");
  const [transaction, setTransaction] = useState(amount);
  const [allGroup, setAllGroup] = useState([]);
  const [numberSplit, setNumberSplit] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [userSplitEqual, setUserSplitEqual] = useState([]);
  const [allUserName, setAllUserName] = useState([]);
  const [transactionPayeeID, setTransactionPayeeID] = useState("");
  const [groupNameId, setGroupNameId] = useState("");
  const [details, setDetails] = useState(description);
  const [transactionDescription, setTransactionDescription] =
    useState("Miscellaneous");
  const [allUserID, setAllUserID] = useState([]);
  const UserId = getUserId();
  const navigate = useNavigate();
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
  const timeString = new Date().toISOString();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  useEffect(() => {
    if (transactionDate != null) {
      const [month, day, year] = transactionDate.split("/");
      const dateObj = new Date(year, month - 1, day, 0, 0, 0);
      setSelectedDate(dateObj);
    }
  }, [transactionDate]);

  if (UserId == null) {
    navigate("/login");
  }

  useEffect(() => {
    setTransaction(amount);
  }, [amount]);

  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
  } = useForm({ defaultValues: [{ userID: "", amount: 0.0 }] });

  const [displayGroupName, setDisplayGroupName] = useState(true);

  useEffect(() => {
    if (groupNameDisplay === "true") {
      setDisplayGroupName(true);
      setTransaction(amount);
    } else if (groupNameDisplay === "false") {
      setDisplayGroupName(false);
      setGroupNameId(id);
    }
  }, [groupNameDisplay, amount, id]);

  useEffect(() => {
    const fetchData = async () => {
      if (UserId != null) {
        const response = await getAPICall("/groups/" + UserId);
        let groupName = [];
        if (response != null) {
          setAllGroup(response);
        }
        for (let i = 0; i < response.length; i++) {
          groupName.push(response[i].name);
        }
      }
    };
    fetchData();
  }, [UserId]);

  useEffect(() => {
    const fetchData = async () => {
      let all_users = [];
      try {
        let apiString = "";
        if (id != null || groupNameId !== "") {
          if (groupNameId !== "" && displayGroupName === true) {
            apiString = "/groups/userID/" + groupNameId;
          } else {
            apiString = `/groups/userID/${id}`;
          }

          const response = await getAPICall(apiString);
          if (response != null) {
            // const temp = { ...response.userAmounts };
            for (let i = 0; i < response.userAmounts.length; i++) {
              const temp1 = {
                userID: response.userAmounts[i].userID,
                userName: response.userAmounts[i].userName,
                userBalance: 0,
              };
              all_users.push(temp1);
            }
            setUsers(all_users);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // dataFromModalAddSplit = '';
  }, [groupNameId, dataFromModalAddSplit, displayGroupName, id]);

  useEffect(() => {
    setAllUserName(users.map((user) => user.userName));
  }, [users]);

  const handleAmountChange = (value, index) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index] = { ...updatedUsers[index], userBalance: value };
      return updatedUsers;
    });
  };

  const handleSelectChangeTransactionPayeeID = (event) => {
    setTransactionPayeeID(users[event.target.selectedIndex - 1]?.userID || "");
  };

  const handleSelectChangeDescription = (value) => {
    setTransactionDescription(value);
  };

  const handleChangeDetails = (value) => {
    setDetails(value);
  };

  const handleSplitChange = (value) => {
    setSplitType(value);
  };

  const handleTransactionChange = (value) => {
    setTransaction(parseFloat(value));
  };

  useEffect(() => {
    if (
      register("userSplit") === undefined ||
      register("userSplit").value === undefined
    ) {
      setValue("userSplit", []);
    }
  });

  const onSaveData = (data) => {
    let totalSum = 0;

    let totalSumArray = users.map((user) => parseFloat(user.userBalance));
    setAllUserID(users.map((user) => (user.userID)))
    for (let i = 0; i < totalSumArray.length; i++) {
      if (!isNaN(totalSumArray[i])) {
        totalSum += totalSumArray[i];
      }
    }
    if (numberSplit === 0 && data["splitType"] === "equal") {
      setError("userSplit", {
        type: "custom",
        message: "Select at least one user",
      });
    }
    else if(transaction>1000000){
      setError("Transaction is greater than 1000000")
    } 
    else if (
      Math.abs(parseFloat(totalSum) - parseFloat(data.transactionAmount)) >
        0.01 &&
      splitType === "unequal"
    ) {
      setError("userSplit", {
        type: "custom",
        message: "Total does not match",
      });
      // totalSumArray = []
    } else if (userSplitEqual.length === 0 && splitType === "equal") {
      setError("userSplit", {
        type: "custom",
        message: "Minimum 1 member must be selected",
      });
    } else if (splitType === "unequal") {
      data["userSplit"] = users;
      data["transactionPayeeID"] = transactionPayeeID;
      data["splitType"] = splitType;
      data["groupID"] = groupNameId;
      data["timeStamp"] = timeString;
      data["transactionDate"] = selectedDate;
      data["transactionDescription"] = transactionDescription;
      delete data.users;
      const getData = async () => {

        let apiString = "";
        let apiString1 = "";

        if (id != null || groupNameId !== "") {
          if (groupNameId !== "" && displayGroupName === true) {
            apiString = "/transactions1/" + groupNameId;
            apiString1 = "/listUserPrice/" + groupNameId;
          } else {
            apiString = `/transactions1/${id}`;
            apiString1 = `/listUserPrice/${id}`;
          }

          const transactionDetails = await getAPICall(apiString);
          if (transactionDetails != null) {
            await getAPICall(apiString1);
            onDataReceivedFromModalAddSplit(transactionDetails);
          }
        }

        resetForm();
        setDetails("");
        setTransaction("");
      };
      const postData = async () => {
        let response = await postAPICall("/transactions", data);
        if (response.message !== "Try Later") {
          requestComplete(1);
          handleModalClose();
          getData();
        }
      };
      postData();
    } else if (splitType === "equal") {
        let userSplitFinal = [];
        // setAllUserID

      for (let i = 0; i < userSplitEqual.length; i++) {
        const userSplit = {
          userID: userSplitEqual[i],
          userName: userSplitEqual[i],
          userBalance: parseFloat(finalAmount).toFixed(3),
        };
        userSplitFinal.push(userSplit);
      }

      const updatedUncheckedUsers = allUserID.filter(user => !userSplitEqual.includes(user));

    //   let uncheck=allUserID-userSplitEqual
      for (let i = 0; i < (updatedUncheckedUsers).length; i++) {
        const userSplit = {
          userID: updatedUncheckedUsers[i],
          userName: updatedUncheckedUsers[i],
          userBalance: 0,
        };
        userSplitFinal.push(userSplit);
      }
      data["userSplit"] = userSplitFinal;
      data["transactionPayeeID"] = transactionPayeeID;
      data["splitType"] = splitType;
      data["groupID"] = groupNameId;
      data["timeStamp"] = timeString;
      data["transactionDate"] = selectedDate;
      data["transactionDescription"] = transactionDescription;
      delete data.users;

      const getData = async () => {
        let apiString = "";
        let apiString1 = "";

        if (id != null || groupNameId !== "") {
          if (groupNameId !== "" && displayGroupName === true) {
            apiString = "/transactions1/" + groupNameId;
            apiString1 = "/listUserPrice/" + groupNameId;
          } else {
            apiString = `/transactions1/${id}`;
            apiString1 = `/listUserPrice/${id}`;
          }

          const transactionDetails = await getAPICall(apiString);
          if (transactionDetails != null) {
            await getAPICall(apiString1);
            onDataReceivedFromModalAddSplit(transactionDetails);
          }
        }

        resetForm();
        setDetails("");
        setTransaction("");
      };

      const postData = async () => {
        let response = await postAPICall("/transactions", data);
        setUserSplitEqual([]);
        setDetails("");
        setTransaction("");
        userSplitFinal = [];
        if (response.message !== "Try Later") {
          requestComplete(1);
          handleModalClose();
          getData();
        }
      };

      postData();
    }
  };

  const handleCheckboxChange = (userID, checked) => {
    if (checked) {
      setNumberSplit((prevNumberSplit) => prevNumberSplit + 1);
      setUserSplitEqual((prevList) => [...prevList, userID]);
    //    setAllUserID(prevList => prevList.filter(id => id !== userID));
    } else {
      setNumberSplit((prevNumberSplit) => prevNumberSplit - 1);
      setUserSplitEqual((prevList) => prevList.filter((id) => id !== userID));
    //    setAllUserID(prevList => [...prevList, userID]);
    }
  };

  const handleChangeGroupName = (event) => {
    setGroupNameId(event.target.value);
  };

  useEffect(() => {
    setFinalAmount(transaction / numberSplit);
  }, [transaction, numberSplit]);

  const resetForm = () => {
    reset();
    setSplitType("");
    setTransaction(0);
    setFinalAmount(0);
    setNumberSplit(0);
  };

  const handleModalClose = () => {
    resetForm();
    handleCloseAddSplitModal();
  };

  return (
    <Modal show={showAddSplitModal} onHide={handleModalClose}>
      <form onSubmit={handleSubmit(onSaveData)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Split</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-form">
            {displayGroupName && (
              <label htmlFor="transaction-name">Group Name</label>
            )}
            {displayGroupName && (
              <Form.Select
                {...register("groupName")}
                onChange={handleChangeGroupName}
              >
                <option value="">Select</option>
                {allGroup.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Form.Select>
            )}
            <label htmlFor="transaction-id">Payee Name</label>
            <Form.Select
              {...register("transactionPayeeID")}
              onChange={handleSelectChangeTransactionPayeeID}
              required
            >
              <option value="">Select</option>
              {allUserName.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
            <label htmlFor="transaction-name">Description</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Transaction name"
              name="transactionName"
              value={details}
              required
              {...register("transactionName", {
                required: "Transaction name is required",
                maxLength: {
                  value: 150,
                  message: "Name cannot exceed 150 chars",
                },
              })}
              onChange={(e) => handleChangeDetails(e.target.value)}
            />
            {errors?.transactionName && (
              <p style={{ color: "red" }}>{errors.transactionName.message}</p>
            )}

            <label htmlFor="transaction-name">Category</label>
            <Form.Select
              name="type"
              className="form-control"
              onChange={(e) => handleSelectChangeDescription(e.target.value)}
            >
              {categories.map((description, idx) => (
                <option key={idx} value={description.index}>
                  {description.content}
                </option>
              ))}
            </Form.Select>

            <label htmlFor="date">Transaction Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
            <br />
            {/* <input
                            type="text"
                            className="form-control"
                            aria-describedby="inputGroup-sizing-sm"
                            placeholder='Description'
                            name="description"
                            
                            {...register("description", { maxLength: { value: 150, message: "Description cannot exceed 150 chars" } })}
                        /> */}
            {errors?.description && (
              <p style={{ color: "red" }}>{errors.description.message}</p>
            )}

            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              step={0.01}
              className="form-control"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Amount in USD"
              name="transactionAmount"
              min={0.01}
              max={1000000}
              value={transaction}
              required
              {...register("transactionAmount", {
                required: "Transaction amount is required",
              })}
              onChange={(e) => handleTransactionChange(e.target.value)}
            />
            {errors?.transactionAmount && (
              <p style={{ color: "red" }}>{errors.transactionAmount.message}</p>
            )}

            <label htmlFor="type">Split Type</label>
            <Form.Select
              aria-label="Select Split type"
              {...register("splitType", {
                required: "Split type is mandatory",
              })}
              onChange={(e) => handleSplitChange(e.target.value)}
              required
            >
              <option value="">{"select the Split type"}</option>
              <option value="equal">{"Equal Split"}</option>
              <option value="unequal">{"Unequal Split"}</option>
            </Form.Select>

            {users.length > 0 &&
              users.map((u, index) => (
                <div id="user-split" key={index}>
                  {splitType === "equal" && (
                    <Form.Check
                      inline
                      label={u.userName}
                      type={"checkbox"}
                      key={index}
                      name={`userSplit.${index}.${u.userName}.userBalance`}
                      onChange={(e) =>
                        handleCheckboxChange(
                          u.userID,
                          e.target.checked,
                          index,
                          e.target.value,
                        )
                      }
                    />
                  )}
                  {splitType === "unequal" && (
                    <Container>
                      <Row>
                        <Col>{u.userName}</Col>
                        <Col>
                          <Form.Control
                            type="number"
                            label={u.userName}
                            // placeholder={u.userName}
                            name={`userSplit.${index}.${u.userName}.userBalance`}
                            step={0.01}
                            min={0}
                            max={10000000}
                            onChange={(e) =>
                              handleAmountChange(e.target.value, index)
                            }
                          />
                        </Col>
                      </Row>
                    </Container>
                  )}
                </div>
              ))}
            {splitType === "equal" &&
              typeof finalAmount === "number" &&
              !isNaN(finalAmount) &&
              isFinite(finalAmount) && (
                <p>
                  Final Amount: {parseFloat(finalAmount).toFixed(3)} / per
                  person
                </p>
              )}

            {errors?.userSplit && (
              <p style={{ color: "red" }}>{errors.userSplit.message}</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalAddSplit;
