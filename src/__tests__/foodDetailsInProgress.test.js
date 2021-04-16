import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import { act } from 'react-dom/test-utils';

import mockFetch from '../../cypress/mocks/fetch';

import renderWithRouter from './helpers/renderWithRouter';
import FoodDetailsInProgress from '../containers/FoodDetailsInProgress';

describe('FoodDetailsInProgress.jsx container', () => {
  const mockTest = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

  it('should render', () => {
    beforeEach(cleanup);
    // await act(async () => {
    renderWithRouter(
      <FoodDetailsInProgress />,
    );
    // });
  });

  it('should fetch api', () => {
    beforeEach(cleanup);
    // await act(async () => {
    renderWithRouter(
      <FoodDetailsInProgress />,
    );
    // });
    expect(mockTest).toBeCalled();
    expect(mockTest).toBeCalledTimes(2);
  });
});
