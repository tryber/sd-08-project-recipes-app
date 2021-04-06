import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import './explorer.css';

const Explorer = ({ title, visible }) => (
  <Header title={ title } visible={ visible } />
);
Explorer.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Explorer;
