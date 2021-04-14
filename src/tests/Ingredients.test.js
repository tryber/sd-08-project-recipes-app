import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Ingredients from '../components/Ingredients';
import meals from '../../cypress/mocks/meals';

const mockedApiReturn = {
  meals: [{ idMeal: '52977',
    strMeal: 'Corba',
    strDrinkAlternate: null,
    strCategory: 'Side',
    strArea: 'Turkish',
    strInstructions: 'Pick through your lentils for any foreign debris',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    strTags: 'Soup',
    strYoutube: 'https://www.youtube.com/watch?v=VVnZd8A84z4',
    strIngredient1: 'Lentils',
    strIngredient2: 'Onion',
    strIngredient3: 'Carrots',
    strIngredient4: 'Tomato Puree',
    strIngredient5: 'Cumin',
    strIngredient6: 'Paprika',
    strIngredient7: 'Mint',
    strIngredient8: 'Thyme',
    strIngredient9: 'Black Pepper',
    strIngredient10: 'Red Pepper Flakes',
    strIngredient11: 'Vegetable Stock',
    strIngredient12: 'Water',
    strIngredient13: 'Sea Salt',
    strIngredient14: '',
    strIngredient15: '',
    strIngredient16: '',
    strIngredient17: '',
    strIngredient18: '',
    strIngredient19: '',
    strIngredient20: '',
    strMeasure1: '1 cup ',
    strMeasure2: '1 large',
    strMeasure3: '1 large',
    strMeasure4: '1 tbs',
    strMeasure5: '2 tsp',
    strMeasure6: '1 tsp ',
    strMeasure7: '1/2 tsp',
    strMeasure8: '1/2 tsp',
    strMeasure9: '1/4 tsp',
    strMeasure10: '1/4 tsp',
    strMeasure11: '4 cups ',
    strMeasure12: '1 cup ',
    strMeasure13: 'Pinch',
    strMeasure14: ' ',
    strMeasure15: ' ',
    strMeasure16: ' ',
    strMeasure17: ' ',
    strMeasure18: ' ',
    strMeasure19: ' ',
    strMeasure20: ' ',
    strSource: 'https://findingtimeforcooking.com/main-dishes/red-lentil-soup-corba/',
    dateModified: null }],
};

describe('Test the Details page Header', () => {
  it('should have all the components of the header', async () => {
    renderWithRouter(
      <Ingredients id="52977" recipeDetails={ mockedApiReturn } />,
    );

    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
    expect(instructions.innerHTML)
      .toEqual('Pick through your lentils for any foreign debris');

    const checkbox = screen.getAllByRole('checkbox');
    expect(checkbox.length).toEqual('48');
  });
});
