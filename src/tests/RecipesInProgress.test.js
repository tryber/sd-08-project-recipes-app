import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';
import RecipesInProgress from '../pages/RecipesInProgress/RecipesInProgress';
import { fireEvent, waitForDomChange } from '@testing-library/react';

describe('1 - Verifica os elementos presentes na tela receitas em progresso e seus conteúdos', () => {
  test('Verifica os elementos da Página', async() => {
   const { history,getByTestId,findByTestId} = renderWithRouter(<RecipesInProgress title="Comidas" match={{params:{id:'52977'}}}/>)
   history.push('comidas/52977/in-progress')
   const finalizarReceita = getByTestId('finish-recipe-btn')
   expect(finalizarReceita).toBeInTheDocument()
   const shareBtn = await findByTestId('share-btn')
   expect(shareBtn).toBeInTheDocument()
   const favoriteBtn = await findByTestId('favorite-btn')
   expect(favoriteBtn).toBeInTheDocument()
   const textInstructions = await findByTestId('instructions')
   expect(textInstructions).toBeInTheDocument()
   expect(textInstructions).toHaveTextContent(/Pick through your lentils for any /i)
   const recipeImage = await findByTestId('recipe-photo')
   expect(recipeImage).toBeInTheDocument()
  expect(recipeImage).toHaveAttribute('src',"https://www.themealdb.com/images/media/meals/58oia61564916529.jpg")
  const recipeTitle = await findByTestId('recipe-title')
  expect(recipeTitle).toBeInTheDocument()
  expect(recipeTitle).toHaveTextContent('Corba')
  const video = await findByTestId('video')
  expect(video).toBeInTheDocument()
  expect(video).toHaveAttribute('src','https://www.youtube.com/embed?v=VVnZd8A84z4')
  })
  test('Verifica os checkboxes,o botao de finalizar receita e a rota ao clicar no botao de finalizar',async()=>{
    const { history,getByTestId,findByTestId} = renderWithRouter(<RecipesInProgress title="Comidas" match={{params:{id:'52977'}}}/>)
    history.push('comidas/52977/in-progress')
    const finalizarReceitaBtn = getByTestId('finish-recipe-btn')
    const recipeIngredient1 = await findByTestId('0-ingredient-step')
    const recipeIngredient2 = await findByTestId('1-ingredient-step')
    const recipeIngredient3 = await findByTestId('2-ingredient-step')
    const recipeIngredient4 = await findByTestId('3-ingredient-step')
    const recipeIngredient5 = await findByTestId('4-ingredient-step')
    const recipeIngredient6 = await findByTestId('5-ingredient-step')
    const recipeIngredient7 = await findByTestId('6-ingredient-step')
    const recipeIngredient8 = await findByTestId('7-ingredient-step')
    const recipeIngredient9 = await findByTestId('8-ingredient-step')
    const recipeIngredient10 = await findByTestId('9-ingredient-step')
    const recipeIngredient11 = await findByTestId('10-ingredient-step')
    const recipeIngredient12 = await findByTestId('11-ingredient-step')
    userEvent.click(recipeIngredient1)
    userEvent.click(recipeIngredient2)
    userEvent.click(recipeIngredient3)
    userEvent.click(recipeIngredient4)
    userEvent.click(recipeIngredient5)
    userEvent.click(recipeIngredient6)
    userEvent.click(recipeIngredient7)
    userEvent.click(recipeIngredient8)
    userEvent.click(recipeIngredient9)
    userEvent.click(recipeIngredient10)
    userEvent.click(recipeIngredient11)
    userEvent.click(recipeIngredient12)
    expect(finalizarReceitaBtn.disabled).toBe(false)
    userEvent.click(finalizarReceitaBtn)
    expect(history.location.pathname).toBe('/receitas-feitas')
  })
  test('Verifica a funcionalidade do botao de favoritar',async()=>{
    const { history,findByTestId} = renderWithRouter(<RecipesInProgress title="Comidas" match={{params:{id:'52977'}}}/>)
    history.push('comidas/52977/in-progress')
    const favoritebtn = await findByTestId('favorite-btn')
    userEvent.click(favoritebtn)
    const favoriteRecipes = [{
      "id": "52771",
      "type": "comida",
      "area": "Italian",
      "category": "Vegetarian",
      "alcoholicOrNot": "",
      "name": "Spicy Arrabiata Penne",
      "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).not.toBe(null)
  

  })
})

describe('50 - Salve o estado do progresso, que deve ser mantido caso a pessoa atualize a página ou volte para a mesma receita', () => {
  it('salva o progresso de uma receita de comida em andamento', async () => {
    const { findByTestId} = renderWithRouter(<RecipesInProgress title="Comidas" match={{params:{id:'52977'}}}/>)


    // fireEvent.click( await findByTestId('0-ingredient-step'))
    const check = await findByTestId(`0-checkBox-Ingredient`)
    expect(check).toBeInTheDocument();
    expect(check).not.toBeChecked()

    fireEvent.click( await findByTestId(`0-checkBox-Ingredient`))

    window.location.reload();

    expect(check).toBeChecked()

  });
});

describe('51 - Desenvolva a lógica de favoritar e compartilhar, a lógica da tela de detalhes de uma receita se aplica aqui', () => {
  it('verifica se os botões estão disponíveis na tela de detalhes de uma comida', async () => {
    const { findByTestId} = renderWithRouter(<RecipesInProgress title="Comidas" match={{params:{id:'52977'}}}/>)


    expect(await findByTestId('share-btn')).toBeInTheDocument();
    expect(await findByTestId('favorite-btn')).toBeInTheDocument();
  });

  it('verifica comida favoritada', async () => {

    const favoriteRecipes = [{
      "id": "52771",
      "type": "comida",
      "area": "Italian",
      "category": "Vegetarian",
      "alcoholicOrNot": "",
      "name": "Spicy Arrabiata Penne",
      "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    

    const { findByTestId } = renderWithRouter(<RecipesInProgress title="Comidas" match={{params:{id:'52977'}}}/>)
    
    const favoriteButton = await findByTestId('favorite-btn')
    // const buttonsIcons = await findAllByTestId('explore-bottom-btn')

    waitForDomChange({ favoriteButton })
    .then(() => expect(favoriteButton).toHaveAttribute('src', 'blackHeartIcon.svg').then(localStorage.clear()))
  });

  it.skip('verifica comida não favoritada', async () => {
    const { findByTestId} = renderWithRouter(<RecipesInProgress title="Comidas" match={{params:{id:'52977'}}}/>)
    
    const favoriteButton = await findByTestId('favorite-btn')
    // const buttonsIcons = await findAllByTestId('explore-bottom-btn')

    waitForDomChange({ favoriteButton })
    .then(() => expect(favoriteButton).toHaveAttribute('src', 'whiteHeartIcon.svg'))
  });
});
