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
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

export default function DoneRecipes() {
  const { Header, DoneAndFavoriteButtons, DoneCard } = components;
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState('all');

  const setLocalStorage = () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockLocalRecipes));
  };

  const getRecipesFromLocalStorage = () => {
    let favoriteRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
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

  return (
    <div>
      <Header title="Receitas Feitas" />
      <DoneAndFavoriteButtons handleFilters={ handleFilters } />
      { filtering(recipes, filters).map((recipe, index) => (<DoneCard
        key={ recipe.id }
        index={ index }
        recipe={ recipe }
      />
      ))}
    </div>
  );
}
