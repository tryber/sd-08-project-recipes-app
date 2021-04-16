import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
// import mockFetch from '../../cypress/mocks/fetch';

import renderWithRouter from './helpers/renderWithRouter';
import SearchDropDrown from '../components/SearchDropDown';

describe('NotFound.jsx container', () => {
  beforeEach(cleanup);

  it('should render', () => {
    renderWithRouter(<SearchDropDrown />);
  });

  it('should render', async () => {
    beforeEach(cleanup);
    // const mockedFetch = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    // const mockedAlert = jest.spyOn(global, 'alert').mockImplementation('Sua busca deve conter somente 1 (um) caracter');
    await act(async () => {
      renderWithRouter(<SearchDropDrown />);
      // expect(mockTest).toBeCalled();
      // expect(mockTest).toBeCalledTimes(2);
    });

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    const radioName = screen.getByText('Nome');
    expect(radioName).toBeInTheDocument();

    const searchButton = screen.getByText('BUSCAR');
    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toBeDisabled();

    act(() => {
      userEvent.type(searchInput, 'Spicy Arrabiata Penne');
      userEvent.click(radioName);
    });

    expect(searchButton).not.toBeDisabled();

    // act(() => {
    // userEvent.click(searchButton);
    // });
  });
});
