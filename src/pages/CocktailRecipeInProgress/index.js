import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MAX_INGREDIENTS_NUMBER, UNITARY_INCREMENT } from '../../common/defs';
import Category from '../../components/InProgressComponents/Category';
import Hero from '../../components/InProgressComponents/Hero';
import IngredientsList from '../../components/InProgressComponents/IngredientsList';
import Instructions from '../../components/InProgressComponents/Instructions';
import Title from '../../components/InProgressComponents/Title';
import RecipesContext from '../../context/RecipesContext';
import ShareButtonDrink from '../../components/ShareButtonDrink';
import FavoriteButton from '../../components/FavoriteButton';

export default function DrinkRecipeInProgress({ match }) {
  const { isFinished } = useContext(RecipesContext);
  const [ingredients, setIngredients] = useState([]);
  const [drink, setDrink] = useState(
    {
      strDrink: 'Title',
      strDrinkThumb: 'Image',
      strCategory: 'Category',
      strInstructions: 'Recipe',
      ingredients: [{ ingredient: 'ingredient' }],
      id: 'id',
    },
  );
  const [drinksState, setDrinkState] = useState({
    drink: [],
    favorite: false,
  });

  const { strDrink, strDrinkThumb, strCategory, strInstructions } = drink;
  const { id } = match.params;

  useEffect(() => {
    async function getDrinkById(value) {
      const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${value}`);
      const response = await data.json();
      setDrink(response.drinks[0]);
    }
    getDrinkById(id);
  }, [id]);

  useEffect(() => {
    if (drink !== undefined) {
      const arrayOfIngredients = [];
      for (let index = 1; index <= MAX_INGREDIENTS_NUMBER; index += UNITARY_INCREMENT) {
        if (drink[`strIngredient${index}`] !== null
          && drink[`strIngredient${index}`] !== undefined
          && drink[`strIngredient${index}`] !== '') {
          const ingredientObject = {
            ingredient: drink[`strIngredient${index}`],
            measure: drink[`strMeasure${index}`],
          };
          arrayOfIngredients.push(ingredientObject);
        }
      }
      setIngredients(arrayOfIngredients);
    }
  }, [drink]);

  return (
    <section>
      <Hero src={ strDrinkThumb } name={ strDrink } />
      <Title name={ strDrink } />
      <ShareButtonDrink drink={ drink } />
      <FavoriteButton
        beforeState={ drinksState }
        setFavorite={ setDrinkState }
        recipe={ drink }
        type="bebida"
      />
      <Category category={ strCategory } />
      <IngredientsList listFromProps={ ingredients } id={ id } type="cocktails" />
      <Instructions instructions={ strInstructions } />
      {isFinished ? (
        <Link
          to="/receitas-feitas"
          data-testid="finish-recipe-btn"
          enable
        >
          Finalizar Receita
        </Link>
      )
        : (
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled
          >
            Finalizar Receita
          </button>
        )}
    </section>
  );
}

DrinkRecipeInProgress.propTypes = ({
  match: PropTypes.shape(
    {
      params: PropTypes.shape(
        {
          id: PropTypes.string,
        },
      ).isRequired,
    },
  ).isRequired,
});
