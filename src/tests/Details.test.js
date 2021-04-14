import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import { waitForElementToBeRemoved, fireEvent, waitForDomChange, waitForElement, render } from '@testing-library/react';
import Details from '../pages/Details/Details';
import Home from '../pages/Home/Home';
import oneMeal from './helpers/mocks/oneMeal'
import ginDrinks from './helpers/mocks/ginDrinks'
import SlideCards from '../components/SlideCards/SlideCards';

describe('1 - Verifica os elementos presentes em Details', () => {

  test('Verifica se os elementos estão presentes na página de comidas', async() => {
    const { findByTestId, findAllByTestId  } = renderWithRouter(<Details title="Comidas" match={{params: {id: "52771"}}} />);

    const image = await findByTestId('recipe-photo')
    const title = await findByTestId('recipe-title')
    const shareButton = await findByTestId('share-btn')
    const favoriteButton = await findByTestId('favorite-btn')
    const buttonsIcons = await findAllByTestId('explore-bottom-btn')
    const recipeCategory = await findByTestId('recipe-category')
    const firstIngredient = await findByTestId('0-ingredient-name-and-measure')
    const secondIngredient = await findByTestId('1-ingredient-name-and-measure')
    const thirdIngredient = await findByTestId('2-ingredient-name-and-measure')
    const fourthIngredient = await findByTestId('3-ingredient-name-and-measure')
    const fifthIngredient = await findByTestId('4-ingredient-name-and-measure')
    const sixthIngredient = await findByTestId('5-ingredient-name-and-measure')
    const seventhIngredient = await findByTestId('6-ingredient-name-and-measure')
    const eighthIngredient = await findByTestId('7-ingredient-name-and-measure')
    const instructions = await findByTestId('instructions')
    // const firstRecomendation = await findByTestId('0-recomendation-card')
    // const firstRecomendation = await waitForElement(() => findByTestId('0-recomendation-card'));
    const startRecipeButton = await findByTestId('start-recipe-btn')

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg')

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/Spicy Arrabiata Penne/i)

    expect(shareButton).toBeInTheDocument();
    expect(shareButton).toContainElement(buttonsIcons[0])

    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toContainElement(buttonsIcons[1])

    expect(buttonsIcons[0]).toHaveAttribute('src', 'shareIcon.svg')
    expect(buttonsIcons[1]).toHaveAttribute('src', 'whiteHeartIcon.svg')

    expect(recipeCategory).toBeInTheDocument();
    expect(recipeCategory).toHaveTextContent(/Vegetarian/i)

    expect(firstIngredient).toBeInTheDocument();
    expect(firstIngredient).toHaveTextContent(/penne rigate/i)
    expect(firstIngredient).toHaveTextContent(/1 pound/i)
    expect(secondIngredient).toHaveTextContent(/olive oil/i)
    expect(secondIngredient).toHaveTextContent('1/4 cup')
    expect(thirdIngredient).toHaveTextContent(/garlic/i)
    expect(thirdIngredient).toHaveTextContent(/3 cloves/i)
    expect(fourthIngredient).toHaveTextContent(/chopped tomatoes/i)
    expect(fourthIngredient).toHaveTextContent(/1 tin/i)
    expect(fifthIngredient).toHaveTextContent(/red chile flakes/i)
    expect(fifthIngredient).toHaveTextContent('1/2 teaspoon')
    expect(sixthIngredient).toHaveTextContent(/italian seasoning/i)
    expect(sixthIngredient).toHaveTextContent('1/2 teaspoon')
    expect(seventhIngredient).toHaveTextContent(/basil/i)
    expect(seventhIngredient).toHaveTextContent(/6 leaves/i)
    expect(eighthIngredient).toHaveTextContent(/Parmigiano-Reggiano/i)
    expect(eighthIngredient).toHaveTextContent(/spinkling/i)


    expect(instructions).toBeInTheDocument();
    expect(instructions).toHaveTextContent(/Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes. In a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil. Drain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm./i)

    // expect(firstRecomendation).toBeInTheDocument();

    expect(startRecipeButton).toBeInTheDocument();
    expect(startRecipeButton).toHaveTextContent(/Iniciar Receita/i)
  }, 50000);

  test('Verifica se os elementos estão presentes na página de bebidas', async() => {
    const { findByTestId, findAllByTestId } = renderWithRouter(<Details title="Bebidas" match={{params: {id: "178319"}}} />);

    const image = await findByTestId('recipe-photo')
    const title = await findByTestId('recipe-title')
    const shareButton = await findByTestId('share-btn')
    const favoriteButton = await findByTestId('favorite-btn')
    const buttonsIcons = await findAllByTestId('explore-bottom-btn')
    const recipeCategory = await findByTestId('recipe-category')
    const firstIngredient = await findByTestId('0-ingredient-name-and-measure')
    const secondIngredient = await findByTestId('1-ingredient-name-and-measure')
    const thirdIngredient = await findByTestId('2-ingredient-name-and-measure')
    const instructions = await findByTestId('instructions')
    // const firstRecomendation = await findByTestId('0-recomendation-card')
    const startRecipeButton = await findByTestId('start-recipe-btn')

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg')

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/Aquamarine/i)

    expect(shareButton).toBeInTheDocument();
    expect(shareButton).toContainElement(buttonsIcons[0])

    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toContainElement(buttonsIcons[1])

    expect(buttonsIcons[0]).toHaveAttribute('src', 'shareIcon.svg')
    expect(buttonsIcons[1]).toHaveAttribute('src', 'whiteHeartIcon.svg')

    expect(recipeCategory).toBeInTheDocument();
    expect(recipeCategory).toHaveTextContent(/Alcoholic/i)

    expect(firstIngredient).toBeInTheDocument();
    expect(firstIngredient).toHaveTextContent(/Hpnotiq/i)
    expect(firstIngredient).toHaveTextContent(/2 oz/i)
    expect(secondIngredient).toHaveTextContent(/Pineapple Juice/i)
    expect(secondIngredient).toHaveTextContent(/1 oz/i)
    expect(thirdIngredient).toHaveTextContent(/Banana Liqueur/i)
    expect(thirdIngredient).toHaveTextContent(/1 oz/i)


    expect(instructions).toBeInTheDocument();
    expect(instructions).toHaveTextContent(/Shake well in a shaker with ice. Strain in a martini glass./i)

    // expect(firstRecomendation).toBeInTheDocument();

    expect(startRecipeButton).toBeInTheDocument();
    expect(startRecipeButton).toHaveTextContent(/Iniciar Receita/i)
  });
});

describe.skip('2 - Verifica a existência do botão de nome "Iniciar Receita" que deve ficar fixo na parte de baixo da tela o tempo todo', () => {
  test('Verifica posicionamento do botão na tela de detalhes de comida', async () => {
    const { findByTestId } = renderWithRouter(<Details title="Comidas" match={{params: {id: "52771"}}} />);

    // const startRecipeButton = await findByTestId('start-recipe-btn')
    const startRecipeButton = await waitForElement(() => findByTestId('start-recipe-btn'));


    expect(startRecipeButton).toBeInTheDocument();

    expect(startRecipeButton).toHaveStyle(`
    position: fixed;
    bottom: 0px;
    `)
  })
  test('Verifica posicionamento do botão na tela de detalhes de bebida', async () => {
    const { findByTestId } = renderWithRouter(<Details title="Comidas" match={{params: {id: "178319"}}} />);

    const startRecipeButton = await findByTestId('start-recipe-btn')
    
    expect(startRecipeButton).toBeInTheDocument();

    expect(startRecipeButton).toHaveStyle(`
    position: fixed;
    bottom: 0px;
    `)
  })
})

describe('3 - Caso a receita já tenha sido feita, o botão "Iniciar Receita" deve sumir', () =>{
  test('Verifica se botão de iniciar receita não é visível na tela de detalhes de uma comida', async () => {
    

    const { queryByTestId } = renderWithRouter(<Details title="Comidas" match={{params: {id: "52771"}}} />);

    const doneRecipes = [{
      "id": "52771",
      "type": "comida",
      "area": "Italian",
      "category": "Vegetarian",
      "alcoholicOrNot": "",
      "name": "Spicy Arrabiata Penne",
      "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
      "doneDate": "22/6/2020",
      "tags": ["Pasta", "Curry"]
    }];

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    await waitForElementToBeRemoved(() => queryByTestId('start-recipe-btn'))

    localStorage.clear()

  })

  test('Verifica se botão de iniciar receita não é visível na tela de detalhes de uma bebida', async () => {
    

    const { queryByTestId } = renderWithRouter(<Details title="Bebidas" match={{params: {id: "178319"}}} />);

    const doneRecipes = [{
      "id": "178319",
      "type": "bebida",
      "area": "",
      "category": "Cocktail",
      "alcoholicOrNot": "Alcoholic",
      "name": "Aquamarine",
      "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
      "doneDate": "23/6/2020",
      "tags": []
    }];

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    await waitForElementToBeRemoved(() => queryByTestId('start-recipe-btn'))

    localStorage.clear()

  })
})

describe('4 - caso a receita tenha sido iniciada mas não finalizada, o texto do botão deve ser "Continuar Receita', () =>{
  test('Verifica botão de "Continuar Receita" na tela de detalhes de uma comida', async () => {
    const inProgressRecipes = {
      meals: {
        52771: [],
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

    const { findByTestId } = renderWithRouter(<Details title="Comidas" match={{params: {id: "52771"}}} />);

    const startRecipeButton = await findByTestId('start-recipe-btn')
    expect(startRecipeButton).toHaveTextContent(/Continuar Receita/i)

    localStorage.clear()

  })
  test('Verifica botão de "Continuar Receita" na tela de detalhes de uma bebida', async () => {
    const inProgressRecipes = {
      cocktails: {
        178319: [],
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

    const { findByTestId } = renderWithRouter(<Details title="Bebidas" match={{params: {id: "178319"}}} />);

    const startRecipeButton = await findByTestId('start-recipe-btn')
    expect(startRecipeButton).toHaveTextContent(/Continuar Receita/i)

    localStorage.clear()

  })
})


describe('5 - Redirecione a pessoa usuário caso o botão "Iniciar Receita" seja clicado, a rota deve mudar para a tela de receita em processo', () => {
  test('Redireciona para tela de receita da comida em processo', async () => {

    const { history: firstHistory } = renderWithRouter(<Home title="Comidas" />);

    const { findByTestId } = renderWithRouter(<Details title="Comidas" match={{params: {id: "52771"}}} history={firstHistory} />);


    const startRecipeButton = await findByTestId('start-recipe-btn')
    expect(startRecipeButton).toBeInTheDocument()
    fireEvent.click(startRecipeButton);
    const { pathname } = firstHistory.location
    expect(pathname).toBe('/comidas/52771/in-progress')

  });

  test('Redireciona para tela de receita da bebida em processo', async () => {
    const { history: firstHistory } = renderWithRouter(<Home title="Bebidas" />);

    const { findByTestId } = renderWithRouter(<Details title="Bebidas" match={{params: {id: "178319"}}} history={firstHistory} />);

    const startRecipeButton = await findByTestId('start-recipe-btn')
    expect(startRecipeButton).toBeInTheDocument()
    fireEvent.click(startRecipeButton);
    const { pathname } = firstHistory.location
    expect(pathname).toBe('/bebidas/178319/in-progress')

  });
});

describe.skip('7 - Implemente o ícone do coração (favorito) de maneira que, deve vir preenchido caso a receita esteja favoritada ', () => {
  

  test('Verifica se a comida favoritada vem com o coração preenchido', async () => {

    localStorage.clear()

    
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

    const { findByTestId, findAllByTestId } = renderWithRouter(<Details title="Comidas" match={{params: {id: "52771"}}} />)
    
    const favoriteButton = await findByTestId('favorite-btn')
    const buttonsIcons = await findAllByTestId('explore-bottom-btn')

    waitForDomChange({ favoriteButton })
    .then(() => expect(buttonsIcons[1]).toHaveAttribute('src', 'blackHeartIcon.svg'))
  });

  

  test('Verifica se a bebida favoritada vem com o coração preenchido', async () => {

    const favoriteRecipes = [{
      "id": "178319",
      "type": "bebida",
      "area": "",
      "category": "Cocktail",
      "alcoholicOrNot": "Alcoholic",
      "name": "Aquamarine",
      "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    const { findAllByTestId } = renderWithRouter(<Details title="Bebidas" match={{params: {id: "178319"}}} />)

    
    const buttonsIcons = await findAllByTestId('explore-bottom-btn')

    expect(buttonsIcons[1]).toHaveAttribute('src', 'blackHeartIcon.svg')

    localStorage.clear()
  });
  
});

describe('8 - Implemente a lógica no botão de favoritar, caso seja clicado, o ícone do coração deve mudar seu estado atual, caso esteja preenchido deve mudar para "despreenchido" e vice-versa', () => {
  test('Favorita a comida', async () => {
    const { findByTestId, findAllByTestId } = renderWithRouter(<Details title="Comidas" match={{params: {id: "52977"}}} />)

    const favoriteButton = await findByTestId('favorite-btn')
    fireEvent.click(favoriteButton)

    const buttonsIcons = await findAllByTestId('explore-bottom-btn')
    expect(buttonsIcons[1]).toHaveAttribute('src', 'blackHeartIcon.svg')
    
  });

  test('Desfavorita a comida', async () => {

    localStorage.clear()

    const favoriteRecipes = [{
      "id": "52977",
      "type": "comida",
      "area": "Turkish",
      "category": "Side",
      "alcoholicOrNot": "",
      "name": "Corba",
      "image": "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    // const favoriteRecipesToGet = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // console.log(favoriteRecipesToGet)

    const { findByTestId, findAllByTestId } = renderWithRouter(<Details title="Comidas" match={{params: {id: "52977"}}} />)

    const favoriteButton = await findByTestId('favorite-btn')

    waitForDomChange({ favoriteButton })
    .then(() => fireEvent.click(favoriteButton))

    const buttonsIcons = await findAllByTestId('explore-bottom-btn')
    expect(buttonsIcons[1]).toHaveAttribute('src', 'whiteHeartIcon.svg')

    localStorage.clear()
  });

  test('Favorita a bebida', async () => {
    const { findByTestId, findAllByTestId } = renderWithRouter(<Details title="Bebidas" match={{params: {id: "178319"}}} />)

    const favoriteButton = await findByTestId('favorite-btn')
    fireEvent.click(favoriteButton)

    const buttonsIcons = await findAllByTestId('explore-bottom-btn')
    expect(buttonsIcons[1]).toHaveAttribute('src', 'blackHeartIcon.svg')
  });

  test('Desfavorita a bebida', async () => {
    const favoriteRecipes = [{
      "id": "178319",
      "type": "bebida",
      "category": "Cocktail",
      "alcoholicOrNot": "Alcoholic",
      "name": "Aquamarine",
      "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    // const favoriteRecipesToGet = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // console.log(favoriteRecipesToGet)

    const { findByTestId, findAllByTestId } = renderWithRouter(<Details title="Bebidas" match={{params: {id: "178319"}}} />)

    const favoriteButton = await findByTestId('favorite-btn')

    waitForDomChange({ favoriteButton })
    .then(() => fireEvent.click(favoriteButton))

    const buttonsIcons = await findAllByTestId('explore-bottom-btn')
    expect(buttonsIcons[1]).toHaveAttribute('src', 'whiteHeartIcon.svg')

    localStorage.clear()
  });
});

describe.skip('2 - Verifica se as requisições foram feitas', () => {

  test('Verifica se a requisição para a API de comidas foi realizada', async () => {
    const mealOrDrink = oneMeal;
    // const meal = oneMeal.meals.meals;
    const recomended = ginDrinks.drinks;
    // const results = ginDrinks.drinks
       
    jest.spyOn(global, "fetch")
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealOrDrink),
    });

    renderWithRouter(<Details title="Comidas" match={{params: {id: "52771"}}} />);

    render(<SlideCards title="Comidas" results={recomended} numberOfCards={6} />)

    expect(global.fetch).toBeCalledTimes(2);
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');

    

    

    

  })

  // test('Verifica se a requisição para a API de bebidas foi realizada', async () => {
    
  // })
})
