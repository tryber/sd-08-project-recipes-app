import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class IngredientList extends Component {
  render() {
    const { children, splitUrl, index } = this.props;
    return (
      <div>
        {splitUrl === undefined ? (
          <p data-testid={ `${index}-ingredient-name-and-measure` }>
            {children}
          </p>
        )
          : (
            <div data-testid={ `${index}-ingredient-step` }>
              <input type="checkbox" />
              {children}
            </div>
          )}
      </div>
    );
  }
}

IngredientList.propTypes = {
  children: PropTypes.node.isRequired,
  splitUrl: PropTypes.string,
  index: PropTypes.number,
};

IngredientList.defaultProps = {
  splitUrl: undefined,
  index: 0,
};
