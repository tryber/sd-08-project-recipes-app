import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import RecipeSearchBar from '../components/RecipeSearchBar';
import searchAction from '../redux/actions/searchAction';
import { SEARCH_INPUT } from '../redux/actions/index';

describe('RecipeSearchBar.js', () => {
  test('if the input onChange function', () => {
    const search = { inputValue: 'gin', inputType: 'ingredient' };
    const expectAction = {
      type: SEARCH_INPUT,
      payload: {
        search,
      },
    };

    renderWithReduxandRouter(<RecipeSearchBar />);

    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const button = screen.getByTestId('exec-search-btn');

    const GIN = 'gin';

    userEvent.type(searchInput, GIN);
    userEvent.click(firstLetter);
    userEvent.click(nameRadio);
    userEvent.click(ingredientRadio);
    userEvent.click(button);
    expect(searchAction(search)).toEqual(expectAction);
    expect(button).toBeInTheDocument();
  });

  test('if the alert fires with wrong input', () => {
    renderWithReduxandRouter(<RecipeSearchBar />);

    const searchInput = screen.getByTestId('search-input');
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const button = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'aaa');
    userEvent.click(firstLetter);
    userEvent.click(button);
    expect(searchInput).toHaveTextContent('');
  });
});
