import React, { useContext } from 'react';
import Copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';
import '../styles/RecipeCardsDone.css';

function RecipeCardsDone() {
  const history = useHistory();
  const {
    copied,
    setCopied,
    cardId,
    setCardId,
    done,
  } = useContext(MyContext);

  const LIMIT = 2;

  function redirectToDetails(id) {
    console.log(id);
    history.push(`/${id}`);
  }

  return (
    done.map((card, index) => (
      <div
        key={ card.id }
        onClick={ () => {
          redirectToDetails(`${card.type}s/${card.id}`);
        } }
        onKeyPress={ () => console.log('clicou') }
        role="button"
        tabIndex={ card.index }
        className="cardsDone"
      >
        <div className="cardsDoneImg">
          <img
            src={ card.image }
            alt={ card.name }
            data-testid={ `${index}-horizontal-image` }
          />
        </div>
        <div className="testes">
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
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {(card.type === 'comida'
              ? `${card.area} - ${card.category}`
              : card.alcoholicOrNot)}
          </p>
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            {card.name}
          </p>
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            {`Feita em: ${card.doneDate}`}
          </p>
          <div>
            {card.tags.map((tag, indexTag) => {
              if (indexTag < LIMIT) {
                return (
                  <span
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    className="tags"
                    key={ indexTag }
                  >
                    {tag}
                  </span>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    ))
  );
}

export default RecipeCardsDone;
