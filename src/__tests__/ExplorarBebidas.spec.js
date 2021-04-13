import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import ExplorarBebidas from '../pages/ExplorarBebidas';
import mockFetch from '../mocks/fetch';

describe('ExplorarBebidas', () => {
  const setup = () => {
    const history = createMemoryHistory({initialEntries: ['/explorar/bebidas']});
    const utils = render(
      <Router history={history}>
        <ExplorarBebidas />
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

  test('70.bebidas', async () => {
    const {findByTestId} = setup();
    const byIngredient = await findByTestId('explore-by-ingredient');
    const surprise = await findByTestId('explore-surprise');
    
    expect(byIngredient).toBeInTheDocument();
    expect(surprise).toBeInTheDocument();
    await expect(findByTestId('explore-by-area')).rejects.toThrow();
  });

  test('71.bebidas', async () => {
    const {findByTestId} = setup();
    const byIngredient = await findByTestId('explore-by-ingredient');
    const surprise = await findByTestId('explore-surprise');
    expect(byIngredient.innerHTML).toBe('Por Ingredientes');
    expect(surprise.innerHTML).toBe('Me Surpreenda!');
  });

  test('72.bebidas', async () => {
    const {findByTestId, history} = setup();
    const byIngredient = await findByTestId('explore-by-ingredient');
    userEvent.click(byIngredient);
    expect(history.location.pathname).toBe('/explorar/bebidas/ingredientes');
  });

  test('74.bebidas', async () => {
    const {findByTestId} = setup();
    const surprise = await findByTestId('explore-surprise');
    userEvent.click(surprise);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  });
});
