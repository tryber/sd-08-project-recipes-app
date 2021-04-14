import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import { fireEvent } from '@testing-library/react';
import ExplorerFoodsDrinks from '../pages/ExplorerFoodsDrinks/ExplorerFoodsDrinks';
import userEvent from '@testing-library/user-event';

describe('1 - Verifica os elementos presentes no Header', () => {
  test('Verifica se o título está presente e contém o texto "Comidas"', () => {
    const { getByTestId } = renderWithRouter(<ExplorerFoodsDrinks title="Explorar Comidas" visible={ false } />);
    const pageTitle = getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Explorar Comidas');
  });
  test('Verifica de exite o botão perfil e se funciona corretamente', () => {
    const { getByTestId, history } = renderWithRouter(<ExplorerFoodsDrinks title="Explorar Comidas" visible={ false } />);
    const btnProfile = getByTestId('profile-top-btn');
    userEvent.click(btnProfile);
    const { pathname } = history.location;
    expect(btnProfile).toBeInTheDocument();
    expect(pathname).toBe('/perfil');
  });
  
});

describe('1 - Implemente os elementos da tela de explorar bebidas ou comidas respeitando os atributos descritos no protótipo', () => {

  it('Tem os data-testids corretos para a tela de explorar comidas', async () => {
    const { findByTestId  } = renderWithRouter(<ExplorerFoodsDrinks title="Explorar Comidas" visible={ false } />);

    expect(await findByTestId(`explore-by-ingredient`)).toBeInTheDocument();
    expect(await findByTestId(`explore-by-area`)).toBeInTheDocument();
    expect(await findByTestId(`explore-surprise`)).toBeInTheDocument();

    expect(await findByTestId(`explore-by-ingredient`)).toHaveTextContent('Por Ingredientes');
    expect(await findByTestId(`explore-by-area`)).toHaveTextContent('Por Local de Origem');
    expect(await findByTestId(`explore-surprise`)).toHaveTextContent('Me Surpreenda!');
  });

  it.skip('Tem os data-testids corretos para a tela de explorar bebidas', async () => {
    const { findByTestId  } = renderWithRouter(<ExplorerFoodsDrinks title="Explorar Bebidas" visible={ false } />);

    expect(await findByTestId(`explore-by-ingredient`)).toBeInTheDocument();
    expect(await findByTestId(`explore-by-area`)).toBeInTheDocument();
    expect(await findByTestId(`explore-surprise`)).toBeInTheDocument();

    expect(await findByTestId(`explore-by-ingredient`)).toHaveTextContent('Por Ingredientes');
    expect(await findByTestId(`explore-by-area`)).toHaveTextContent('Por Local de Origem');
    expect(await findByTestId(`explore-surprise`)).toHaveTextContent('Me Surpreenda!');
  });
});

describe('2 - Redirecione a pessoa usuária ao clicar em "Por Ingredientes", a rota deve mudar para a tela de explorar por ingredientes', () => {
  it('Ao clicar no botão "Por Ingredientes" da tela de explorar comidas a rota muda para a página de explorar comidas por ingrediente', async () => {
    const { findByTestId, history  } = renderWithRouter(<ExplorerFoodsDrinks title="Explorar Comidas" visible={ false } />);

    const exploreByIngredientButton = await findByTestId(`explore-by-ingredient`)

    fireEvent.click(exploreByIngredientButton)

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/ingredientes');
  });

  it('Ao clicar no botão "Explorar Bebidas" da tela de explorar bebidas a rota muda para a página de explorar bebidas por ingrediente', async () => {
    const { findByTestId, history  } = renderWithRouter(<ExplorerFoodsDrinks title="Explorar Bebidas" visible={ false } />);

    const exploreByIngredientButton = await findByTestId(`explore-by-ingredient`)

    fireEvent.click(exploreByIngredientButton)

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas/ingredientes');
  });
});

describe('3 - Redirecione a pessoa usuária ao clicar em "Por Local de Origem", a rota deve mudar para tela de explorar por local de origem', () => {
  it('A rota deve mudar para tela de explorar por local de origem', async () => {
    const { findByTestId, history  } = renderWithRouter(<ExplorerFoodsDrinks title="Explorar Comidas" visible={ false } />);

    const exploreByAreaButton = await findByTestId(`explore-by-area`)

    fireEvent.click(exploreByAreaButton)

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/area');
    
  });
});

describe('4 - Redirecione a pessoa usuária ao clicar em "Me Surpreenda!", a rota deve mudar para a tela de detalhes de uma receita, que deve ser escolhida de forma aleatória através da API', () => {
  test('Ao clicar no botão "Por Ingredientes" da tela de explorar comidas a rota muda para a página de detalhes de uma comida aleatória', async () => {

    const retrieveFoodOrDrink =     
    {
      "meals": [
        {
          "idMeal": "52959",
          "strMeal": "Baked salmon with fennel & tomatoes",
        }
      ]
    }
    
    jest.spyOn(global, "fetch")
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(retrieveFoodOrDrink),
    });

    const { findByTestId, history  } = renderWithRouter(<ExplorerFoodsDrinks title="Explorar Comidas" visible={ false } />);

    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/random.php');

    const exploreSurpriseButton = await findByTestId(`explore-surprise`)

    fireEvent.click(exploreSurpriseButton)

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas/52959');
  });

  test('Ao clicar no botão "Explorar Bebidas" da tela de explorar bebidas a rota muda para a página de detalhes de uma bebida aleatória', async () => {
    const retrieveFoodOrDrink =     
    {
      "drinks": [
        {
          'idDrink': '178319',
          'strDrink': 'Aquamarine',
        }
      ]
    }
    
    jest.spyOn(global, "fetch")
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(retrieveFoodOrDrink),
    });

    const { findByTestId, history  } = renderWithRouter(<ExplorerFoodsDrinks title="Explorar Bebidas" visible={ false } />);

    expect(global.fetch).toBeCalledTimes(2);
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/random.php');

    const exploreSurpriseButton = await findByTestId(`explore-surprise`)

    fireEvent.click(exploreSurpriseButton)

    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas/178319');
  });
});

