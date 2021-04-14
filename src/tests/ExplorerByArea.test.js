import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import ExplorerByArea from '../pages/ExplorerByArea/ExplorerByArea';
import { fireEvent, screen } from '@testing-library/react';

describe('1 - Verifica os elementos presentes na tela explorar por area', () => {
  test('Verifica se o título está presente e contém o texto "Explorar Origem"', () => {
    const { getByTestId } = renderWithRouter(
      <ExplorerByArea title="Explorar Origem" />,
    );
    const pageTitle = getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Explorar Origem');
  });
});
describe('2 - Verifica se o select que filtra as receitas funciona como o esperado', () => {
  test('Verifica se existe um select para a filtragem das receitas', () => {
    const { getByTestId } = renderWithRouter(
      <ExplorerByArea title="Explorar Origem" />,
    );
    const select = getByTestId('explore-by-area-dropdown');
    expect(select).toBeInTheDocument();
  });
  test('Verifica se existem 12 cards renderizados na tela', async () => {
    renderWithRouter(<ExplorerByArea title="Explorar Origem" />);

    for (let i = 0; i < 12; i += 1) {
      let card = await screen.findByTestId(`${i}-recipe-card`);
      expect(card).toBeInTheDocument();
      let cardImage = await screen.findByTestId(`${i}-card-img`);
      expect(cardImage).toBeInTheDocument();
      let cardName = await screen.findByTestId(`${i}-card-name`);
      expect(cardName).toBeInTheDocument();
    }
  });
});

describe('3 - Verifica as requisições a API', () => {
  test('Verifica as requisições a API', async () => {

    const categoryArea = require('../../cypress/mocks/areas');
    jest.spyOn(global, "fetch")
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(categoryArea),
    });

    renderWithRouter(<ExplorerByArea title="Explorar Origem" />);

    expect(global.fetch).toBeCalledTimes(2);
    expect(global.fetch).toBeCalledWith("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    expect(global.fetch).toBeCalledWith("https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian");

  });
});

describe('4 - Desenvolva as mesmas especificações da tela de receitas principal, com a diferença de que os filtros de categoria são substituídos por um dropdown', () => {
  
  it('Ao selecionar um filtro de local de origem, todas as receitas devem mudar para os dados filtrados da API', async () => {
    const { findByTestId} = renderWithRouter(<ExplorerByArea title="Explorar Origem" />)
  
    const areaDropdown = await findByTestId('explore-by-area-dropdown')
  
    fireEvent.change(areaDropdown, { target: { value: 'Japanese' }})
  
    const japaneseMealsMock = require('../../cypress/mocks/japaneseMeals');
    jest.spyOn(global, "fetch")
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(japaneseMealsMock),
      });
  
      expect(global.fetch).toBeCalledTimes(5);
      expect(global.fetch).toBeCalledWith("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      expect(global.fetch).toBeCalledWith("https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese");
  
      fireEvent.change(areaDropdown, { target: { value: 'Italian' }})
  
      const ItalianMealsMock = require('../../cypress/mocks/italianMeals');
  
    jest.spyOn(global, "fetch")
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(ItalianMealsMock),
      });
  
      expect(global.fetch).toBeCalledTimes(6);
      expect(global.fetch).toBeCalledWith("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      expect(global.fetch).toBeCalledWith("https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian");
  
  });

  it('Ao clicar no card, a rota deve mudar para a tela de detalhes da receita com o ID da mesma na URL', async () => {
    const { findByTestId, history } = renderWithRouter(<ExplorerByArea title="Explorar Origem" />)

    fireEvent.click( await findByTestId('0-recipe-card') )

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas/52961');
  });
});

describe('5 - Implemente o dropdown de maneira que devem estar disponíveis todas as áreas retornadas da API, incluindo a opção "All", que retorna as receitas sem nenhum filtro', () => {
  it('No dropdown devem estar disponíveis todas as áreas retornadas da API, incluindo a opção "All"', async () => {
    const { findByTestId } = renderWithRouter(<ExplorerByArea title="Explorar Origem" />)

    expect( await findByTestId('All-option')).toBeInTheDocument();
    expect( await findByTestId('All-option')).toHaveTextContent('All');

    const categoryArea = require('../../cypress/mocks/areas');

    categoryArea.meals.forEach( async ({ strArea: area }) => {
      expect( await findByTestId(`${area}-option`)).toHaveTextContent(area);
    });
  });
});
