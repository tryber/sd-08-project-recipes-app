import React, { useState, useEffect } from 'react';
import components from '../components/index';
import filtering from '../core/filtering';

const mockLocalRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

function FavoriteRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState('all');
  const setLocalStorage = () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalRecipes));
  };

  const getRecipesFromLocalStorage = () => {
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    favoriteRecipes = favoriteRecipes === null ? [] : favoriteRecipes;
    setRecipes([...favoriteRecipes]);
  };

  useEffect(() => {
    setLocalStorage();
    getRecipesFromLocalStorage();
  }, []);

  const handleFilters = ({ target: { value } }) => {
    setFilters(value);
  };

  const handleFavorite = ({ target }) => {
    const { name } = target;
    const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newData = data.filter((recipe) => recipe.name !== name);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
    setRecipes(newData);
  };
  const { Header, DoneAndFavoriteButtons, FavoriteCard } = components;

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <DoneAndFavoriteButtons handleFilters={ handleFilters } />
      { filtering(recipes, filters).map((recipe, index) => (
        <FavoriteCard
          key={ index }
          handleFavorite={ handleFavorite }
          index={ index }
          recipe={ recipe }
        />
      ))}
    </div>
  );
}

export default FavoriteRecipes;
