function verifyInDon(type, recipe) {
  let doneDate = new Date();
  const dd = String(doneDate.getDate()).padStart(2, '0');
  const mm = String(doneDate.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = doneDate.getFullYear();
  doneDate = `${mm}/${dd}/${yyyy}`;
  let startDoneRecipe;

  if (type === 'Drink') {
    startDoneRecipe = {
      id: recipe[`id${type}`],
      type: 'bebida',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe[`str${type}`],
      image: recipe[`str${type}Thumb`],
      doneDate,
      tags: [],
    };
  } else {
    startDoneRecipe = {
      id: recipe[`id${type}`],
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe[`str${type}`],
      image: recipe[`str${type}Thumb`],
      doneDate,
      tags: recipe.strTags.split(','),
    };
  }

  const savedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  savedDoneRecipes.push(startDoneRecipe);
  localStorage.setItem('doneRecipes', JSON.stringify(savedDoneRecipes));
}

export default verifyInDon;
