import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';

export default class RenderButton extends Component {
  doneRecipesBtn() {
    const { recipe, type } = this.props;
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    let tags = '';
    if (recipe.strTags) {
      tags = recipe.strTags.split(',').filter((_, index) => index < 2);
    }
    console.log(tags);
    const obj = {
      id: recipe[`id${type}`],
      type: (type === 'Meal' ? 'comida' : 'bebida'),
      area: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[`str${type}`],
      image: recipe[`str${type}Thumb`],
      doneDate: Date(),
      tags,
    };
    if (doneRecipes) {
      const checkDone = doneRecipes.find((item) => item.id === recipe[`id${type}`]);
      if (checkDone) return;
      return localStorage.setItem('doneRecipes', JSON.stringify(
        [...doneRecipes,
          obj,
        ],
      ));
    }
    return localStorage.setItem('doneRecipes', JSON.stringify([obj]));
  }

  render() {
    const { checkPage, startRecipe, handleProgress,
      checkRecipeProgress, type, id, history } = this.props;
    return (
      <>
        {!checkPage && (
          <Button
            className="start-recipe-btn"
            data-testid="start-recipe-btn"
            variant="success"
            block
            onClick={ () => {
              startRecipe(type, id);
              handleProgress(type, id);
            } }
          >
            {checkRecipeProgress(type, id)}
          </Button>
        )}

        {checkPage && (
          <Button
            className="start-recipe-btn"
            block
            data-testid="finish-recipe-btn"
            onClick={ () => {
              history.push('/receitas-feitas');
              this.doneRecipesBtn();
            } }
          >
            Finalizar receita
          </Button>
        )}
      </>
    );
  }
}

RenderButton.propTypes = {
  checkPage: PropTypes.string,
  startRecipe: PropTypes.func.isRequired,
  handleProgress: PropTypes.func.isRequired,
  checkRecipeProgress: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  recipe: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};

RenderButton.defaultProps = {
  checkPage: undefined,
  history: undefined,
};
