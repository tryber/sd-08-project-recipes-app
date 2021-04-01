import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Explorer = ({ title, visible }) => (
  <>
    <Header title={ title } visible={ visible } />
    <Footer />
  </>
);
Explorer.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Explorer;
