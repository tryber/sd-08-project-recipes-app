function verifyInProgress(id, type) {
  let startRecipe = {
    cocktails: {
      [id]: [],
    },
    meals: {},
  };

  if (type === 'meals') {
    startRecipe = {
      cocktails: {},
      meals: {
        [id]: [],
      },
    };
  }

  const savedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (!savedRecipes) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(startRecipe));
  } else {
    savedRecipes[type][id] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(savedRecipes));
  }
}

export default verifyInProgress;
