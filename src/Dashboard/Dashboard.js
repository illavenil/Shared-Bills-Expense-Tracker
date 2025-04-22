import { useState, useEffect } from "react";
import { getUserId } from "../common/commonUtils";
import { getAPICall } from "../api/apiService";

import "react-datepicker/dist/react-datepicker.css";
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import { Col, Row } from "react-bootstrap";
import Card2 from "./Card2";
// export const data = [
//     ["Task", "Hours per Day"],
//     ["Work", 11],
//     ["Eat", 2],
//     ["Commute", 2],
//     ["Watch TV", 2],
//     ["Sleep", 7],
//   ];

// export const options = {
//   title: "My Daily Activities",
// };

const Dashboard = () => {
  const userId = getUserId();
  const [dashboardData, setDashboardData] = useState([]);
  let startinital = new Date().toISOString().replace("Z", "");
  const [selectedEndDate, setSelectedEndDate] = useState(startinital);
  const [selectedStartDate, setSelectedStartDate] = useState(
    "1970-01-01T00:00:00.000",
  );

  const [selectedIndividualEndDate, setSelectedIndividualEndDate] =
    useState(startinital);
  const [selectedIndividualStartDate, setSelecteIndividualdStartDate] =
    useState("1970-01-01T00:00:00.000");
  // const [selectedTotalEndDate, setSelectedTotalEndDate] = useState(startinital);
  // const [selectedTotalStartDate, setSelecteTotaldStartDate] = useState('1970-01-01T00:00:00.000');

  const [dashboardDataIndividual, setDashboardDataIndividual] = useState([]);
  const handleDateChangeEndDate = (date) => {
    const isoString = date.toISOString().replace("Z", "");
    setSelectedEndDate(isoString);
  };

  const handleDateChangeStartDate = (date) => {
    const isoString = date.toISOString().replace("Z", "");
    setSelectedStartDate(isoString);
  };

  const handleDateChangenIdividualEndDate = (date) => {
    console.log("end date", date);
    const isoString = date.toISOString().replace("Z", "");
    console.log("end date iso string", isoString);
    setSelectedIndividualEndDate(isoString);
  };

  const handleDateChangeIndividualStartDate = (date) => {
    const isoString = date.toISOString().replace("Z", "");
    setSelecteIndividualdStartDate(isoString);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        let url = `/dashboard/group/${userId}?startDate=${selectedStartDate}&endDate=${selectedEndDate}`;
        const response = await getAPICall(url);
        if (response != null) {
          setDashboardData(response);
        }
      }
    };
    fetchData();
  }, [selectedStartDate, selectedEndDate, userId]);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        let url = `/dashboard/individual/${userId}?startDate=${selectedIndividualStartDate}&endDate=${selectedIndividualEndDate}`;
        const response = await getAPICall(url);
        if (response != null) {
          setDashboardDataIndividual(response);
        }
      }
    };
    fetchData();
  }, [selectedIndividualStartDate, selectedIndividualEndDate, userId]);

  let totalExpense = {};
  function updateTotalExpense(data) {
    for (let key in data) {
      if (!(key in totalExpense)) {
        totalExpense[key] = Math.round(data[key]);
      } else {
        totalExpense[key] += Math.round(data[key]);
      }
    }
  }
  updateTotalExpense(dashboardDataIndividual);
  updateTotalExpense(dashboardData);
  let lstIndividual = [["Task", "Hours per Day"]];
  let lstGroup = [["Task", "Hours per Day"]];
  let totalExpenselst = [["Task", "Hours per Day"]];

  function addData(data, lst) {
    for (let key in data) {
      lst.push([key, Math.round(data[key])]);
    }
    return lst;
  }
  addData(dashboardDataIndividual, lstIndividual);
  addData(dashboardData, lstGroup);
  addData(totalExpense, totalExpenselst);

  return (
    <div>
      <br />

      <h1>Dashboard</h1>
      <div className="container">
        <Row className="mb-3">
          {/* Dynamically adjust column size based on which data is available */}
          <Col md={lstIndividual && lstGroup ? 6 : 12}>
            {lstIndividual && lstIndividual.length > 1 ? (
              <Card2
                startDate={selectedIndividualStartDate}
                handleStartDate={handleDateChangeIndividualStartDate}
                handleEndDate={handleDateChangenIdividualEndDate}
                endDate={selectedIndividualEndDate}
                lst={lstIndividual}
                title={"Individual Expenses"}
              />
            ) : (
              <Card2
                startDate={selectedIndividualStartDate}
                handleStartDate={handleDateChangeIndividualStartDate}
                handleEndDate={handleDateChangenIdividualEndDate}
                endDate={selectedIndividualEndDate}
                title={"Individual Expenses"}
              />
            )}
          </Col>

          <Col md={lstIndividual && lstGroup ? 6 : 12}>
            {lstGroup && lstGroup.length > 1 ? (
              <Card2
                startDate={selectedStartDate}
                handleStartDate={handleDateChangeStartDate}
                handleEndDate={handleDateChangeEndDate}
                endDate={selectedEndDate}
                lst={lstGroup}
                title={"Group Expenses"}
              />
            ) : (
              <Card2
                startDate={selectedStartDate}
                handleStartDate={handleDateChangeStartDate}
                handleEndDate={handleDateChangeEndDate}
                endDate={selectedEndDate}
                title={"Group Expenses"}
              />
            )}
          </Col>
        </Row>
      </div>

      {/* Second Row: One Full-Width Column */}
      <div className="container">
        <Row className="mb-3">
          <Col md={11}>
            {totalExpenselst && totalExpenselst.length > 1 ? (
              <Card2
                // startDate={selectedTotalStartDate}
                // handleStartDate={handleDateChangeTotalStartDate}
                // handleEndDate={handleDateChangenTotalEndDate}
                // endDate={selectedTotalEndDate}
                lst={totalExpenselst}
                title={"Total Expenses"}
              />
            ) : (
              <Card2 title={"Total Expenses"} />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

Dashboard.displayName = "Dashboard";

export default Dashboard;
