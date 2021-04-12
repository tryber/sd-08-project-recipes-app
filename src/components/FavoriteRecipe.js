import React, { useContext } from 'react';
import HeaderP from './HeaderP';
import DetailsFavoriteRecipes from './DetailsFavoriteRecipes';
import Context from '../context/Context';

const FavoriteRecipe = () => {
  const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const { setComidas, setBebidas } = useContext(Context);

  return (
    <div>
      <HeaderP title="Receitas Favoritas" />
      <hr />
      <div className="btns-recipes-completed">
        <button
          type="button"
          value="Food"
          onClick={ () => {
            setBebidas([]);
            setComidas(favorite.filter((item) => item.type === 'comida'));
          } }
          data-testid="filter-by-food-btn"
          className="btn-recipes-completed"
        >
          Food
        </button>
        <button
          type="button"
          value="Drinks"
          onClick={ () => {
            setComidas([]);
            setBebidas(favorite.filter((item) => item.type === 'bebida'));
          } }
          data-testid="filter-by-drink-btn"
          className="btn-recipes-completed"
        >
          Drinks
        </button>
        <button
          type="button"
          value="All"
          onClick={ () => {
            setBebidas(favorite.filter((item) => item.type === 'bebida'));
            setComidas(favorite.filter((item) => item.type === 'comida'));
          } }
          data-testid="filter-by-all-btn"
          className="btn-recipes-completed"
        >
          All
        </button>
      </div>
      <br />
      <br />
      <DetailsFavoriteRecipes />
    </div>
  );
};

export default FavoriteRecipe;
