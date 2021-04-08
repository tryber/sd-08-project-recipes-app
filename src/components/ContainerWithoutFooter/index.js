import React from 'react';
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Header from '../Header';

function DefaultContainer({ title, children }) {
  return (
    <Container fluid>
      <Row className="mb-5">
        <Header title={ title } />
      </Row>
      <Container className="d-flex flex-column main-content" fluid>
        { children }
      </Container>
    </Container>
  );
}

DefaultContainer.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DefaultContainer;
