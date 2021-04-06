import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import './recipesFavDone.css';

const RecipesFavDone = ({ title, visible }) => (
  <Header title={ title } visible={ visible } />
);

RecipesFavDone.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};
export default RecipesFavDone;
