const initialState = {
  doneRecipes: [],
};

function isDone(par) {
  const newArr = [];
  let arr2 = [];
  arr2 = par;
  let area = '';
  let type = '';
  let alcoholicOrNot = '';
  let newObj = {};
  let image = '';
  for (let i = 0; i < arr2.length; i += 1) {
    if (!arr2[i].idMeal) {
      type = 'bebida';
      alcoholicOrNot = 'Alcoholic';
      image = arr2[i].strDrinkThumb;
    } else {
      type = 'comida';
      area = arr2[i].strArea;
      image = arr2[i].strMealThumb;
    }
    newObj = {
      id: arr2[i].idMeal || arr2[i].idDrink,
      area,
      alcoholicOrNot,
      category: arr2[i].strCategory,
      name: arr2[i].strMeal || arr2[i].strDrink,
      type,
      image,
      doneDate: '23/06/2020',
      tags: [arr2[i].strTags],
    };
    newArr.push(newObj);
    area = '';
    type = '';
    alcoholicOrNot = '';
    image = '';
  }
  console.log(newArr);
  localStorage.setItem('doneRecipes', JSON.stringify(newArr));
}

const doneRecipes = (state = initialState, action) => {
  let a;
  switch (action.type) {
  case 'ADD_RECIPE':
    a = {
      ...state,
      doneRecipes: [...state.doneRecipes, action.payload],
    };
    isDone(a.doneRecipes);
    console.log(a.doneRecipes);
    console.log(a);
    return a;
  default:
    return state;
  }
};
export default doneRecipes;
