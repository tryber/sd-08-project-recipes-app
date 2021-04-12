import React from 'react';
import userEvent from '@testing-library/user-event';
import mockDataC from './Corba';
import mockDataL from './Letra';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import Header from '../Pages/Header';

const ENTRIES_URL = '/comidas';
const SEARCH = 'search-top-btn';

describe('<Header />', () => {
  it('Verifica a pesquisa por nome', async () => {
    const apiResponse = Promise.resolve({
      json: () => Promise.resolve(mockDataC),
      ok: true,
    });

    const mockedExchange = jest.spyOn(global, 'fetch')
      .mockImplementation(() => apiResponse);

    afterEach(() => jest.clearAllMocks());

    const { getByTestId, getByRole, getByText } = renderWithRouterAndRedux(<Header />, {
      initialEntries: [ENTRIES_URL],
    });

    const pesquisa = getByTestId(SEARCH);
    userEvent.click(pesquisa);

    const input = getByRole('textbox', {
      name: /pesquisar/i,
    });
    expect(input).toBeInTheDocument();

    userEvent.type(input, 'corba');
    const nome = getByText(/nome/i);
    userEvent.click(nome);
    const pesquisar = getByRole('button', {
      name: /pesquisar/i,
    });
    userEvent.click(pesquisar);
    expect(mockedExchange).toBeCalled();
    // expect(mockedExchange).toHaveBeenCalledTimes(1);
    expect(mockedExchange).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=corba');
  });

  it('Verifica a pesquisa pela Letra', async () => {
    const apiResponse = Promise.resolve({
      json: () => Promise.resolve(mockDataL),
      ok: true,
    });

    const mockedExchange = jest.spyOn(global, 'fetch')
      .mockImplementation(() => apiResponse);

    afterEach(() => jest.clearAllMocks());

    const { getByTestId, getByRole, getByText } = renderWithRouterAndRedux(<Header />, {
      initialEntries: [ENTRIES_URL],
    });

    const pesquisa = getByTestId(SEARCH);
    userEvent.click(pesquisa);

    const input = getByRole('textbox', {
      name: /pesquisar/i,
    });
    expect(input).toBeInTheDocument();

    userEvent.type(input, 'a');
    const letra = getByText(/primeira letra/i);
    userEvent.click(letra);
    const pesquisar = getByRole('button', {
      name: /pesquisar/i,
    });
    userEvent.click(pesquisar);
    expect(mockedExchange).toBeCalled();
    // expect(mockedExchange).toHaveBeenCalledTimes(1);
    expect(mockedExchange).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });

  it('Verifica se apresenta o alert', async () => {
    const mockAlert = jest.spyOn(global, 'alert')
      .mockImplementation(() => 'Sua busca deve conter somente 1 (um) caracter');

    const { getByTestId, getByRole, getByText } = renderWithRouterAndRedux(<Header />, {
      initialEntries: [ENTRIES_URL],
    });

    const pesquisa = getByTestId(SEARCH);
    userEvent.click(pesquisa);

    const input = getByRole('textbox', {
      name: /pesquisar/i,
    });
    expect(input).toBeInTheDocument();
    userEvent.type(input, 'aaa');
    const letra = getByText(/primeira letra/i);
    userEvent.click(letra);
    const pesquisar = getByRole('button', {
      name: /pesquisar/i,
    });
    userEvent.click(pesquisar);
    expect(mockAlert).toBeCalled();
  });
});
