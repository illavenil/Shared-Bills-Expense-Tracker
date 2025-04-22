import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import reportWebVitals from './reportWebVitals';
// import Home from './Home/Home';
// import GroupTransactions from './Group/GroupTransactions';
// import NoPage from './common/NoPage';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <App />
    <ToastContainer />
    {/* </React.StrictMode> */}
  </BrowserRouter>,
);

// reportWebVitals();

/* export default function Index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
          <Route path="group/*" element={<GroupTransactions />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />); */
