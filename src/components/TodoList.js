import PropTypes from "prop-types";
import Task from "./Task";
import styled from "styled-components";
import { Container } from "react-bootstrap";

const TaskWrapper = styled.div`
  max-height: 200px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function TodoList(props) {
  const { tasks } = props;
  //console.log("TASK: ", tasks);
  return (
    <>
      <Container>
        <TaskWrapper>
          {tasks.map((element) => (
            <Task
              key={element.id}
              id={element.id}
              title={element.title}
              check={element.check}
              delete={props.delete}
              toggleCheck={props.toggleCheck}
              editTask={props.editTask}
            />
          ))}
        </TaskWrapper>
      </Container>
    </>
  );
}

TodoList.defaultProps = {
  tasks: [],
};

TodoList.propTypes = {
  tasks: PropTypes.array,
  delete: PropTypes.func.isRequired,
  toggleCheck: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
};
