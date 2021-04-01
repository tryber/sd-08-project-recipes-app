import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class IngredientList extends Component {
  render() {
    const { ingredientList } = this.props;
    return (
      Object.keys(ingredientList).map((e, i) => (
        <ul key={ i }>
          <li data-testid={ `${i}-ingredient-name-and-measure` }>
            {`${ingredientList[e].item} - ${ingredientList[e].quantity}` }
          </li>
        </ul>
      ))
    );
  }
}

IngredientList.propTypes = {
  ingredientList: PropTypes.shape({
    item: PropTypes.string,
    quantity: PropTypes.string,
  }).isRequired,
};
