import React, { useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import shareIcon from '../images/shareIcon.svg';
import LinkCopiado from './LinkCopiado';

import '../styles/CardFeitas.css';

function CardFeitas({ objDetail, index }) {
  const { setCopied } = useContext(RecipeContext);
  const TWO_SECONDS = 2000;

  const gettingTags = () => {
    if (objDetail.type === 'comida') {
      return objDetail.tags.map((e, i) => {
        if (i < 2) {
          return (
            <span
              className="tags"
              key={ e }
              data-testid={ `${index}-${e}-horizontal-tag` }
            >
              {e}
            </span>
          );
        }
        return '';
      });
    }
    return '';
  };

  const handleCopied = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, TWO_SECONDS);
  };

  const render = () => (
    <div className="done-card-body">
      <div className="bg" />
      <Link to={ `/${objDetail.type}s/${objDetail.id}` }>
        <h1
          data-testid={ `${index}-horizontal-name` }
        >
          {objDetail.name}
        </h1>
      </Link>

      <div className="card-content">
        <Link to={ `/${objDetail.type}s/${objDetail.id}` }>
          <img
            src={ objDetail.image }
            alt={ objDetail.name }
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>

        <section>
          <h3
            data-testid={ `${index}-horizontal-top-text` }
          >

            <p className="text">
              {objDetail.area}
              {objDetail.area && ' - '}
              {objDetail.category}
            </p>
            <p className="text">
              {objDetail.alcoholicOrNot}
            </p>

          </h3>

          {gettingTags()}
          <CopyToClipboard
            text={ `http://localhost:3000/${objDetail.type}s/${objDetail.id}` }
            onCopy={ () => {
              handleCopied();
            } }
          >
            <input
              className="share-btn"
              type="image"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt={ objDetail.id }
            />
          </CopyToClipboard>
          <LinkCopiado />
          <p
            className="finish-date"
            data-testid={ `${index}-horizontal-done-date` }
          >
            {objDetail.doneDate}
          </p>
        </section>
      </div>
    </div>
  );

  return render();
}

export default CardFeitas;
