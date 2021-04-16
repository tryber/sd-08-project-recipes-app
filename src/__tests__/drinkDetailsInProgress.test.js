import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import { act } from 'react-dom/test-utils';

import mockFetch from '../../cypress/mocks/fetch';

import renderWithRouter from './helpers/renderWithRouter';
import DrinkDetailsInProgress from '../containers/DrinkDetailsInProgress';

describe('FoodDetailsInProgress.jsx container', () => {
  const mockTest = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

  it('should render', () => {
    beforeEach(cleanup);
    // await act(async () => {
    renderWithRouter(
      <DrinkDetailsInProgress />,
    );
    // });
  });

  it('should fetch api', () => {
    beforeEach(cleanup);
    // await act(async () => {
    renderWithRouter(
      <DrinkDetailsInProgress />,
    );
    // });
    expect(mockTest).toBeCalled();
    expect(mockTest).toBeCalledTimes(2);
  });

  // linha 25 pede para testar as keys de uma div ou se a div renderiza...
});
