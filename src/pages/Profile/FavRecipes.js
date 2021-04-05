import React, { useState } from 'react';
import CardFavorites from '../../components/Card/CardFavorites';
import Header from '../../components/Header';

function FavRecipes() {
  const [filter, setFilter] = useState('');
  const [, forceUpdate] = useState('');
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(favorites);

  const removeFavorite = (idx, id) => {
    console.log(idx);
    const newLocalStorage = favorites.filter((_, index) => index !== idx);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newLocalStorage));
    forceUpdate(id);
  };

  return (
    <div>
      <Header
        name="Receitas Favoritas"
        currentPage="Fav"
        icon="false"
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
        {
          favorites
            .filter((item) => {
              if (filter === '') return item;
              return item.type === filter;
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
            })
        }
      </main>
    </div>
  );
}

export default FavRecipes;
