import React from 'react';
import PropTypes from 'prop-types';

class RecipeCard extends React.Component {
  render() {
    const { idRecipeCard, idImg, srcImg, idCardName, mealName } = this.props;

    return (
      <div data-testid={ idRecipeCard } className="card">
        <center>
          <img
            data-testid={ idImg }
            src={ srcImg }
            alt="recipe pic"
            className="linkImage"
          />
          <p data-testid={ idCardName }>{mealName}</p>
        </center>
      </div>
    );
  }
}

RecipeCard.propTypes = {
  idRecipeCard: PropTypes.string.isRequired,
  idImg: PropTypes.string.isRequired,
  srcImg: PropTypes.string.isRequired,
  idCardName: PropTypes.string.isRequired,
  mealName: PropTypes.string.isRequired,
};

export default RecipeCard;
