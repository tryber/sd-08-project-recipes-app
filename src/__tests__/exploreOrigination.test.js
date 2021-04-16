import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import mockFetch from '../../cypress/mocks/fetch';

import italianMeals from '../../cypress/mocks/italianMeals';

import renderWithRouter from './helpers/renderWithRouter';
import { MAIN_FOOD_CARD_LENGTH_12 } from '../constants';
import ExploreOrigination from '../containers/ExploreOrigination';

const ITALIAN_OPTION = 'Italian-option';
describe('ExploreOrigination.jsx container', () => {
  const mockTest = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

  it('renders the section and change cards by selecting an option', async () => {
    beforeEach(cleanup);
    await act(async () => {
      renderWithRouter(
        <ExploreOrigination />,
        {
          route: '/explorar/comidas/area',
        },
      );
    });

    expect(mockTest).toBeCalled();
    expect(mockTest).toBeCalledTimes(2);

    const header = screen.getByTestId('header-container');
    expect(header).toBeInTheDocument();

    const mainCards = screen.getAllByTestId(/-recipe-card/i);
    expect(mainCards.length).toBe(MAIN_FOOD_CARD_LENGTH_12);

    await act(async () => {
      userEvent.selectOptions(screen.getByRole('combobox'), 'Italian');
    });

    expect(screen.getByTestId(ITALIAN_OPTION).selected).toBe(true);
    expect(screen.getByTestId(ITALIAN_OPTION)).toBeVisible();

    const mainCardItalianMeals = screen.getAllByTestId(/-recipe-card/i);
    // console.log(mainCardItalianMeals.length);

    mainCardItalianMeals.forEach((card, index) => {
      // console.log(card.childElementCount);
      expect(card.childElementCount).toBe(2);
      // console.log(card.firstChild.src);
      expect(card.firstChild.firstChild.src).toBe(italianMeals.meals[index].strMealThumb);
      // console.log(card.lastChild.innerHTML);
      expect(card.lastChild.firstChild.innerHTML.replace('amp;', ''))
        .toEqual(italianMeals.meals[index].strMeal);
    });
  });
});
