import React, { Component } from 'react';
import Header from '../components/Header';
import ShowDoneRecipes from '../components/ShowDoneRecipes';

export default class RecipesDone extends Component {
  render() {
    const values = {
      name: 'Receitas Feitas',
    };
    return (
      <div>
        <Header params={ values } />
        <button type="button" data-testid="filter-by-all-btn">ALl</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drink</button>

        <ShowDoneRecipes />
      </div>
    );
  }
}
