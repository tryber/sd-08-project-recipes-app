import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import './checkBoxIngredient.css';

const CheckBoxIngredients = ({ object, title }) => {
  const [inProgressRecipes, setProgressRecipes] = useState({
    cocktails: {},
    meals: {},
  });

  const objectSaved = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (!objectSaved) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }

  const [isClicked, setClicked] = useState(false);

  const mealId = object.idMeal;
  const drinkId = object.idDrink;

  const updateInProgressRecipes = (id, recipe) => {
    // const objectSaved = JSON.parse(localStorage.getItem("inProgressRecipes"))
    const idsRecipeList = objectSaved && Object.keys(objectSaved[recipe]);
    const existSpecificId = idsRecipeList && idsRecipeList.some((specificId) => specificId === id);
    console.log(objectSaved, existSpecificId, 'Antes de entrar nas condições');

    if (objectSaved === null || !existSpecificId) {
      console.log('Entra na primeira condição');
      setProgressRecipes({
        ...inProgressRecipes,
        ...objectSaved,
        [recipe]: {
          ...inProgressRecipes[recipe], ...objectSaved[recipe], [id]: [],
        },
      });
      // localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes))
    } else {
      console.log('entra na segunda condição');
      console.log(inProgressRecipes, objectSaved);
      setProgressRecipes(objectSaved);
      // localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes))
    }
  };

  const saveOnLocalStorage = (id, recipe) => {
    const idsRecipeList = inProgressRecipes && Object.keys(inProgressRecipes[recipe]);
    const existSpecificId = idsRecipeList && idsRecipeList.some((specificId) => specificId === id);

    if (existSpecificId) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
  };

  useEffect(() => {
    (title === 'Comidas') ? saveOnLocalStorage(mealId, 'meals') : saveOnLocalStorage(drinkId, 'cocktails');
  }, [isClicked]);

  useEffect(() => {
    if (mealId || drinkId) {
      setClicked(!isClicked);
      (title === 'Comidas') ? updateInProgressRecipes(mealId, 'meals') : updateInProgressRecipes(drinkId, 'cocktails');
    }
    // return () => saveOnLocalStorage
  }, []);

  const addIngredient = (event, id, recipe) => {
    setProgressRecipes({
      ...inProgressRecipes,
      [recipe]: {
        ...inProgressRecipes[recipe],
        [id]: [...inProgressRecipes[recipe][id], object[event.target.name]],
      },
    });
  };

  const removeIngredient = (event, id, recipe) => {
    const filteredIngredients = inProgressRecipes[recipe][id].filter(
      (ingredient) => ingredient !== object[event.target.name],
    );
    setProgressRecipes({
      ...inProgressRecipes,
      [recipe]: {
        ...inProgressRecipes[recipe],
        [id]: [...filteredIngredients],
      },
    });
  };

  const adOrRemoveIngredient = (event, id, recipe) => {
    if (!event.target.checked) {
      removeIngredient(event, id, recipe);
    } else {
      addIngredient(event, id, recipe);
    }
  };

  // adicionando ingredientes no array da respectiva Key id
  const handleClick = (event) => {
    setClicked(!isClicked);
    if (title === 'Comidas') {
      adOrRemoveIngredient(event, mealId, 'meals');
    } else {
      adOrRemoveIngredient(event, drinkId, 'cocktails');
    }
  };

  const isChecked = (ingredient, id, recipe) => {
    const idsRecipeList = inProgressRecipes && Object.keys(inProgressRecipes[recipe]);
    const existSpecificId = idsRecipeList && idsRecipeList.some((specificId) => specificId === id);

    const specificIingredient = object[ingredient];

    if (existSpecificId) {
      const ingredientList = inProgressRecipes[recipe][id];
      return ingredientList.some((el) => el === specificIingredient);
    }
  };

  const renderIngredientList = () => {
    const listKeys = Object.keys(object);
    const ingredients = listKeys.filter((key) => key.includes('strIngredient'));

    const listKeysMeasure = Object.keys(object);
    const measures = listKeysMeasure.filter((key) => key.includes('strMeasure'));

    return ingredients.map((ingredient, index) => {
      if (object[ingredient]) {
        return (
          <div
            key={ingredient}
            className="mb-3"
            data-testid={`${index}-ingredient-step`}
          >
            <input
              className="checkClass"
              type="checkbox"
              name={ingredient}
              id={ingredient}
              onClick={handleClick}
              // ref={ createRef }
              checked={(title === 'Comidas') ? isChecked(ingredient, mealId, 'meals') : isChecked(ingredient, drinkId, 'cocktails')}
            />
            <label
              htmlFor={ingredient}
              className="strikethrough"
            >
              {`${object[ingredient]} - ${object[measures[index]]}`}
            </label>
          </div>
        );
      }
    });
  };

  return (
    <Form className="mb-3">
      Ingredientes:
      {renderIngredientList()}
    </Form>
  );
};

CheckBoxIngredients.propTypes = {
  title: PropTypes.string.isRequired,
  object: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
};

export default CheckBoxIngredients;
