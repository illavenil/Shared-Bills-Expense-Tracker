import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getAPICall } from "../api/apiService";
import { useParams } from "react-router-dom";
function GroupDetails() {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState([]);
  const columns = [
    {
      name: "User Name",
      selector: (row) => row.userName, // Fixed: should display userName, not userBalance
      // width: '150px',  // Set a specific width for the column
    },
    {
      name: "User Balance",
      selector: (row) => (
        <span
          style={{
            color: row.userBalance < 0 ? "red" : "green",
            fontWeight: "bold",
          }}
        >
          {parseFloat(row.userBalance).toFixed(2)}
        </span>
      ),
      // width: '150px',  // Set a specific width for the column
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAPICall(`/groups/userID/${id}`);
      console.log("response", response.userAmounts);
      setUserDetails(response.userAmounts);
    };
    fetchData();
  }, [id]);
  // Custom styles for DataTable
  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
        backgroundColor: "#f4f4f4",
        fontSize: "16px",
        fontWeight: "600",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#e0e0e0",
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        minHeight: "48px",
        backgroundColor: "#fff",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        fontSize: "14px",
      },
    },
  };

  return (
    <div style={{ width: "60%", margin: "0 auto", paddingTop: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Group Details</h2>
      {userDetails && (
        <DataTable
          columns={columns}
          data={userDetails}
          customStyles={customStyles}
          highlightOnHover
          striped
        />
      )}
    </div>
  );
}

export default GroupDetails;
