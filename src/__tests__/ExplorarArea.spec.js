import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import ExplorarArea from '../pages/ExplorarArea';
import NotFound from '../pages/NotFound';

import mockFetch from '../mocks/fetch';
import areasMock from '../mocks/areas';

describe('ExplorarArea', () => {
  const setup = (route) => {
    const history = createMemoryHistory(
      {initialEntries: [
        route
          ? route
          : '/explorar/comidas/area'
      ]}
    );

    const utils = render(
      <Router history={history}>
        {route ? <NotFound /> : <ExplorarArea />}
      </Router>
    );

    return {
      ...utils,
      history,
    };
  };

  beforeEach(() => {
    mockFetch();
  });

  test('78', async () => {
    const { queryByTestId, findByTestId } = setup();
    await expect(findByTestId('All-category-filter')).rejects.toThrow();

    for (let index = 0; index < 12; index += 11) {
      const recipeCard = queryByTestId(`${index}-recipe-card`);
      const recipeImg = queryByTestId(`${index}-card-img`);
      const recipeName = queryByTestId(`${index}-card-name`);
      expect(recipeCard).toBeInTheDocument();
      expect(recipeImg).toBeInTheDocument();
      expect(recipeName).toBeInTheDocument();
    }
    const areaDropdown = queryByTestId('explore-by-area-dropdown');
    expect(areaDropdown).toBeInTheDocument();
    areasMock.meals.forEach(({ strArea: area }) => {
      const areaOpt = queryByTestId(`${area}-option`);
      expect(areaOpt).toBeInTheDocument();
    })
    
    expect(queryByTestId('12-recipe-card')).toBeFalsy();
  });

  test('79', async () => {
    const { findByTestId, history } = setup();
    const recipeCard = await findByTestId('0-recipe-card');
    userEvent.click(recipeCard);
    expect(history.location.pathname).toBe('/comidas/52977');
  });

  test('80', async () => {
    const { findByTestId, queryByTestId } = setup();
    const allOption = await findByTestId('All-option');
    expect(allOption).toBeInTheDocument();    
  });

  test('81', async () => {
    const { findByText } = setup('/explorar/bebidas/area');
    await expect(findByText('Not Found')).resolves.toBeTruthy();
  });
});
