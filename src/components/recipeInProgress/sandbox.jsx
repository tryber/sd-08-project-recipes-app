// import React, { useEffect, useState } from 'react';
// import { filterIngAndMeasuresList } from '../../core';
// // import api from '../../services';
// import data from './data';

// const MealRecipeIngredients = () => {
//   // const [recipe, setRecipe] = useState([]);
//   // const [recipeData, setRecipeData] = useState([]);
//   // const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
//   //   console.log(meals[Object.keys(meals)[0]]);
//   //   // const mealId = Object.keys(meals)[0];
//   //   // console.log(mealId);
//   //   setRecipeData(meals[Object.keys(meals)[0]]);
//   //   // api.fetchMealById(mealId)
//   //   //   .then((response) => response.json()).then((result) => setRecipeData(result.meals));
//   // }, []);
//   // useEffect(() => {
//   //   if (recipeData.length > 0) {
//   //     setLoading(false);
//   //   }
//   // }, [recipeData]);
//   const [progress, setProgress] = useState([]);
//   // const [change, setchange] = useState(initialState)
//   const recipe = [data[0]];
//   console.log(recipe);
//   const store = JSON.parse(localStorage.getItem('inProgressRecipe'));
//   console.log(store);
//   const steps = filterIngAndMeasuresList(recipe[0]);

//   if (store === null) {
//     localStorage.setItem('inProgressRecipe', JSON.stringify({
//       cocktails: {},
//       meals: { [data[0].idMeal]: [data[0]], prog: progress },
//     }));
//   }
//   localStorage.setItem('inProgressRecipe', JSON.stringify({
//     cocktails: {},
//     meals: { [data[0].idMeal]: [data[0]], prog: store.prog },
//   }));
//   useEffect(() => {
//     const { meals: { prog } } = JSON.parse(localStorage.getItem('inProgressRecipe'));
//     console.log(prog);
//     let progr;
//     progr = prog;
//     if (progress === undefined) {
//       progr = progress;
//     }
//     localStorage.setItem('inProgressRecipe', JSON.stringify({
//       cocktails: {},
//       meals: { [data[0].idMeal]: [data[0]], prog },
//     }));
//     // const inputs = document.getElementsByTagName('input');
//     // console.log(inputs);
//     setProgress(progr);
//   }, []);
//   useEffect(() => {
//     // const { cocktails, meals } = JSON.parse(localStorage.getItem('inProgressRecipe'));
//     // const inputs = document.getElementsByTagName('input');
//     localStorage.setItem('inProgressRecipe', JSON.stringify({
//       cocktails: {},
//       meals: { [data[0].idMeal]: [data[0]], prog: progress },
//     }));
//     setProgress(progress);
//     return localStorage.setItem('inProgressRecipe', JSON.stringify({
//       cocktails: {},
//       meals: { [data[0].idMeal]: [data[0]], prog: progress },
//     }));
//   }, [progress]);
//   return (
//     <div>
//       <div>
//         <p>Ingredients</p>
//         <ol>
//           {steps[0].map((ingredientsString, indx) => (
//             <li key={ indx } data-testid={ `${indx}-ingredient-step` }>
//               <label htmlFor={ `step-${indx}` }>
//                 <input
//                   type="checkbox"
//                   name={ `step-${indx}` }
//                   id={ `step-${indx}` }
//                   value={ ingredientsString[1] }
//                   onChange={ (e) => setProgress([
//                     ...progress,
//                     e.target.value,
//                   ]) }
//                   checked={ progress ? progress.some((e) => e === ingredientsString[1]) : null }
//                 />
//               </label>
//               <p>
//                 {ingredientsString[1]}
//                 {' - '}
//                 {steps[1][indx][1]}
//               </p>
//             </li>
//           ))}
//         </ol>
//       </div>
//     </div>
//   );
// };

// export default MealRecipeIngredients;
