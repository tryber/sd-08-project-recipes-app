import React, { useEffect, useState } from 'react';

import './InProgressCard.css';
import PropTypes from 'prop-types';

const InProgressCard = (props) => {
  const { url,
    id, category, title, img, ingredients, alcohol, instructions } = props;
  const [isDrinkOrFood, setIsDrinkOrFood] = useState('');
  const [forMap, setForMap] = useState([]);

  useEffect(() => {
    setForMap(ingredients.filter((noTwoSpace) => noTwoSpace !== '  ')
      .map((element) => ({ name: element, checked: false })));
  }, [ingredients]);

  const consoleFunction1 = () => {
    // console.log(forMap);
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(favorites);
  };

  const consoleFunction2 = () => console.log(ingredients, forMap);

  const theButton1 = <button type="button" onClick={ consoleFunction1 }>BOTÃO1</button>;
  const theButton2 = <button type="button" onClick={ consoleFunction2 }>BOTÃO2</button>;
  const onChangeCB = ({ target }) => {
    const reInsertAtCorrectPos = (array, position, ...elementToInsert) => {
      array.splice(position, 0, ...elementToInsert);
    };

    const theIndex = forMap.findIndex((position) => position.name === target.name);
    const inserting = { name: target.name, checked: target.checked };
    const theMap = forMap.filter(((filtered) => filtered.name !== target.name));

    reInsertAtCorrectPos(theMap, theIndex, inserting);

    // const newMap = [...oldMap, { name: target.name, checked: target.checked }];
    // forMap.map((element) => (element.name === target.name ? element.checked = target.checked : element));

    console.log(theMap);
    localStorage.setItem('test', JSON.stringify(theMap));
    // localStorage.setItem(JSON.stringify(fromLocalStorage));
  };

  useEffect(() => {
    if (url.includes('bebidas')) {
      setIsDrinkOrFood('Drink');
    } else { setIsDrinkOrFood('Food'); }
  }, [url]);

  const ingredientsMapping = ingredients.filter((element) => element !== '  ')
    .map((ingredient, index) => (
      <li key={ `${index}-${ingredient}` } data-testid="ingredient-step">
        <input
          id={ `id-${index}` }
          name={ ingredient }
          type="checkbox"
          value={ ingredient }
          onChange={ onChangeCB }
        />
        <label htmlFor={ `id-${index}` }>
          {ingredient}
        </label>
      </li>
    ));
    //  forMap.map((ingredient, index) => (
    //    (
    //      <li key={ `${index}-${ingredient.name}` } data-testid="ingredient-step">
    //        <input
    //          id={ `id-${index}` }
    //          name={ ingredient.name }
    //          type="checkbox"
    //          value={ ingredient.name }
    //          onChange={ onChangeCB }
    //          checked={ ingredient.checked }
    //        />
    //        <label htmlFor={ `id-${index}` }>
    //          {ingredient.name}
    //        </label>
    //      </li>
    //    )));

  const instructionsMapping = instructions.split(/,|\. | ;/g).map((string, index) => {
    if (instructions.split(/,|\. | ;/g).length !== index + 1) {
      return (
        <li key={ `instruction-${index}` }>
          {`${string.trim().charAt(0).toUpperCase()}${string.trim().slice(1)}`}
          {' '}
          ;
        </li>);
    }
    return (
      <li key={ `instruction-${index}` }>
        {`${string.trim().charAt(0).toUpperCase()}${string.trim().slice(1)}`}
        {' '}
      </li>);
  });

  const renderFood = () => (
    <div
      name={ id }
      className="card-container"
      data-testid="recipe-card"
      role="button"
    >
      <h4 data-testid="recipe-title">{title}</h4>
      <span data-testid="recipe-category">{`Category => ${category}`}</span>
      <img src={ img } alt={ title } data-testid="recipe-photo" />
      <ul className="unordered-list">
        {ingredientsMapping}
      </ul>
      <ol
        style={ { display: 'flex',
          flexFlow: 'column wrap',
          textAlign: 'center',
          listStylePosition: 'inside' } }
        data-testid="instructions"
      >
        {instructionsMapping}
        Voilá!
      </ol>

    </div>);

  const renderDrink = () => (
    <div
      name={ id }
      className="card-container"
      data-testid="recipe-card"
      role="button"
    >
      <h4 data-testid="recipe-title">{title}</h4>
      <span data-testid="recipe-category">{`Category => ${category}`}</span>
      <span>{alcohol}</span>
      <img src={ img } alt={ title } data-testid="recipe-photo" />
      <ul>
        {ingredientsMapping}
      </ul>
      <ol
        style={
          { display: 'flex',
            flexFlow: 'column wrap',
            textAlign: 'center',
            listStylePosition: 'inside' }
        }
        data-testid="instructions"
      >
        {instructionsMapping}
        Voilá!
      </ol>
    </div>);

  return (
    <main>
      {theButton1}
      {theButton2}
      {isDrinkOrFood === 'Drink' ? renderDrink() : renderFood()}

    </main>
  );
};

InProgressCard.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  alcohol: PropTypes.string,
  instructions: PropTypes.string.isRequired,
};

InProgressCard.defaultProps = {
  alcohol: PropTypes.string,
};

export default InProgressCard;
