import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import AddUserToGroup from "./AddUserToGroup";
import { getAPICall, putAPICall } from "../api/apiService";
import DTable from "../TableComponent/DTable";
import SearchTransactions from "./SearchTransactions";
import { useParams } from "react-router-dom";
import EditTransaction from "./EditTransaction";
import ModalAddSplit from "./ModalAddSplit";
import { getUserId, getUserEmail, getUserName } from "../common/commonUtils";
const { frontend } = require("../config");
const GroupTransactions = ({
  group = { name: "383", link: "http://test.link/4FDA01A10440" },
  data,
}) => {
  const userId = getUserId();
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [dataFromModalAddSplit, setDataFromModalAddSplit] = useState("");
  const [tableLoading, setTableLoading] = useState(false);
  const [showAddSplitModal, setShowAddSplitModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [edit, setEdit] = useState([]);
  const [showEdit, setEditShow] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [
    transcationSuccessfromModalAddSplit,
    setTranscationSuccessfromModalAddSplit,
  ] = useState(0);
  const handleClose = () => setEditShow(false);
  const handleCloseAddSplitModal = () => setShowAddSplitModal(false);
  const handleShowddSplitModal = () => setShowAddSplitModal(true);
  // var userMapping = {}
  // const navigate = useNavigate();
  // if(userId==null){
  //   navigate('/login')
  // }
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  // const [loadingUserName, setLoadingUserName] = useState(true);
  const [userMappingFetch, setUserMappingFetch] = useState(false);
  const [displayPage, setDisplayPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const response = await getAPICall(`/groups/${userId}`);
        if (response) {
          // Use 'let' to declare the loop variable 'i'
          for (let i = 0; i < response.length; i++) {
            console.log("reposne123", response[i]);
            // Comparing the 'id' field in response with 'userId'
            if (response[i].id === id) {
              setDisplayPage(true);
              console.log("equal");
            }
          }
        }
      }
    };
    fetchData();
  }, [userId, id]);
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

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const email = await getUserEmail();
        setUserEmail(email);
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };
    fetchUserEmail();
  }, []);

  const [userMappingusestate, setUserMappingusestate] = useState({});
  const joinGroup = async () => {
    console.log("this put");
    // const userEmail=await getUserEmail()

    // const userName = await getUserName();
    let data = {};
    data["groupID"] = id;
    data["emailId"] = userEmail;
    data["userName"] = userName;
    console.log("data12354", data);

    await putAPICall("/groups", data);
    dataToModalSplit1(Math.random());
    setUserMappingFetch(true);
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAPICall(`/groups/userID/${id}`);
      if (response != null) {
        const userMapping = {};
        for (let i = 0; i < response.userAmounts.length; i++) {
          userMapping[response.userAmounts[i].userID] =
            response.userAmounts[i].userName;
          setUserMappingusestate(userMapping);
          setUserMappingFetch(false);
        }
      }
    };
    fetchData();
  }, [userMappingFetch, id]);

  const requestComplete = () => {
    setTranscationSuccessfromModalAddSplit(1);
  };

  const onDataNewReposnseUpdate = (data) => {
    setTransactions(data);
  };

  const receiveDataFromEdit = (data) => {
    setEdit(data);
    setEditShow(true);
  };

  const receiveDataFromDelete = async (data) => {
    await putAPICall("/transactions", data);
    setTableLoading(true);
    const response = await getAPICall(`/transactions1/${id}`);
    if (response != null) {
      setTransactions(response);
      const fetchData = async () => {
        await getAPICall(`/listUserPrice/${id}`);
      };
      fetchData();
    }
    setTableLoading(false);
  };

  const receiveDataFromSearchFilter = (data) => {
    setTransactions(data);
  };

  useEffect(() => {
    const postData = async () => {
      const response = await getAPICall("/totalUserBalance/" + id);
      setGroupName(response.groupName);
    };
    postData();
  }, [id, transactions]);

  useEffect(() => {
    const fetchData = async () => {
      setTableLoading(true);
      // await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await getAPICall(`/transactions1/${id}`);
      let transactionStatus = [];
      if (response != null) {
        for (let i = 0; i < response.length; i++) {
          if (response[i].transactionStatus === 1) {
            transactionStatus.push(response[i]);
          }
        }
        setTransactions(transactionStatus);
        setTableLoading(false);
      }
    };
    fetchData();
  }, [transcationSuccessfromModalAddSplit, id]);

  useEffect(() => {
    if (data != null) {
      setTransactions(data);
    }
  }, [data]);

  const onSaveAddUser = () => {
    setShowAddUserModal(false);
  };
  const onCancelAddUser = () => {
    setShowAddUserModal(false);
  };

  const receiveDataFromModalAddSplit = (event) => {
    setTransactions(event);
    setShowAddSplitModal(false);
  };

  const dataToModalSplit1 = (newMessage) => {
    setUserMappingFetch(true);
    setDataFromModalAddSplit(newMessage);
  };
  const linkToCopy = frontend + `/groups/${id}`;
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        // Successfully copied the link
        setCopied(true);
        // Reset the copied status after 2 seconds
        setTimeout(() => setCopied(false), 5000);
      })
      .catch((err) => {
        console.error("Failed to copy the link: ", err);
      });
  };

  return (
    <div id="group_details" style={{ paddingTop: "150px" }}>
      {displayPage ? (
        <>
          {showEdit && (
            <EditTransaction
              data={edit}
              onCancel={handleClose}
              show1={true}
              onDataNewReposnseUpdate={onDataNewReposnseUpdate}
            />
          )}

          <h3>{groupName + " Transactions"}</h3>

          {/* <h5 href={group.link}>{"Join link " + frontend + `/groups/${id}`}</h5> */}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "20px",
              }}
            >
              <Button
                variant="primary"
                size="md"
                onClick={() => setShowAddSplitModal(true)}
              >
                Add Split
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => setShowAddUserModal(true)}
              >
                Add User
              </Button>
            </div>

            <div>
              <a href={"groupbalance/" + id} className="ms-2 me-auto">
                <Button variant="primary" size="md">
                  Balance
                </Button>
              </a>
            </div>

            <div>
              <a href={"groupDetails/" + id} className="ms-2 me-auto">
                <Button variant="primary" size="md">
                  Group Details
                </Button>
              </a>
            </div>

            <div>
              <Button variant="primary" size="md" onClick={copyToClipboard}>
                {copied ? "Copied!" : "Group Invite"}
              </Button>
            </div>
          </div>

          <div
            id="transactions-table"
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              paddingTop: "2%",
              flexDirection: "column",
            }}
          >
            <SearchTransactions
              sendFilterTransaction={receiveDataFromSearchFilter}
            />
            <DTable
              columns={[
                "transactionName",
                "transactionPayeeID",
                "transactionAmount",
              ]}
              data={transactions}
              groupName={group.name}
              loading={tableLoading}
              currentUserId={userId}
              userMapping={userMappingusestate}
              sendDataGroupTransaction={receiveDataFromEdit}
              sendDataGroupDelete={receiveDataFromDelete}
            />
          </div>

          <ModalAddSplit
            groupNameDisplay="false"
            onDataReceivedFromModalAddSplit={receiveDataFromModalAddSplit}
            handleShowddSplitModal={handleShowddSplitModal}
            handleCloseAddSplitModal={handleCloseAddSplitModal}
            showAddSplitModal={showAddSplitModal}
            requestComplete={requestComplete}
            dataFromModalAddSplit={dataFromModalAddSplit}
          />

          <AddUserToGroup
            title={`Add User to ${group.name}`}
            onSave={onSaveAddUser}
            onCancel={onCancelAddUser}
            showModal={showAddUserModal}
            updateMessage={dataToModalSplit1}
          />
        </>
      ) : (
        <>
          <Button
            variant="primary"
            className="ms-2 me-auto"
            size="md"
            onClick={joinGroup}
          >
            Join Group
          </Button>
        </>
      )}
    </div>
  );
};

GroupTransactions.displayName = "GroupTransactions";

export default GroupTransactions;
