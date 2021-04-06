// import React, { Component } from 'react';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import { addFoodToFavorite, continueRecipe, fetchDrinkApiById, fetchFoodRecomendation,
//   getIngredientList, isFavoriteRecipe, recipeIsDone } from '../helpers';
// import ShareButton from '../components/ShareButton';
// import FavoriteButton from '../components/FavoriteButton';

// class ReceitasBebidasEmProgresso extends Component {
//   constructor() {
//     super();
//     this.state = {
//       ingredientList: [],
//       // redirectTo: '',
//       // currentRecipe: '',
//       // currentVideo: '',
//       // recomendations: [],
//       // isThisRecipeDone: false,
//       // continueThisRecipe: false,
//       // favoriteRecipe: false,
//     };
//     // this.fetchFoodRecipe = this.fetchFoodRecipe.bind(this);
//     this.handleChangeChecked = this.handleChangeChecked.bind(this);
//     this.fetchApi = this.fetchApi.bind(this);
//     this.updateStorage = this.updateStorage.bind(this);
//     // this.getSotrage = this.getSotrage.bind(this);
//   }

//   componentDidMount() {
//     this.fetchApi();
//     // this.getSotrage();
//   }

//   fetchApi() {
//     this.setState({ redirectTo: '' });

//     const { match: { params: { id } } } = this.props;
//     this.fetchDrinkRecipe(id);
//   }

//   async fetchDrinkRecipe(drinkId) {
//     const storage = JSON.parse(localStorage.getItem('isDone'));
//     const recipe = await fetchDrinkApiById(drinkId);
//     const ingredients = getIngredientList(recipe);
//     const arrIngredientes = Object.values(ingredients);
//     const isDone = storage || arrIngredientes.reduce((acc, crr) => {
//       acc = { ...acc, [crr.item]: false };
//       return acc;
//     }, {});

//     // const recomendation = await fetchFoodRecomendation();
//     // const finishedRechipe = recipeIsDone(drinkId);
//     // const alreadyStartedThisRecipe = continueRecipe(drinkId, 'bebidas');
//     const isFavorite = isFavoriteRecipe(drinkId);
//     this.setState({
//       isDone,
//       ingredientList: arrIngredientes,
//       // recomendations: recomendation,
//       // currentRecipe: recipe,
//       // isThisRecipeDone: finishedRechipe,
//       // continueThisRecipe: alreadyStartedThisRecipe,
//       favoriteRecipe: isFavorite,
//     });
//   }

//   handleChangeChecked(event) {
//     const { isDone } = this.state;
//     const { name, checked } = event.target;
//     this.setState({ isDone: { ...isDone, [name]: checked } }, () => {
//       console.log(isDone);
//     });
//   }

//   // getSotrage() {
//   //   const storage = JSON.parse(localStorage.getItem('isDone'));
//   //   if (storage) this.setState({ isDone: storage });
//   // }

//   inputCards() {
//     const { ingredientList, isDone } = this.state;
//     return (
//       <div>
//         Em progressso
//         <h1 data-testid="recipe-title" />
//         <img data-testid="recipe-photo" alt="receita-em-progresso" />
//         <ShareButton />
//         <FavoriteButton />

//         <p data-testid="recipe-category" />
//         {}
//         {ingredientList.map((obj, index) => (
//           <div key={ index }>

//             {' '}
//             <label
//               htmlFor={ obj.item }
//               className={ isDone[obj.item] ? 'checkboxInProgressChecked' : 'nunCheck' }
//               data-testid={ `${index}-ingredient-step` }
//             >
//               {obj.item}
//               :
//               {' '}
//               {obj.quantity}
//               <input
//                 name={ obj.item }
//                 className="checkboxInProgress"
//                 type="checkbox"
//                 id={ obj.item }
//                 checked={ isDone[obj.item] }
//                 onChange={ (event) => this.handleChangeChecked(event) }
//                 // onClick={ () => localStorage.setItem('isDone', JSON.stringify(isDone)) }
//               />
//             </label>
//             {' '}

//           </div>

//         ))}
//         <p data-testid="instructions" />
//         <button
//           type="button"
//           data-testid="finish-recipe-btn"
//         >
//           Finish

//         </button>
//         <br />
//         <br />
//       </div>
//     );
//   }

//   updateStorage() {
//     const { isDone } = this.state;
//     // const a = localStorage.getItem('isDone');
//     console.log(isDone);
//     if (!isDone) return;
//     localStorage.setItem('isDone', JSON.stringify(isDone));
//   }

//   render() {
//     this.updateStorage();
//     return (
//       <div>
//         {this.inputCards()}
//       </div>
//     );
//   }
// }

// export default ReceitasBebidasEmProgresso;
