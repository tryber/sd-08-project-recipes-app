function verifyText(id, type) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let textButton = 'Iniciar Receita';

  if (inProgressRecipes) {
    Object.keys(inProgressRecipes[type]).find((progressRecipe) => {
      if (progressRecipe === id) {
        textButton = 'Continuar Receita';
      }
      return null;
    });
  }

  return textButton;
}

export default verifyText;
