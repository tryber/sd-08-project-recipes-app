import React, { useContext } from 'react';
import Copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/FavoriteRecipeCards.css';

function FavoriteRecipeCards() {
  const history = useHistory();
  const {
    favorite,
    copied,
    setCopied,
    cardId,
    setCardId,
    recipeFavorite,
    setRecipeFavorite,
  } = useContext(MyContext);

  function redirectToDetails(id) {
    console.log(id);
    history.push(`/${id}`);
  }

  function removeFavorite({ target }) {
    setRecipeFavorite(recipeFavorite.filter((recipe) => recipe.id !== target.id));
    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newfavoriteStorage = favoriteStorage
      .filter((recipe) => recipe.id !== target.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newfavoriteStorage));
  }

  return (
    recipeFavorite.map((card, index) => (
      <div key={ card.id }>
        <div
          onClick={ () => {
            redirectToDetails(`${card.type}s/${card.id}`);
          } }
          onKeyPress={ () => console.log('clicou') }
          role="button"
          tabIndex={ card.index }
          className="cardsDone"
        >
          <img
            src={ card.image }
            alt={ card.name }
            data-testid={ `${index}-horizontal-image` }
          />
        </div>
        <div className="testes">
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {(card.type === 'comida'
              ? `${card.area} - ${card.category}`
              : card.alcoholicOrNot)}
          </p>
          <div
            onClick={ () => {
              redirectToDetails(`${card.type}s/${card.id}`);
            } }
            onKeyPress={ () => console.log('clicou') }
            role="button"
            tabIndex={ card.index }
            className="cardsDone"
          >
            <p
              data-testid={ `${index}-horizontal-name` }
            >
              {card.name}
            </p>
          </div>
          <div>
            <button
              className="btn"
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => {
                Copy(`http://localhost:3000/${card.type}s/${card.id}`);
                setCopied(true);
                setCardId(card.id);
              } }
              src={ shareIcon }
            >
              {copied && cardId === card.id && 'Link copiado!'}
              <span />
            </button>
            <button
              id={ card.id }
              className="btn-favorite"
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ removeFavorite }
              src={ blackHeartIcon }
            >
              {favorite && cardId === card.id}
              <span />
            </button>
          </div>
        </div>
      </div>
    ))
  );
}

export default FavoriteRecipeCards;
