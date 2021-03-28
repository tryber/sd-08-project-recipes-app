import {
  CATEGORIES_FOODS,
  CATEGORIES_DRINKS,
} from '../../constants/ActionTypes';

const INITIAL_STATE = {
  foodsCategories: [],
  drinksCategories: [],
};

// FIXME: Todos os reducers na pratica não deveriam ser nomeados uma vez que
//        no momento que faço um export default quem nomeia o reducer é de fato
//        a store. Isso deixa a aplicação mais flexivel.

// NOTE: Uma boa pratica em aplicações React seria que apenas componentes deveriam
//       user o padão de nomeclatura PascalCase. O nome dos arquivos dos reducers
//       deveriam ser ou em camelCase ou tudo minusculo separado por ponto.
//       CategoriesRecipes.js =  category.recipes.reducer.js

const CategoriesRecipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CATEGORIES_FOODS:
    return {
      ...state,
      foodsCategories: action.payload.foods,
    };
  case CATEGORIES_DRINKS:
    return {
      ...state,
      drinksCategories: action.payload.drinks,
    };
  default:
    return state;
  }
};

export default CategoriesRecipes;
