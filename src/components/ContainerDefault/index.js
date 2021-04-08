import React from 'react';
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Footer from '../Footer';
import Header from '../Header';
import './styles.css';

function ContainerDefault({ title, children }) {
  return (
    <Container className="template" fluid>
      <Row className="mb-5">
        <Header title={ title } />
      </Row>
      <Container className="d-flex flex-column main-content" fluid>
        { children }
      </Container>
      <Row>
        <Footer />
      </Row>
    </Container>
  );
}

ContainerDefault.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ContainerDefault;
