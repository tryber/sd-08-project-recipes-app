const getInformation = (callback) => {
  if ((localStorage.getItem('favoriteRecipes') !== null)) {
    callback(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }
};

export default getInformation;
