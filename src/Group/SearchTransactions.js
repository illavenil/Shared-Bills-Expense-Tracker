import { Button, Form, Row } from "react-bootstrap";
import { useMediaQuery } from 'react-responsive';
import { getAPICall } from "../api/apiService";
import { useParams } from "react-router-dom";
const SearchTransactions = ({ sendFilterTransaction }) => {
  const { id } = useParams();
  const isDesktop = useMediaQuery({ minWidth: 768 }); 
  const onChangeSearch = (event) => {
    let filterText = event.target.value;

    const fetchData = async () => {
      const response2 = await getAPICall(`/transactions1/${id}`);
      if (
        response2.message !== "Try Later" &&
        response2.message !== "transactionID is empty"
      ) {
        const filteredItems = response2.filter(
          (item) =>
            item.transactionName &&
            item.transactionName
              .toLowerCase()
              .includes(filterText.toLowerCase()),
        );
        sendFilterTransaction(filteredItems);
      }
    };
    fetchData();
  };
  return (
    <div>
      <Row>
        <Form>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 3fr",
              columnGap: "20px",
            }}
          >
            <Form.Control
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ width: isDesktop ? "650px" : "250px", height: "40px" }}
              name="search_text"
              onChange={onChangeSearch}
            />
            <Button> {"Search"} </Button>
          </div>
        </Form>
      </Row>
    </div>
  );
};

SearchTransactions.displayName = "SearchTransactions";

export default SearchTransactions;
