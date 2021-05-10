import PropTypes from "prop-types";
import { BsCheck, BsSquare } from "react-icons/bs";
import styled from "styled-components";

const Check = styled(BsCheck)`
  margin-right: 10px;
`;

const Square = styled(BsSquare)`
  margin-right: 10px;
`;

export default function Checkmark(props) {
  const { check, id, title } = props;

  const handleClick = () => {
    props.toggleCheck(id, title, check);
  };
  return (
    <>
      <span onClick={handleClick}>{check ? <Check /> : <Square />}</span>
    </>
  );
}

Checkmark.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
  check: PropTypes.bool,
  toggleCheck: PropTypes.func.isRequired,
};
