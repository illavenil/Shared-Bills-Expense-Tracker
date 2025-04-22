import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Loader from "../common/Loader";
import { MdOutlineModeEdit } from "react-icons/md";
import { Button } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { getUserName } from "../common/commonUtils";
import { useMediaQuery } from 'react-responsive';
const DTable = ({
  data,
  currentUserId,
  loading,
  userMapping,
  sendDataGroupTransaction,
  sendDataGroupDelete,
}) => {
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

  data.forEach((trans) => {
    const matchingUser = trans?.userSplit?.find(
      (user) => user.userID === currentUserId,
    );
    if (matchingUser) {
      trans["yourSplit"] = matchingUser.userBalance;
    }
    // Mapping with actual name to display
    trans.userSplit?.forEach((user) => {
      const id = user.userID;
      const name = userMapping[id] || id;
      user["userName"] = name;
    });
    const payeeName = userMapping[trans.transactionPayeeID];
    trans["payeeName"] = payeeName;
  });

  const onEditClick = (row) => {
    sendDataGroupTransaction(row);
  };

  const onDeleteClick = (row) => {
    sendDataGroupDelete(row);
  };

  const isDesktop = useMediaQuery({ minWidth: 768 }); // Change the width as per your requirement

  const columns = [
    {
      name: "Details",
      selector: (row) => row.payeeName,
      maxWidth: "150px",
      allowOverflow: false,
      format: (row) => (
        <div>
          {row.payeeName === userName ? (
            <> {"You paid"} {row.transactionAmount} </>
          ) : (
            <> {row.payeeName} {" paid "} {row.transactionAmount} </>
          )}
        </div>
      ),
    },
    {
      name: "Name",
      selector: (row) => row.transactionName,
      maxWidth: isDesktop ? "300px" : "150px",
    },
    ...(isDesktop ? [
      {
        name: "Time Stamp",
        selector: (row) => row.timeStamp,
        sortable: true,
        maxWidth: isDesktop ? "300px" : "150px",
      },
      {
        name: "Edit",
        button: true,
        cell: (row) => (
          <div style={{ display: 'flex', gap: '4px' }}>
          <Button onClick={() => onEditClick(row)} className="action-button">
            <MdOutlineModeEdit />
          </Button>
          </div>
        ),  
      },
      {
        name: "Delete",
        button: true,
        cell: (row) => (
          <div style={{ display: 'flex', gap: '4px' }}>
          <Button
            onClick={() => onDeleteClick(row)}
            className="action-button"
            variant="danger"
          >
            <BsTrash />
          </Button>
          </div>
        ),
      },
    ] : []),
  ];

  const conditionalRowStyles = [
    {
      // Receiving amount - green
      when: (row) => row.payeeName === userName,
      style: {
        backgroundColor: "rgb(83 197 139 / 64%)",
        color: "black",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      // Receiving amount - green
      when: (row) => row.payeeName !== userName,
      style: {
        backgroundColor: "rgba(255, 99, 71, 0.64)",
        color: "black",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      // Not involved in transaction
      when: (row) => row.yourSplit === undefined,
      style: {
        backgroundColor: "#80808042",
        color: "black",
        "&:hover": {
          cursor: "pointer",
        },
      },
      
    },
  ];

  const expandedRowComponent = ({ data }) => {
    return (
      <div>
        <b>{data.payeeName}</b> {" paid "} <b>{data.transactionAmount}</b>{" "}
        {" for "} <b>{data.transactionName}</b>
        {data.transactionDescription && (
          <pre>
            <b>{"Description:"}</b> {data.transactionDescription}
            <br />
            <b>{"Time Stamp:"}</b> {data.timeStamp}
          </pre>
        )}
        <div>
          {data.userSplit.map((split, index) => {
            const name = split.userName;
            const splitAmt = split.userBalance;
            return (
              <div key={index}>
                <div>
                  {" "}
                  <b>{name}</b> {splitAmt.toFixed(3)}
                </div>
              </div>
            );
          })}
        </div>
        {/* Add Edit and Delete buttons in the expandable row */}
        {isDesktop ? (
          null
          ) :   <div style={{ marginTop: "10px" }}>
          <Button
            onClick={() => onEditClick(data)}
            className="action-button"
            variant="primary"
          >
            <MdOutlineModeEdit /> Edit
          </Button>{" "}
          <Button
            onClick={() => onDeleteClick(data)}
            className="action-button"
            variant="danger"
          >
            <BsTrash /> Delete
          </Button>
        </div>} {/* Use null or an alternative component for the false condition */}

      </div>
    );
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
  };

  return (
    <>
     <div id="table-component" style={{ width: isDesktop ? "60%" : "90%", paddingTop: "24px",}}>
        {loading === false && data && data.length > 0 && (
          <DataTable
            columns={columns}
            data={data}
            pagination
            customStyles={customStyles}
            expandableRows
            expandableRowsComponent={expandedRowComponent}
            fixedHeader={true}
            fixedHeaderScrollHeight={"400px"}
            highlightOnHover
            pointerOnHover
            progressPending={loading}
            progressComponent={<Loader />}
            conditionalRowStyles={conditionalRowStyles}
            selectableRowsSingle={true}
            selectedRowsFlag={true}
          />
        )}

        {loading === false && data && data.length === 0 && (
          <div>{"No transactions to show"}</div>
        )}

        {loading === true && <Loader />}
      </div>
    </>
  );
};

DTable.displayName = "DTable";

export default DTable;
