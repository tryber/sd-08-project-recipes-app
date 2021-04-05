import React, { useEffect, useState } from 'react';

import './InProgressCard.css';
import PropTypes from 'prop-types';
//  comentario
const InProgressCard = (props) => {
  const { url,
    id, category, title, img, ingredients, alcohol, instructions } = props;
  const [isDrinkOrFood, setIsDrinkOrFood] = useState('');
  const [inProgress, setInProgress] = useState([]);

  useEffect(() => {
    localStorage
      .setItem('inProgressRecipes', JSON.stringify({
        cocktails: {}, meals: { [id]: [{ idx: 0, name: 'ingrediente', checked: false }] },
      }));
  }, []);

  useEffect(() => {
    const progressStatus = localStorage.getItem('inProgressRecipes');
    const progressList = progressStatus ? JSON.parse(progressStatus) : [];
    console.log('progress list: ', progressList);
    setInProgress(progressList);
  }, []);

  function setLocalStorage() {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }

  useEffect(() => {
    setLocalStorage();
  }, [inProgress]);

  const onChangeCB = ({ target }, index) => {
    const novoEstado = {
      ...inProgress,
      meals: {
        ...inProgress.meals,
        [id]: [
          ...inProgress.meals[id],
        ],

      },
    };
    if (novoEstado.meals[id][index]) {
      const Teste = inProgress.meals[id][index].checked;
      novoEstado.meals[id][index].checked = !Teste;
    } else {
      novoEstado.meals[id][index] = { idx: index, name: target.name, checked: true };
    }
    setInProgress(novoEstado);
    // console.log('teste: ', Teste);
    // inProgress.meals[id][index].checked = !Teste;
    // console.log('inProgress mudado:', inProgress);
  };

  //   localStorage.setItem('recipeProgressStatus', JSON.stringify(inProgress));
  //   };

  //   const theIndex = forMap.findIndex((position) => position.name === target.name);
  //   const inserting = { name: target.name, checked: target.checked };
  //   const theMap = forMap.filter(((filtered) => filtered.name !== target.name));

  //   reInsertAtCorrectPos(theMap, theIndex, inserting);

  //   // const newMap = [...oldMap, { name: target.name, checked: target.checked }];
  //   // forMap.map((element) => (element.name === target.name ? element.checked = target.checked : element));

  //   console.log(theMap);
  //   localStorage.setItem('test', JSON.stringify(theMap));
  //   // localStorage.setItem(JSON.stringify(fromLocalStorage));
  // };

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
          onChange={ (e) => onChangeCB(e, index) }
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
