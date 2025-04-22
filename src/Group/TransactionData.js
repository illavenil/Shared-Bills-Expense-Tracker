import { useState } from "react";
import { Button } from "react-bootstrap";
import { postAPIpdfCall } from "../api/apiService";
import { MdOutlineModeEdit } from "react-icons/md";
import DataTable from "react-data-table-component";
import { BsTrash } from "react-icons/bs";
import ModalAddSplit from "./ModalAddSplit";
import { getUserId } from "../common/commonUtils";
import { useNavigate } from "react-router-dom";
import ModalAddPersonalSplit from "./ModalAddPersonalSplit";
import { useMediaQuery } from 'react-responsive';
import './TransactionData.css'
const TransactionData = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const UserId = getUserId();
  const navigate = useNavigate();
  if (UserId == null) {
    navigate("/login");
  }
  const [bankStatementData, setBankStatementData] = useState([]);
  const [showAddSplitModal, setShowAddSplitModal] = useState(false);
  const [showAddPersonalSplit, setShowAddPersonalSplit] = useState(false);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [transactionDate, setTransactionDate] = useState("");

  const handleCloseAddSplitModal = () => setShowAddSplitModal(false);
  const handleShowddSplitModal = () => setShowAddSplitModal(true);

  const handleCloseAddpersonalSplit = () => setShowAddPersonalSplit(false);

  const userId = getUserId();
  const [cardType, setCardType] = useState("");
  const [year, setYear] = useState();
  const [row1, setRow1] = useState("");
  const handleFileChange = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("userid", userId);
    formData.append("fileName", event.target.files[0].name);
    const reposnse = await postAPIpdfCall(formData, "/bankTransaction");
    if (reposnse != null) {
      setBankStatementData(reposnse);
      const bankStatementData = reposnse.slice(0, -1);
      setCardType(reposnse[reposnse.length - 1].card_type);
      setYear(reposnse[reposnse.length - 1].year);
      setBankStatementData(bankStatementData);
    } else {
      setBankStatementData(null);
    }
  };
  const receiveDataFromModalAddSplit = async () => {
    // const response= await putAPICall('/bankTransaction',data,2);
    // const response1=await getAPICall('/bankTransaction/'+fileName+'_'+userId,2);
  };
  const requestComplete = (childData) => {
    if (childData === 1) {
      const updatedStatement = bankStatementData.filter(
        (item) => item !== row1,
      );
      setBankStatementData(updatedStatement);
    }
  };

  const onDeleteClick = (row) => {
    console.log("delete button press")
    console.log(row)
    // Filter out the row from bankStatementData
    const updatedStatement = bankStatementData.filter((item) => item !== row);

    setBankStatementData(updatedStatement);
  };

  const onAddSplit = async (row) => {
    console.log("row", row);
    // setTransactionId(row['_id']['$oid']);
    setRow1(row);
    const parsedNumber = parseFloat(row.Amount.substring(1));
    setAmount(parsedNumber);
    setDescription(row.Details.substring(0, 149));
    setTransactionDate(row.Date);

    // setAddSplit(true);
    setShowAddSplitModal(true);
  };

  const onAddPersonal = async (row) => {
    console.log(row);
    // setTransactionId(row['_id']['$oid']);
    setRow1(row);
    // setIndex1(index);
    const parsedNumber = parseFloat(row.Amount.substring(1));
    setAmount(parsedNumber);
    setDescription(row.Details.substring(0, 149));
    setTransactionDate(row.Date);

    // setAddSplit(true);
    setShowAddPersonalSplit(true);
  };
  const columns = isDesktop ? [
    {
      name: "Amount",
      selector: (row) => row.Amount,
      sortable: true,
    },
    {
      name: "Details",
      selector: (row) =>
        row.Details.length > 23
          ? row.Details.slice(0, 23) + "..."
          : row.Details,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.Date,
      sortable: true,
    },
    {
      name: "Add Split",
      button: true,
      cell: (row, index) => (
        <Button
          onClick={() => onAddSplit(row, index)}
          className="action-button"
        >
          <MdOutlineModeEdit />
        </Button>
      ),
    },
    {
      name: "Delete",
      button: true,
      cell: (row, index) => (
        <Button
          onClick={() => onDeleteClick(row, index)}
          className="action-button"
          variant="danger"
        >
          <BsTrash />
        </Button>
      ),
    },
    {
      name: "Add Personal expense",
      button: true,
      cell: (row, index) => (
        <Button
          onClick={() => onAddPersonal(row, index)}
          className="action-button"
          variant="warning"
        >
          <MdOutlineModeEdit />
        </Button>
      ),
    },
  ] : [
    {
      name: "Amount & Date",
      selector: (row) => `${row.Amount} - ${row.Date}`,
      sortable: true,
      cell: (row) => {
        const amountAndDate = `${row.Amount} - ${row.Date}`;
        const details = row.Details;
        
        return (
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginBottom: "5px" // Space between rows
              }}
            >
              {amountAndDate.length > 40 ? amountAndDate.slice(0, 40) + "..." : amountAndDate}
            </div>
            <div
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {details.length > 30 ? details.slice(0, 30) + "..." : details}
            </div>
          </div>
        );
      },
      maxWidth: "280px"
    },
    {
      name: "Actions",
      button: true,
      cell: (row, index) => (
        <div className="button-group" style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            onClick={() => onAddSplit(row, index)}
            className="action-button"
          >
            <MdOutlineModeEdit />
          </Button>
          <Button
            onClick={() => onDeleteClick(row, index)}
            className="action-button"
            variant="danger"
            style={{ marginLeft: '5px' }} // Space between the buttons
          >
            <BsTrash />
          </Button>
          <Button
            onClick={() => onAddPersonal(row, index)}
            className="action-button"
            variant="warning"
            style={{ marginLeft: '5px' }} // Space between the buttons
          >
            <MdOutlineModeEdit />
          </Button>
        </div>
      ),
    },
  ];

  
  
  
  

  return (
    <>
      <div id="group_details" style={{ paddingTop: "150px" }}>
        {showAddSplitModal && (
          <ModalAddSplit
            groupNameDisplay="true"
            amount={amount}
            description={description}
            transactionDate={transactionDate}
            handleShowddSplitModal={handleShowddSplitModal}
            handleCloseAddSplitModal={handleCloseAddSplitModal}
            onDataReceivedFromModalAddSplit={receiveDataFromModalAddSplit}
            showAddSplitModal={showAddSplitModal}
            requestComplete={requestComplete}
          />
        )}

        {showAddPersonalSplit && (
          <ModalAddPersonalSplit
            amount={amount}
            description={description}
            transactionDate={transactionDate}
            handleShowAddPersonalSplit={showAddPersonalSplit}
            handleCloseAddpersonalSplit={handleCloseAddpersonalSplit}
            showAddPersonalSplit={showAddPersonalSplit}
            requestComplete={requestComplete}
          />
        )}

        {<input type="file" onChange={handleFileChange} />}
        {year ? (
          <>
            <p>Card type : {cardType}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
        {bankStatementData ? ( // Conditional rendering based on data availability
          <>
          <div
            id="table-component"
            style={{
              width: "70%",
              paddingTop: "24px",
              margin: "auto",
              textAlign: "center",
            }}
          >
            <DataTable
              columns={columns}
              data={bankStatementData}
              pagination
              fixedHeader={true}
              highlightOnHover
              pointerOnHover
              responsive // Add this prop
            />
          </div>

          </>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
};

export default TransactionData;



