import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Footer from '../Footer';
import Header from '../Header';
import './styles.css';

function ContainerDefault({ title, children }) {
  return (
    <Container className="template px-0" fluid>
      <Header title={ title } />
      <Container className="d-flex flex-column main-content" fluid>
        { children }
      </Container>
      <Footer />

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
