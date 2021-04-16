import React, { useState } from 'react';
import Header from '../components/Header';
import CategoriesContainer from '../components/CategoriesContainer';
import CardFavoritRecipe from '../components/CardFavoriteRecipe';
import { getFavoriteRecipes } from '../services/getLocalStorage';

function FavoritesRecipes() {
  const favoriteRecipes = getFavoriteRecipes() || [];
  const [shoulUpdate, setShouldUpdate] = useState(false);
  const [filterFavorite, setFilterFavorite] = useState('All');
  let favorites = [];
  const handleClick = () => {
    setShouldUpdate(!shoulUpdate);
  };

  const showFavorites = () => {
    if (filterFavorite === 'All') {
      favorites = favoriteRecipes;
    } else if (filterFavorite === 'Drink') {
      const filteredFavorites = favoriteRecipes.filter(
        (favorite) => favorite.type === 'bebida',
      );
      favorites = filteredFavorites;
    } else {
      // Food
      const filteredFavorites = favoriteRecipes.filter(
        (favorite) => favorite.type === 'comida',
      );
      favorites = filteredFavorites;
    }
  };

  const handleClickFilter = (type) => {
    setFilterFavorite(type);
  };

  showFavorites();

  return (
    <section>
      <Header label="Receitas Favoritas" Search={ () => '' } />
      <br />
      <br />
      <br />
      <CategoriesContainer page="Favoritas" callback={ handleClickFilter } />
      <section className="cards-favorites">
        {favorites.map((favorite, index) => {
          const {
            id,
            type,
            area,
            category,
            alcoholicOrNot,
            name,
            image,
          } = favorite;
          return (
            <CardFavoritRecipe
              key={ id }
              imgPath={ image }
              title={ name }
              category={ type === 'bebida' ? alcoholicOrNot : category }
              page={ type.concat('s') }
              id={ id }
              area={ area }
              drinkCategory={ alcoholicOrNot }
              index={ index }
              callback={ handleClick }
            />
          );
        })}
      </section>
    </section>
  );
}

export default FavoritesRecipes;
