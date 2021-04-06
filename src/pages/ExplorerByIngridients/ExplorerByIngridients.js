import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import './explorerByIngridients.css';

const ExplorerByIngridients = ({ title, visible }) => (
  <Header title={ title } visible={ visible } />
);

ExplorerByIngridients.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default ExplorerByIngridients;
