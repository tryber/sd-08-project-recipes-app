import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import Profile from '../pages/Profile/Profile';
import userEvent from '@testing-library/user-event';




describe('1 - Verifica os testes da página de Perfil', () => {
  test('Verifica se os elementos estão presentes na tela', () => {
    const { getByTestId} = renderWithRouter(
    <Profile title="Perfil" visible={ false } />,
    );
    const receitasProntasButton = getByTestId('profile-done-btn')
    expect(receitasProntasButton).toBeInTheDocument()
    expect(receitasProntasButton).toHaveTextContent('Receitas Feitas')
    const receitasFavoritasButton = getByTestId('profile-favorite-btn')
    expect(receitasFavoritasButton).toBeInTheDocument()
    expect(receitasFavoritasButton).toHaveTextContent('Receitas Favoritas')
    const leaveButton = getByTestId('profile-logout-btn')
    expect(leaveButton).toHaveTextContent('Sair')
    expect(leaveButton).toBeInTheDocument()
    const profileButton = getByTestId('profile-top-btn')
    expect(profileButton).toBeInTheDocument()
    const drinksButton = getByTestId('drinks-bottom-btn')
    expect(drinksButton).toBeInTheDocument()
    const foodButton = getByTestId('food-bottom-btn')
    expect(foodButton).toBeInTheDocument()
    const exploreButton = getByTestId('explore-bottom-btn')
    expect(exploreButton).toBeInTheDocument()
   
  })
    
test('Verifica se ao clicar nos botoes a rota e redirecionada corretamente', () => {
  const { history,getByTestId} = renderWithRouter(
<Profile title="Perfil" visible={ false } />,
  );
 history.push('/perfil')
 expect(history.location.pathname).toBe('/perfil')
 const receitasProntasButton = getByTestId('profile-done-btn') 
 userEvent.click(receitasProntasButton)
 expect(history.location.pathname).toBe('/receitas-feitas')
 const receitasFavoritasButton = getByTestId('profile-favorite-btn') 
 userEvent.click(receitasFavoritasButton)
 expect(history.location.pathname).toBe('/receitas-favoritas')
 const sairButton = getByTestId('profile-logout-btn') 
 userEvent.click(sairButton)
 expect(history.location.pathname).toBe('/')
 const exploreButton = getByTestId('explore-bottom-btn')
 userEvent.click(exploreButton)
 expect(history.location.pathname).toBe('/explorar')
 const foodButton = getByTestId('food-bottom-btn')
 userEvent.click(foodButton)
 expect(history.location.pathname).toBe('/comidas')
 const drinksButton = getByTestId('drinks-bottom-btn')
 userEvent.click(drinksButton)
 expect(history.location.pathname).toBe('/bebidas')
 const profileButton = getByTestId('profile-top-btn')
 userEvent.click(profileButton)
 expect(history.location.pathname).toBe('/perfil')
  })

  
  test('Verifica o texto', () => {
    const emailStructure = {
      email:'mateuscoury@gmail.com'
    }
    localStorage.setItem('user',JSON.stringify(emailStructure))

    const { getByTestId} = renderWithRouter(
  <Profile title="Perfil" visible={ false } />,
    );
   const {email} = JSON.parse(localStorage.getItem('user'))
   const emailTitle =getByTestId('profile-email')
  expect(emailTitle.innerHTML).toBe(email)
    })

    test('Verifica o botao de sair', () => {
      const mealsToken =1
     
      const cocktailsToken = 1

       const emailStructure = {
        email:'mateuscoury@gmail.com'
      }
      const testDoneRecipe = [
        {
          alcoholicOrNot: '',
          doneDate: '29/03/2021',
          area: 'Canadian',
          category: 'Dessert',
          id: '52929',
          image:
            'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
          name: 'Timbits',
          type: 'comida',
          tags: ['Soup'],
        },
      ];
      const testFavoriteRecipe = [
        {
          alcoholicOrNot: '',
          area: 'Canadian',
          category: 'Dessert',
          id: '52929',
          image:
            'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
          name: 'Timbits',
          type: 'comida',
        },
      ];

      const testRecipesProgress = {
        cocktails:{16419:[]},
        meals:{52997:['Lentils','Carrots']}
      }
      
  
      localStorage.setItem('user',JSON.stringify(emailStructure))
      localStorage.setItem('mealsToken',JSON.stringify(mealsToken))
      localStorage.setItem('cocktailsToken',JSON.stringify(cocktailsToken))
      localStorage.setItem('favoriteRecipes',JSON.stringify(testFavoriteRecipe))
      localStorage.setItem('doneRecipes',JSON.stringify(testDoneRecipe))
      localStorage.setItem('inProgressRecipes',JSON.stringify(testRecipesProgress))
  
      const {history,getByTestId} = renderWithRouter(
    <Profile title="Perfil" visible={ false } />,
      );
      history.push('/perfil')
      const botaoDeSair = getByTestId('profile-logout-btn')
      userEvent.click(botaoDeSair)
      localStorage.removeItem('user')
      localStorage.removeItem('favoriteRecipes')
      localStorage.removeItem('doneRecipes')
      localStorage.removeItem('cocktailsToken')
      localStorage.removeItem('mealsToken')
      localStorage.removeItem('inProgressRecipes')
     
    expect(localStorage.getItem('user')).toBe(null)
    expect(localStorage.getItem('favoriteRecipes')).toBe(null)
    expect(localStorage.getItem('doneRecipes')).toBe(null)
    expect(localStorage.getItem('cocktailsToken')).toBe(null)
    expect(localStorage.getItem('mealsToken')).toBe(null)
      })
})