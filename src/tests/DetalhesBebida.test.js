import React from 'react';
import { cleanup, screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import DetalhesBebida from '../pages/DetalhesBebida';

afterEach(cleanup);
beforeEach(() => jest.clearAllMocks());

describe('Test the DetalhesBebida page', () => {
  const mockedApiReturn = {
    drinks: [{
      idDrink: '15997',
      strDrink: 'GG',
      strDrinkAlternate: null,
      strDrinkES: null,
      strDrinkDE: null,
      strDrinkFR: null,
      'strDrinkZH-HANS': null,
      'strDrinkZH-HANT': null,
      strTags: null,
      strVideo: null,
      strCategory: 'Ordinary Drink',
      strIBA: null,
      strAlcoholic: 'Optional alcohol',
      strGlass: 'Collins Glass',
      strInstructions: 'Pour the Galliano liqueur over ice.',
      strInstructionsES: null,
      strInstructionsDE: 'Den Galliano-Likör über Eis gießen.',
      strInstructionsFR: null,
      'strInstructionsZH-HANS': null,
      'strInstructionsZH-HANT': null,
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      strIngredient1: 'Galliano',
      strIngredient2: 'Ginger ale',
      strIngredient3: 'Ice',
      strIngredient4: null,
      strIngredient5: null,
      strIngredient6: null,
      strIngredient7: null,
      strIngredient8: null,
      strIngredient9: null,
      strIngredient10: null,
      strIngredient11: null,
      strIngredient12: null,
      strIngredient13: null,
      strIngredient14: null,
      strIngredient15: null,
      strMeasure1: '2 1/2 shots ',
      strMeasure2: null,
      strMeasure3: null,
      strMeasure4: null,
      strMeasure5: null,
      strMeasure6: null,
      strMeasure7: null,
      strMeasure8: null,
      strMeasure9: null,
      strMeasure10: null,
      strMeasure11: null,
      strMeasure12: null,
      strMeasure13: null,
      strMeasure14: null,
      strMeasure15: null,
      strCreativeCommonsConfirmed: 'No',
      dateModified: '2016-07-18 22:06:00',
    }],
  };
  const response = { json: jest.fn().mockResolvedValue(mockedApiReturn) };
  global.fetch = jest.fn().mockResolvedValue(response);

  const match = { params: { id: '15997' } };

  it('should have the recipe details', async () => {
    const { history } = renderWithRouter(<DetalhesBebida match={ match } />);

    const startButton = await screen.getByTestId('start-recipe-btn');
    expect(startButton).toBeInTheDocument();
    expect(startButton.innerHTML).toEqual('Continuar Receita');
    fireEvent.click(startButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas/15997/in-progress');
  });
});
