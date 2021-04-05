import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import FoodContext from '../../context/ContextFood';
import DrinksContext from '../../context/ContextDrinks';
import HeaderContext from '../../context/HeaderContext';

export default function renderWithRouter(
  component,
  history = createMemoryHistory(),
) {
  return {
    ...render(
      <Router history={ history }>
        <HeaderContext>
          <FoodContext>
            <DrinksContext>{component}</DrinksContext>
          </FoodContext>
        </HeaderContext>
      </Router>,
    ),
  };
}
