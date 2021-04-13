import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import ExplorarIngredientes from '../pages/ExplorarIngredientes';

import mockFetch from '../mocks/fetch';

describe('ExplorarIngredientes', () => {
  const setup = () => {
    const history = createMemoryHistory({initialEntries: ['/explorar/comidas/ingredientes']});

    const utils = render(
      <Router history={history}>
        <ExplorarIngredientes />
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

  test('75', async () => {
    const { findByTestId } = setup();
    const ingredientCard = await findByTestId('0-ingredient-card');
    const ingredientName = await findByTestId('0-card-name');
    const ingredientImage = await findByTestId('0-card-img');

    expect(ingredientCard).toBeInTheDocument();
    expect(ingredientName).toBeInTheDocument();
    expect(ingredientImage).toBeInTheDocument();
  });

  test('76', async () => {
    const { findByTestId } = setup();
    const ingredientCard = await findByTestId('11-ingredient-card');
    const ingredientName = await findByTestId('11-card-name');
    const ingredientImage = await findByTestId('11-card-img');

    expect(ingredientCard).toBeInTheDocument();
    expect(ingredientName).toBeInTheDocument();
    expect(ingredientImage).toBeInTheDocument();
    await expect(findByTestId('12-ingredient-card')).rejects.toThrow();
  });
});