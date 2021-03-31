const handleYoutube = (param) => {
  let newHttps;
  if (param.idDrink === undefined) {
    const https = param.strYoutube.split('https://www.youtube.com/watch?v=');
    newHttps = `https://www.youtube.com/embed/${https[1]}`;
  }
  return newHttps;
};

export default handleYoutube;
