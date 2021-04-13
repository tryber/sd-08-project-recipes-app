import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';

import { createBrowserHistory } from 'history';
import Explorar from '../pages/Explorar';
import userEvent from '@testing-library/user-event';

describe('Explorar Page', () => {
//   beforeEach(() => {
//     Object.defineProperty(window, 'localStorage', {
//       value: {
//         getItem: jest.fn(() => null),
//         setItem: jest.fn(() => null),
//         clear: jest.fn(() => null),
//       },
//       writable: true,
//     });
//   });
  const setup = () => {
    const history = createBrowserHistory();
    const utils = render(
      <Router history={ history }>
        <Explorar />
      </Router>,
    );

    return {
      ...utils,
      history,
    };
  };

  test('67', async () => {
    const { findByTestId } = setup();
    const exploreFoodBtn = await findByTestId('explore-food');
    const exploreDrinkBtn = await findByTestId('explore-drinks');
    expect(exploreFoodBtn).toBeInTheDocument();
    expect(exploreDrinkBtn).toBeInTheDocument();
  });

  test('68', async () => {
    const { findByTestId } = setup();
    const exploreFoodBtn = await findByTestId('explore-food');
    const exploreDrinkBtn = await findByTestId('explore-drinks');
    expect(exploreFoodBtn.innerHTML).toBe('Explorar Comidas');
    expect(exploreDrinkBtn.innerHTML).toBe('Explorar Bebidas');
  });

  test('69.food', async () => {
    const { findByTestId, history } = setup();
    const exploreFoodBtn = await findByTestId('explore-food');
    userEvent.click(exploreFoodBtn);
    expect(history.location.pathname).toBe('/explorar/comidas');
  });

  test('69.drink', async () => {
    const { findByTestId, history } = setup();
    const exploreDrinkBtn = await findByTestId('explore-drinks');
    userEvent.click(exploreDrinkBtn);
    expect(history.location.pathname).toBe('/explorar/bebidas');
  });
});
