// ProfileTab.js
import { useEffect, useState } from "react";
import "./ProfileTab.css"; // Import the styles
import { getAPICall } from "../api/apiService";
import Cookies from "js-cookie";
function ProfileTab() {
  let userId = Cookies.get("userID");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAPICall("/userDetails?userId=" + userId);
      setUserName(response["userName"]);
      setUserEmail(response["userEmail"]);
    };
    fetchData();
  }, [userId]);
  return (
    <div className="profile-tab">
      <h2 className="profile-title">User Profile</h2>
      {userName && userEmail && (
        <div className="profile-info">
          <p className="profile-item">
            <strong>Username:</strong> <span>{userName}</span>
          </p>
          <p className="profile-item">
            <strong>Email:</strong> <span>{userEmail}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default ProfileTab;
