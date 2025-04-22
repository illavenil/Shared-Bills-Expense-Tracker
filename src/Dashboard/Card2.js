import { Card, Col, Row } from "react-bootstrap";
import Card1 from "./Pie";
import DatePicker from "react-datepicker";
import "bootstrap/dist/css/bootstrap.min.css";

function Card2({
  startDate,
  handleStartDate,
  handleEndDate,
  endDate,
  lst,
  title,
}) {
  return (
    <Card style={{ width: "90%", marginTop: "20px", padding: "20px" }}>
      <Card.Header as="h5" className="text-center">
        {title}
      </Card.Header>
      <Card.Body>
        <Row className="mb-3">
          <Col md={6}>
            <label htmlFor="startDate">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDate}
              placeholderText="Select Start Date"
              className="form-control"
            />
          </Col>
          <Col md={6}>
            <label htmlFor="endDate">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDate}
              placeholderText="Select End Date"
              className="form-control"
            />
          </Col>
        </Row>
        {lst && lst.length > 1 ? (
          <>
            <Card1 data={lst} />
          </>
        ) : (
          <div className="text-center">
            No Data Available
            {/* <Spinner animation="border" role="status"> */}
            {/* <span className="visually-hidden">Loading...</span> */}
            {/* </Spinner> */}
          </div>
        )}
      </Card.Body>
      <Card.Footer className="text-center"></Card.Footer>
    </Card>
  );
}

export default Card2;
