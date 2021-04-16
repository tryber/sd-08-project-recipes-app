import React from 'react';
import PropTypes from 'prop-types';
import CardCarousel from './CardCarousel';
import '../styles/cardCarousel.css';

const RecommendedRecipeDetails = ({ recommendedRecipes, page }) => {
  const showCards = () => {
    if (page === 'Comidas') {
      return recommendedRecipes.map((recommended, index) => (
        <CardCarousel
          id={ recommended.idDrink }
          imagePath={ recommended.strDrinkThumb }
          title={ recommended.strDrink }
          category={ recommended.strAlcoholic }
          index={ index }
          key={ index }
        />
      ));
    }
    if (page === 'Bebidas') {
      return recommendedRecipes.map((recommended, index) => (
        <CardCarousel
          id={ recommended.idMeal }
          imagePath={ recommended.strMealThumb }
          title={ recommended.strMeal }
          category={ recommended.strCategory }
          index={ index }
          key={ index }
        />
      ));
    }
  };
  return (
    <section className="recommended-recipe-details">
      <h3>Recomendados</h3>
      <div className="div-carousel">{showCards()}</div>
    </section>
  );
};

RecommendedRecipeDetails.propTypes = {
  recommendedRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.string.isRequired,
};

export default RecommendedRecipeDetails;
