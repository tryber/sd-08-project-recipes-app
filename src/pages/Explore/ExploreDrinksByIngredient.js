import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Footer } from '../../component';
import Context from '../../context/Context';
import CardsContainer from '../../styles/CardsContainer';

export default function ExploreDrinksByIngredient() {
  const { setSearchParams } = useContext(Context);
  const SHOW_ME_TWELVE = 12;
  const [ingredients, setIngredientes] = useState([]);
  const history = useHistory();

  const getDrinkIngredients = async () => {
    const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    let response = {};
    try {
      response = await fetch(endPoint);
      return response.json();
    } catch (error) {
      return error.response;
    }
  };

  const onFetchIngredients = async () => {
    const ingredientsRes = await getDrinkIngredients();
    const filtered = ingredientsRes.drinks.filter((_, index) => index < SHOW_ME_TWELVE);
    setIngredientes(filtered);
  };

  const handleFilter = async (ingredient) => {
    setSearchParams({
      searchInput: ingredient,
      selectedParameter: 'ingredient',
      location: history.location.pathname });
    history.push('/bebidas');
  };

  const source = (ingredient) => `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`;
  useEffect(() => {
    onFetchIngredients();
  }, []);

  return (
    <>
      <Header pageTitle="Explorar Ingredientes" showSearchButton={ false } />
      <CardsContainer>
        {ingredients.map((item, index) => (
          <button
            key={ index }
            onClick={ () => handleFilter(item.strIngredient1) }
            type="button"
          >
            <div data-testid={ `${index}-ingredient-card` }>
              <img
                data-testid={ `${index}-card-img` }
                alt="ingredients"
                src={ source(item.strIngredient1) }
              />
              <h1 data-testid={ `${index}-card-name` }>{item.strIngredient1}</h1>
            </div>
          </button>
        ))}
      </CardsContainer>
      <Footer />
    </>
  );
}
