// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import CardIngredientsFoods from '../components/CardIngredientsFoods';
// import getMeals from '../helpers/ingredientsApi';
// import { fetchFoodApiByIngredient } from '../helpers';

// // async function filterByIngrediente(ingrediente) {
// //   const results = await fetchFoodApiByIngredient(ingrediente);
// //   console.log(results);
// // }

// export default function FoodIngredientes() {
//   const [ingredients, setIngrediets] = useState('');
//   const zero = 0;
//   const twelve = 12;
//   async function filterByIngrediente(ingrediente) {
//     const results = await fetchFoodApiByIngredient(ingrediente);
//     console.log(results);
//   }
//   useDispatch({ type: 'increment-counter' });
//   useEffect(() => {
//     async function fetchIngredients() {
//       const response = await getMeals('listIngredient', '');
//       setIngrediets(response.meals);
//     }
//     fetchIngredients();
//   }, [setIngrediets]);

//   return (
//     <div>
//       <Header title="Explorar Ingredientes" />
//       { (ingredients.length > zero)
//         && ingredients.map((ingredient, index) => {
//           if (index < twelve) {
//             return (
//               <button type="button" onClick={ () => filterByIngrediente(ingredient.strIngredient);  }>
//                 <CardIngredientsFoods
//                   index={ index }
//                   name={ ingredient.strIngredient }
//                   key={ index }
//                   isMeal
//                 />
//               </button>
//             );
//           }
//           return null;
//         })}
//       <Footer />
//     </div>
//   );
// }
