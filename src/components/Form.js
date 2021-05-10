import { useState } from "react";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import styled from "styled-components";

const CustomForm = styled.form`
  margin-top: 20px;
`;

const SubmitBtn = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #2de115;
  margin-top: 20px;
  padding: 0.5em 1em;

  &:hover {
    background-color: #27bc10;
  }
`;

export default function Form(props) {
  const { addTask } = props;
  const [value, setValue] = useState({});

  const handleChange = (e) => {
    //console.log("INPUT: ", e.target.value);
    //console.log({ [e.target.name]: e.target.value });
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(value);
    setValue({ title: "", description: "" });
  };

  //console.log("VALUE: ", value);

  return (
    <>
      <Container>
        <CustomForm onSubmit={handleSubmit}>
          <label htmlFor="">Title: </label>
          <div>
            <input
              type="text"
              placeholder="Write a task"
              onChange={handleChange}
              value={value.title}
              name="title"
            />
          </div>
          <label htmlFor="">Description: </label>
          <div>
            <input
              type="text"
              placeholder="Write a description"
              onChange={handleChange}
              value={value.description}
              name="description"
            />
          </div>
          <div>
            <SubmitBtn>Add</SubmitBtn>
          </div>
        </CustomForm>
      </Container>
    </>
  );
}

Form.propTypes = {
  addTask: PropTypes.func.isRequired,
};
