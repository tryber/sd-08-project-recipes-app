import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const ExplorerByArea = ({ title }) => (
  <>
    <Header title={ title } />
    <Footer />
  </>);
ExplorerByArea.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ExplorerByArea;
