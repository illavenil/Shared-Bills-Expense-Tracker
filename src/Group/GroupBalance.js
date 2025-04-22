import { useState, useEffect } from "react";
import { getAPICall } from "../api/apiService";
import { useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../common/commonUtils";
function GroupBalance() {
  const userId = getUserId();
  const navigate = useNavigate();
  if (userId == null) {
    navigate("/login");
  }

  const [userPrice, setUserPrice] = useState([]);
  // const [user,setUser]=useState([]);
  const { id } = useParams();
  const columns = [
    {
      name: "Lender",
      selector: (row) => row.lender,
      sortable: true,
    },
    {
      name: "Borrower",
      selector: (row) => row.borrower,
      sortable: true,
    },
    {
      name: "Balance",
      selector: (row) => row.amount,
      sortable: true,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAPICall(`/listUserPrice/${id}`);
      if (response != null) {
        setUserPrice(response);
      }
    };
    fetchData();
  }, [id]);
  useEffect(() => {
    const fetchData = async () => {
      await getAPICall(`/groups/userID/${id}`);
    };
    fetchData();
  }, [id]);
  return (
    <>
      <div id="home" style={{ paddingTop: "150px" }}>
        <h2 id="user-welcome-title">{"Balance Remaining Amount"}</h2>
        <DataTable columns={columns} data={userPrice} />
      </div>
    </>
  );
}
export default GroupBalance;
