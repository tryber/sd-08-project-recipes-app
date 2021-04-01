import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const ExplorerByIngridients = ({ title, visible }) => (
  <>
    <Header title={ title } visible={ visible } />
    <Footer />
  </>
);

ExplorerByIngridients.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default ExplorerByIngridients;
