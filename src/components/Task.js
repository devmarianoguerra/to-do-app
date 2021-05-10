import { useState } from "react";
import PropTypes from "prop-types";
import Checkmark from "./Checkmark";
import styled from "styled-components";
import { Button, Modal } from "react-bootstrap";
import { BsPencil, BsChevronDown } from "react-icons/bs";
import { Link } from "react-router-dom";

const TaskWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 1em;
  border: 1px solid #000;
  border-radius: 5px;
  min-width: 330px;
  margin: 2px 0px;
`;

const BtnContainer = styled.div`
  margin: 0 1em;
`;

const EditIcon = styled(BsPencil)`
  margin-right: 10px;
`;

const TaskTitle = styled.p`
  text-decoration: ${(props) => (props.done ? "line-through" : "none")};
  margin: 0px;
`;

const ModalInput = styled.input`
  width: 100%;
  border-radius: 5px;
`;

const ModalHeaderInfo = styled.p`
  margin: 0px;
`;

const DetailsBtn = styled(BsChevronDown)`
  color: #000;
  margin-right: 10px;
`;

export default function Task(props) {
  const { title, id, check } = props;

  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  const handleClick = () => {
    //console.log("ID: ", id);
    props.delete(id);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleChange = (e) => {
    let input = e.target.value;
    setValue(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.editTask(id, value);
    setValue(" ");
    setShow(false);
  };

  return (
    <>
      <TaskWrapper>
        <TaskTitle done={check}>{title}</TaskTitle>
        <BtnContainer>
          <Link to={`/description/${id}`}>
            <DetailsBtn />
          </Link>
          <Checkmark
            check={check}
            toggleCheck={props.toggleCheck}
            id={id}
            title={title}
          />
          <EditIcon onClick={handleShow} />
          <Button variant="danger" onClick={handleClick}>
            X
          </Button>
        </BtnContainer>
      </TaskWrapper>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <ModalHeaderInfo>{`You are editing: `}</ModalHeaderInfo>
            <ModalHeaderInfo>{`Task number ${id}`}</ModalHeaderInfo>
            <ModalHeaderInfo>{`Title: ${title}`}</ModalHeaderInfo>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            <label htmlFor="">Title: </label>
            <ModalInput type="text" onChange={handleChange} value={value} />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

Task.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
  check: PropTypes.bool,
  editTask: PropTypes.func.isRequired,
  toggleCheck: PropTypes.func.isRequired,
};
