import React, { useState } from 'react';
import CardFavorites from '../../components/CardFavorites';
import Header from '../../components/Header';

export default function FavoriteRecipes() {
  const [filtered, setFilter] = useState('');
  const [, forceUpdate] = useState('');
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(favorites);

  const removeFavorite = (idx, id) => {
    const newLocalStorage = favorites.filter((_, index) => index !== idx);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newLocalStorage));
    forceUpdate(id);
  };

  return (
    <div>
      <Header
        title="Receitas Favoritas"
        currentPage="Fav"
        search="false"
      />
      <div className="filter-btn">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFilter('') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('comida') }
        >
          Comidas
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('bebida') }
        >
          Bebidas
        </button>
      </div>
      <main>
        { favorites
          && favorites
            .filter((item) => {
              if (filtered === '') return item;
              return item.type === filtered;
            })
            .map((card, index) => {
              console.log('o item map', card);
              console.log('com index', index);
              return (
                <CardFavorites
                  key={ card.id }
                  index={ index }
                  img={ card.image }
                  id={ card.id }
                  removeFavorite={ removeFavorite }
                  title={ card.name }
                  alt={ card.name }
                  type={ card.type }
                  desc={ card.type === 'bebida'
                    ? card.alcoholicOrNot
                    : `${card.area} - ${card.category}` }
                />
              );
            })}
      </main>
    </div>
  );
}
