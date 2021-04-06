import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import './home.css';

const Home = ({ title }) => <Header title={ title } />;
Home.propTypes = { title: PropTypes.string.isRequired };

export default Home;
