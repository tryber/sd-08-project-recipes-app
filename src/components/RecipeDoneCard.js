import React, { Component } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

class RecipeDoneCard extends Component {
  copyLink(id, type) {
    if (type === 'bebida') {
      copy(`http://localhost:3000/bebidas/${id}`);
      document.getElementById('link').style = 'inline';
    } else {
      copy(`http://localhost:3000/comidas/${id}`);
      document.getElementById('link').style = 'inline';
    }
  }

  render() {
    const { doneRecipes: {
      id,
      type,
      area,
      category,
      alcoholicOrNot,
      name,
      image,
      doneDate,
      tags,
    }, index } = this.props;

    return (
      <div
        data-testid={ `${index}-recipe-card` }
        className="
        container
        container-recipes-done
        widthM350
        d-flex
        flex-wrap
        my-2
        white70
        justify-content-center
        p-2"
      >
        {type === 'bebida' ? (
          <div className="container-fluid my-2">
            <Link to={ `/bebidas/${id}` }>
              <img
                style={ { width: '100px' } }
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt={ name }
                className="img-fluid img-done"
              />
            </Link>
            <button
              type="button"
              onClick={ () => this.copyLink(id, type) }
              className="btn share-done"
            >
              <img
                src={ shareIcon }
                data-testid={ `${index}-horizontal-share-btn` }
                alt="Compartilhar receita"
                className="share-icon icon"
              />
            </button>
            <p
              id="link"
              style={ { display: 'none' } }
              className="msg-copy-done"
            >
              Link copiado!
            </p>
          </div>
        ) : (
          <div className="container-fluid my-2">
            <Link to={ `/comidas/${id}` }>
              <img
                style={ { width: '100px' } }
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt={ name }
                className="img-fluid img-done"
              />
            </Link>
            <button
              type="button"
              onClick={ () => this.copyLink(id, type) }
              className="btn share-done"
            >
              <img
                src={ shareIcon }
                data-testid={ `${index}-horizontal-share-btn` }
                alt="Compartilhar receita"
                className="share-icon icon"
              />
            </button>
            <p
              id="link"
              style={ { display: 'none' } }
              className="msg-copy-done"
            >
              Link copiado!
            </p>
          </div>
        )}
        {type === 'bebida' ? (
          <Link
            to={ `/bebidas/${id}` }
            data-testid={ `${index}-horizontal-name` }
            className="font-mountains txt-shdw1 h4 my-1 title-done"
          >
            { name }
          </Link>
        ) : (
          <Link
            to={ `/comidas/${id}` }
            data-testid={ `${index}-horizontal-name` }
            className="font-mountains txt-shdw1 h4 my-1 title-done"
          >
            { name }
          </Link>
        )}
        {type === 'bebida' ? (
          <p
            data-testid={ `${index}-horizontal-top-text` }
            className="txt-shdw1"
          >
            { alcoholicOrNot }
          </p>
        ) : (
          <p
            data-testid={ `${index}-horizontal-top-text` }
            className="txt-shdw1"
          >
            {`${area} - ${category}`}
          </p>
        ) }
        <p
          data-testid={ `${index}-horizontal-done-date` }
          className="msg-done"
        >
          Feito em:
          { doneDate }
        </p>
        {tags.map((tag) => (
          <p
            key={ index + tag }
            data-testid={ `${index}-${tag}-horizontal-tag` }
            className="tag-done btn btn-warning"
          >
            {tag}
          </p>
        ))}
      </div>
    );
  }
}

RecipeDoneCard.propTypes = {
  doneRecipes: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeDoneCard;
