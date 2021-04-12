// import { useLocation } from 'react-router';

// Meals and Drinks API URLS
export const FOOD_INGREDIENTS = 'https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}';
export const FOOD_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s={nome}';
export const FOOD_FIRST_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}';
export const TEST = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';

// Login email and password validation constants
export const DATA_TEST_ID_EMAIL = 'email-input';
export const DATA_TEST_ID_PASSWORD = 'password-input';
export const DATA_TEST_ID_LOGING_BTN = 'login-submit-btn';
export const MIN_PASSWORD_LENGTH = 7;
export const VALID_EMAIL = 'alguem@email.com';
export const VALID_EMAIL_REGEX = /\S+@\S+\.\S+/;
export const VALID_PASSWORD = '1234567';
// const regex =  new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$', 'gm');
export const login = {
  MIN_PASSWORD_LENGTH,
  VALID_EMAIL,
  VALID_EMAIL_REGEX,
  VALID_PASSWORD,
  DATA_TEST_ID_EMAIL,
  DATA_TEST_ID_PASSWORD,
  DATA_TEST_ID_LOGING_BTN,
};

export const header = {
  COMIDAS: 'Comidas',
  EXPLORAR: 'Explorar',
  EXPLORAR_COMIDAS: 'Explorar Comidas',
};
export const MAIN_FOOD_CARD_LENGTH_12 = 12;
export const CATEGORIES_LENGTH_5 = 5;

export const buttonsDoneAndFavoriteRecipes = [
  {
    name: 'All', type: 'all', testId: 'filter-by-all-btn',
  },
  { name: 'Food', type: 'comida', testId: 'filter-by-food-btn' },
  { name: 'Drinks', type: 'bebida', testId: 'filter-by-drink-btn' },
];

// const ReturnPathName = () => {
//   const { pathname } = useLocation();
//   return pathname;
// };
// console.log(ReturnPathName());
// export const changeTitleByPathName = () => {
//   console.log(pathname);
//   ReturnPathName();
//   if (pathname.includes('/comidas')) {
//     return 'Comidas';
//   }
//   if (pathname.includes('/bebidas')) {
//     return 'Bebidas';
//   }
//   if (pathname.includes('/perfil')) {
//     return 'Perfil';
//   }
//   if (pathname.includes('/explorar')) {
//     return 'Explorar';
//   }
//   if (pathname.includes('/receitas-feitas')) {
//     return 'Receitas Feitas';
//   }
//   if (pathname.includes('/receitas-favoritas')) {
//     return 'Receitas Favoritas';
//   }
//   if (pathname.includes('/explorar/comidas')) {
//     return 'Explorar Comidas';
//   }
//   if (pathname.includes('/explorar/bebidas')) {
//     return 'Explorar Bebidas';
//   }
//   if (pathname.includes('/explorar/bebidas/ingredientes')) {
//     return 'Explorar Ingredientes';
//   }
//   if (pathname.includes('/explorar/comidas/ingredientes')) {
//     return 'Explorar Ingredientes';
//   }
//   if (pathname.includes('/explorar/comidas/area')) {
//     return 'Explorar Origem';
//   }
// };
