import { withRouter } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Description(props) {
  const id = props.match.params.id;
  //console.log("DESC ID:", id);
  const { tasks } = props;
  //console.log("DESC TASKS: ", tasks);

  return (
    <>
      <Container>
        <Card style={{ marginTop: "2em" }}>
          <Card.Body>
            <Card.Title>{tasks[id - 1].title}</Card.Title>
            <Card.Text>{tasks[id - 1].description}</Card.Text>
            <Link to="/">
              <Button variant="primary">Back to Task List</Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default withRouter(Description);
