import React, { useContext, useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/Ingredientes.css';

const DetailsFavoriteRecipes = () => {
  const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [copyURL, setCopyURL] = useState(null);
  const { comidas, bebidas, setComidas, setBebidas } = useContext(Context);

  useEffect(() => {
    if (favorite) {
      setComidas(favorite.filter((item) => item.type === 'comida'));
      setBebidas(favorite.filter((item) => item.type === 'bebida'));
    }
  }, []);

  const shareBtn = (type, id) => {
    copy(window.location.href
      .replace('receitas-favoritas', '')
      .concat(`${type}/${id}`));
    setCopyURL(true);
  };

  const removeFavorite = (id) => {
    const filtered = favorite.filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
    document.location.reload();
  };

  return (
    <>
      <div id="receitasFavoritasComidas">
        {
          comidas.map((recipe, index) => (
            <div className="comidasFavoritas" key={ index }>
              <Link to={ `${recipe.type}s/${recipe.id}` }>
                <img
                  className="ingredient-img"
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <Link to={ `${recipe.type}s/${recipe.id}` }>
                <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${recipe.area} - ${recipe.category}` }
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>12/12/21</p>
              <input
                type="image"
                alt="Share image"
                data-testid={ `${index}-horizontal-share-btn` }
                className="share-btn"
                src={ shareIcon }
                onClick={ () => shareBtn('comidas', recipe.id) }
              />
              <input
                type="image"
                alt="Favorite Recipe"
                data-testid={ `${index}-horizontal-favorite-btn` }
                className="favorite-btn"
                src={ blackHeartIcon }
                onClick={ () => {
                  removeFavorite(recipe.id);
                } }
              />
              <span data-testid={ `${index}-Pasta-horizontal-tag` } />
              { copyURL ? <p>Link copiado!</p> : null }
            </div>
          ))
        }
      </div>
      <div id="receitasFavoritasBebidas">
        { comidas.length === 0
          ? bebidas.map((recipe, index) => (
            <div className="bebidasFavoritas" key={ index }>
              <Link to={ `${recipe.type}s/${recipe.id}` }>
                <img
                  className="ingredient-img"
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <Link to={ `${recipe.type}s/${recipe.id}` }>
                <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { recipe.alcoholicOrNot }
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>12/12/21</p>
              <input
                type="image"
                alt="Share image"
                data-testid={ `${index}-horizontal-share-btn` }
                className="share-btn"
                src={ shareIcon }
                onClick={ () => shareBtn('bebidas', recipe.id) }
              />
              <input
                type="image"
                alt="Favorite Recipe"
                data-testid={ `${index}-horizontal-favorite-btn` }
                className="favorite-btn"
                src={ blackHeartIcon }
                onClick={ () => removeFavorite(recipe.id) }
              />
              <span data-testid={ `${index}-Pasta-horizontal-tag` } />
              { copyURL ? <p>Link copiado!</p> : null }
            </div>
          )) : bebidas.map((recipe, index) => (
            <div className="bebidasFavoritas" key={ index + 1 }>
              <Link to={ `${recipe.type}s/${recipe.id}` }>
                <img
                  className="ingredient-img"
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index + 1}-horizontal-image` }
                />
              </Link>
              <Link to={ `${recipe.type}s/${recipe.id}` }>
                <p data-testid={ `${index + 1}-horizontal-name` }>{ recipe.name }</p>
              </Link>
              <p data-testid={ `${index + 1}-horizontal-top-text` }>
                { recipe.alcoholicOrNot }
              </p>
              <p data-testid={ `${index + 1}-horizontal-done-date` }>12/12/21</p>
              <input
                type="image"
                alt="Share image"
                data-testid={ `${index + 1}-horizontal-share-btn` }
                className="share-btn"
                src={ shareIcon }
                onClick={ () => shareBtn('bebidas', recipe.id) }
              />
              <input
                type="image"
                alt="Favorite Recipe"
                data-testid={ `${index + 1}-horizontal-favorite-btn` }
                className="favorite-btn"
                src={ blackHeartIcon }
                onClick={ () => removeFavorite(recipe.id) }
              />
              <span data-testid={ `${index}-Pasta-horizontal-tag` } />
              { copyURL ? <p>Link copiado!</p> : null }
            </div>
          ))}
      </div>
    </>
  );
};

export default DetailsFavoriteRecipes;
