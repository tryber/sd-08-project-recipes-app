import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
// import Profile from '../pages/Profile/Profile';
// import userEvent from '@testing-library/user-event';
import Home from '../pages/Home/Home';
import Explorer from '../pages/Explorer/Explorer';
import ExplorerFoodsDrinks from '../pages/ExplorerFoodsDrinks/ExplorerFoodsDrinks';
import ExplorerByIngridients from '../pages/ExplorerByIngridients/ExplorerByIngridients';
import ExplorerByArea from '../pages/ExplorerByArea/ExplorerByArea';
import Profile from '../pages/Profile/Profile';
import Login from '../components/Login/Login';
import Details from '../pages/Details/Details';
import RecipesInProgress from '../pages/RecipesInProgress/RecipesInProgress';
import { fireEvent } from '@testing-library/dom';

describe('1 - Exiba o menu inferior apenas nas telas indicadas pelo protótipo', () => {
  const hasNoFooter = (query) => {
    expect( query(`footer`)).toBeNull();
    expect( query(`drinks-bottom-btn`)).toBeNull();
    expect( query(`drinks-bottom-btn`)).toBeNull();
    expect( query(`food-bottom-btn`)).toBeNull();
  };

  const hasFooter = (query) => {
    const footer = query('footer')
    const drinksButton = query('drinks-bottom-btn')
    const exploreButton = query('explore-bottom-btn')
    const foodButton = query('food-bottom-btn')

    expect(footer).toBeInTheDocument();

    expect(drinksButton).toBeInTheDocument();
    expect(drinksButton).toHaveAttribute('src', 'drinkIcon.svg')

    expect(exploreButton).toBeInTheDocument();
    expect(exploreButton).toHaveAttribute('src', 'exploreIcon.svg')

    expect(foodButton).toBeInTheDocument();
    expect(foodButton).toHaveAttribute('src', 'mealIcon.svg')
  };

  it('Não tem footer na tela de login', () => {
    const { queryByTestId } = renderWithRouter(
      <Login/>,
      );

    hasNoFooter(queryByTestId);
  });

  it('Tem footer na tela de principal de receitas de comidas', () => {
    const { getByTestId } = renderWithRouter(<Home title="Comidas" />);

    hasFooter(getByTestId);
  });

  it('Tem footer na tela de principal de receitas de bebidas', () => {
    const { getByTestId } = renderWithRouter(<Home title="Bebidas" />);

    hasFooter(getByTestId);
  });

  it('Não tem footer na tela de detalhes de uma receita de comida', () => {
    const { queryByTestId } = renderWithRouter(<Details title="Comidas" match={{params: {id: "178319"}}} />);

    hasNoFooter(queryByTestId);
  });

  it('Não tem footer na tela de detalhes de uma receita de bebida', () => {
    const { queryByTestId } = renderWithRouter(<Details title="Bebidas" match={{params: {id: "178319"}}} />);

    hasNoFooter(queryByTestId);
  });

  it('Não tem footer na tela de receita em processo de comida', () => {
    const { queryByTestId } = renderWithRouter(<RecipesInProgress title="Comidas" match={{params:{id:'52977'}}}/>)

    hasNoFooter(queryByTestId);
  });

  it('Não tem footer na tela de receita em processo de bebida', () => {
    const { queryByTestId } = renderWithRouter(<RecipesInProgress title="Bebidas" match={{params:{id:'52977'}}}/>)

    hasNoFooter(queryByTestId);
  });

  it('Tem footer na tela de explorar', () => {
    const { getByTestId } = renderWithRouter(<Explorer title="Explorar" visible={false} />)

    hasFooter(getByTestId);
  });

  it('Tem footer na tela de explorar comidas', () => {
    const { getByTestId } = renderWithRouter(<ExplorerFoodsDrinks title="Explorar Comidas" visible={ false } />)

    hasFooter(getByTestId);
  });

  it('Tem footer na tela de explorar bebidas', () => {
    const { getByTestId } = renderWithRouter(<ExplorerFoodsDrinks title="Explorar Bebidas" visible={ false } />)

    hasFooter(getByTestId);
  });

  

  it('Tem footer na tela de explorar comidas por ingrediente', () => {
    const { getByTestId } = renderWithRouter(<ExplorerByIngridients title="Explorar Ingredientes de Comidas" visible={ false } />);

    hasFooter(getByTestId);
  });

  it('Tem footer na tela de explorar bebidas por ingrediente', () => {
    const { getByTestId } = renderWithRouter(<ExplorerByIngridients title="Explorar Ingredientes de Bebidas" visible={ false } />);

    hasFooter(getByTestId);
  });

  //adsf

  it('Tem footer na tela de explorar comidas por local de origem', () => {
    const { getByTestId } = renderWithRouter(<ExplorerByArea title="Explorar Origem" />)

    hasFooter(getByTestId);
  });

  it('Tem footer na tela de perfil', () => {
    const { getByTestId } = renderWithRouter(<Profile title="Perfil" visible={ false } />)

    hasFooter(getByTestId);
  });

});

  describe('22 - Redirecione a pessoa usuária para uma lista de cocktails ao clicar no ícone de bebidas', () => {
    it('Redireciona para a rota correta', () => {
      const { getByTestId, history } = renderWithRouter(<Home title="Comidas" />);

      const drinksButton = getByTestId('drinks-bottom-btn')

      fireEvent.click(drinksButton)
  
      const { pathname } = history.location;
      expect(pathname).toBe('/bebidas');
    });
  });
  
  describe('23 - Redirecione a pessoa usuária para a tela de explorar ao clicar no ícone de exploração', () => {
    it('Redireciona para a rota correta', () => {
      const { getByTestId, history } = renderWithRouter(<Explorer title="Explorar" visible={false} />);

      const exploreButton = getByTestId('explore-bottom-btn')

      fireEvent.click(exploreButton)
  
      const { pathname } = history.location;
      expect(pathname).toBe('/explorar');
    });
  });
  
  describe('24 - Redirecione a pessoa usuárua para uma lista de comidas ao clicar no ícone de comidas', () => {
    it('Redireciona para a rota correta', () => {
      const { getByTestId, history } = renderWithRouter(<Home title="Bebidas" />);

      const foodButton = getByTestId('food-bottom-btn')

      fireEvent.click(foodButton)
  
      const { pathname } = history.location;
      expect(pathname).toBe('/comidas');
    });
  });