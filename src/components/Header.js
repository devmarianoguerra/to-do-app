import PropTypes from "prop-types";

import styled from "styled-components";

const CustomHeader = styled.div`
  text-align: center;
`;

export default function Header(props) {
  const { counter } = props;
  return (
    <>
      <CustomHeader>
        <h1>{`${counter} task on your list: `}</h1>
      </CustomHeader>
    </>
  );
}

Header.defaultProps = {
  counter: 0,
};

Header.propTypes = {
  counter: PropTypes.number,
};
