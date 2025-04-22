import "./App.css";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Signup from "./Login/Signup.js";
import NoPage from "./common/NoPage.js";
import GroupBalance from "./Group/GroupBalance.js";
import TransactionData from "./Group/TransactionData.js";
import ChildComponent from "./Group/ChildComponent.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import HeaderLogin from "./Header/HeaderLogin.js";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Dashboard/Dashboard.js";
import GroupDetails from "./Group/GroupDetails.js";
import ProfileTab from "./Profile/ProfileTab.js";
import Header from "./Header/Header.js";
import Footer from "./Footer/Footer.js";
import GroupTransactions from "./Group/GroupTransactions.js";
import Cookies from "js-cookie";
// const userId = getUserId(); // Assume this function checks for a valid user session

// ProtectedRoute component to handle route protection
function ProtectedRoute({ element }) {
  const location = useLocation();
  return Cookies.get("userID") ? element : <Navigate to="/login" state={{ from: location }} replace />;
}

function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/Signup";

  return (
    <div className="App" id="app" style={{ position: "relative" }}>
      <div className="header-container ">
        {isAuthPage ? <HeaderLogin /> : <Header />}
      </div>
      <div className="content-container">
        <Routes>
          {/* Public routes */}

          <Route path="/login" index element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route
            path="/"
            index
            element={<ProtectedRoute element={<Home />} />}
          />
          <Route
            path="/home"
            index
            element={<ProtectedRoute element={<Home />} />}
          />
          <Route
            path="/ProfileTab"
            index
            element={<ProtectedRoute element={<ProfileTab />} />}
          />
          <Route
            path="/groups/:id"
            element={<ProtectedRoute element={<GroupTransactions />} />}
          />
          <Route
            path="/groups/groupbalance/:id"
            element={<ProtectedRoute element={<GroupBalance />} />}
          />
          <Route
            path="/transactionData"
            element={<ProtectedRoute element={<TransactionData />} />}
          />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/ChildComponent"
            element={<ProtectedRoute element={<ChildComponent />} />}
          />
          <Route
            path="groups/GroupDetails/:id"
            element={<ProtectedRoute element={<GroupDetails />} />}
          />

          {/* Catch-all route */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

App.displayName = "App";
export default App;
