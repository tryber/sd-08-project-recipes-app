import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import './explorerByArea.css';

const ExplorerByArea = ({ title }) => <Header title={ title } />;
ExplorerByArea.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ExplorerByArea;
