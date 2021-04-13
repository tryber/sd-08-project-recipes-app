import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import ExplorarComidas from '../pages/ExplorarComidas';

import mockFetch from '../mocks/fetch';

describe('ExplorarComidas', () => {
  const setup = () => {
    const history = createMemoryHistory({initialEntries: ['/explorar/comidas']});

    const utils = render(
      <Router history={history}>
        <ExplorarComidas />
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

  test('70.comidas', async () => {
    const {findByTestId} = setup();
    const byIngredient = await findByTestId('explore-by-ingredient');
    const byArea = await findByTestId('explore-by-area');
    const surprise = await findByTestId('explore-surprise');
    expect(byIngredient).toBeInTheDocument();
    expect(byArea).toBeInTheDocument();
    expect(surprise).toBeInTheDocument();
  });

  test('71.comidas', async () => {
    const {findByTestId} = setup();
    const byIngredient = await findByTestId('explore-by-ingredient');
    const byArea = await findByTestId('explore-by-area');
    const surprise = await findByTestId('explore-surprise');
    expect(byIngredient.innerHTML).toBe('Por Ingredientes');
    expect(byArea.innerHTML).toBe('Por Local de Origem');
    expect(surprise.innerHTML).toBe('Me Surpreenda!');
  });

  test('72.comidas', async () => {
    const {findByTestId, history} = setup();
    const byIngredient = await findByTestId('explore-by-ingredient');
    userEvent.click(byIngredient);
    expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');
  });

  test('73', async () => {
    const {findByTestId, history} = setup();
    const byArea = await findByTestId('explore-by-area');
    userEvent.click(byArea);
    expect(history.location.pathname).toBe('/explorar/comidas/area');
  });

  test('74.comidas', async () => {
    const {findByTestId} = setup();
    const surprise = await findByTestId('explore-surprise');
    userEvent.click(surprise);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/random.php');
  });
});
