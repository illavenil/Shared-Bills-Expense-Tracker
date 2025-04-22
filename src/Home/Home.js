import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import CreateGroupModal from "./CreateGroupModal";
import { getAPICall } from "../api/apiService";
import { getUserId, getUserName } from "../common/commonUtils";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";
import { RiFlightTakeoffLine } from "react-icons/ri";
import { MdFamilyRestroom } from "react-icons/md";
import "./Home.css";

function getRandomDarkColor() {
  const darkColors = [
    "#000000",
    "#2F4F4F",
    "#191970",
    "#00008B",
    "#000080",
    "#006400",
    "#556B2F",
    "#483D8B",
    "#800000",
    "#8B0000",
    "#8B4513",
    "#654321",
    "#8B008B",
    "#9400D3",
    "#4B0082",
    "#008B8B",
    "#696969",
    "#A9A9A9",
    "#36454F",
    "#3F000F",
  ];
  return darkColors[Math.floor(Math.random() * darkColors.length)];
}

function Home() {
  const [groups, setGroups] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const userId = getUserId();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const response = await getAPICall(`/groups/${userId}`);
        if (response) {
          setGroups(response);
        }
      }
      setIsLoading(false); // Done fetching user data
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    const postData = async () => {
      if (userId) {
        const response = await getAPICall(`/userBalance/${userId}`);
        if (response && response.totalBalance != null && !isNaN(response.totalBalance)) {
          setTotalBalance(response.totalBalance.toFixed(2));
        }
      }
    };
    postData();
  }, [userId]);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await getUserName();
        setUserName(name);
      } catch (error) {
        console.error("Error fetching user name:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserName();
  }, []);
  const userDetails = { name: userName, id: userId };

  const listGroupsRender = (groups) => {
    return groups?.map((g) => (
     <li className="list-group-item d-flex align-items-center" key={g.id}>
      <a href={`groups/${g.id}`} className="ms-2 me-auto d-flex align-items-center">
        <div className="icon-circle">
          {g.type === null && <TbNotes color={getRandomDarkColor()} />}
          {g.type === "Home" && <FaHome color={getRandomDarkColor()} />}
          {g.type === "Trip" && <RiFlightTakeoffLine color={getRandomDarkColor()} />}
          {g.type === "Couple" && <MdFamilyRestroom color={getRandomDarkColor()} />}
          {g.type === "Other" && <TbNotes color={getRandomDarkColor()} />}
        </div>
        <span className="group-name ms-2">{g.name}</span>
      </a>
      {g.balance > 0 ? (
        <span className="badge bg-success rounded-pill">
          {parseFloat(g.balance).toFixed(2)}
        </span>
      ) : (
        <span className="badge bg-danger rounded-pill">
          {parseFloat(g.balance).toFixed(2)}
        </span>
      )}
    </li>

    ));
  };

  const [openModal, setOpenModal] = useState(false);

  const handleDataFromModal = (data) => {
    setGroups(data);
  };

  const onCancel = () => {
    setOpenModal(false);
  };

  const onSubmit = (data) => {
    (async () => {
      console.log("create-group-data---", data);
    })();
  };

  if (isLoading) {
    return <div>Loading...</div>; // Loading indicator until username is fetched
  }

  return (
    <div id="home" style={{ paddingTop: "150px" }}>
      {userName && (
        <h2 id="user-welcome-title">{"Welcome " + userDetails?.name}</h2>
      )}
      <div>
        {totalBalance >= 0 ? (
          <>
            <h5 style={{ display: "inline-block", marginRight: "10px" }}>
              Overall, you are owed
            </h5>
            <span className="badge bg-success rounded-pill">
              {totalBalance}
            </span>
          </>
        ) : (
          <>
            <h5 style={{ display: "inline-block", marginRight: "10px" }}>
              Overall, you own
            </h5>
            <span className="badge bg-danger rounded-pill">{totalBalance}</span>
          </>
        )}
      </div>
      
      <div id="groups-list" className="groups-list">
        <ul className="list-group">{listGroupsRender(groups)}</ul>
      </div>

      <Button variant="primary" size="md" onClick={() => setOpenModal(true)}>
        {" "}
        {"Create group"}
      </Button>
      <a href={"transactionData"} className="ms-2 me-auto">
        <Button variant="primary" size="md">
          {" "}
          {"Upload Statement pdf"}
        </Button>
      </a>
      <CreateGroupModal
        onSave={onSubmit}
        onCancel={onCancel}
        showModal={openModal}
        onDataReceived={handleDataFromModal}
      />
    </div>
  );
}

Home.displayName = "Home";
export default Home;
