import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import CardFavorites from '../../components/CardFavorites';
import ContainerWithoutFooter from '../../components/ContainerWithoutFooter';
import FilterTypeButton from '../../components/FilterTypeButton';
import { getlocalStorage, setLocalStorage } from '../../services/localStorage';

// import { Container } from './styles';

function FavoritesRecipes() {
  const [useCurrentFilter, setUseCurrentFilter] = useState('All');
  const [useCurrentRecipes, setUseCurrenteRecipes] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [ShowAlert, SetShowAlert] = useState(false);

  useEffect(() => {
    const favoritesRecipes = getlocalStorage('favoriteRecipes');
    if (favoritesRecipes && useCurrentFilter === 'All') {
      setUseCurrenteRecipes(favoritesRecipes);
    } else if (favoritesRecipes && useCurrentFilter === 'Food') {
      const filteredArray = favoritesRecipes.filter(({ type }) => type === 'comida');
      setUseCurrenteRecipes(filteredArray);
    } else if (favoritesRecipes && useCurrentFilter === 'Drinks') {
      const filteredArray = favoritesRecipes.filter(({ type }) => type === 'bebida');
      setUseCurrenteRecipes(filteredArray);
    }
    setIsLoading(false);
  }, [useCurrentFilter]);

  const removeFavorite = (eliminatedId, eliminatedName) => {
    const newFavorites = useCurrentRecipes.filter(
      ({ id, name }) => id !== eliminatedId && name !== eliminatedName,
    );
    setLocalStorage('favoriteRecipes', newFavorites);
    setUseCurrenteRecipes(newFavorites);
  };

  return (
    <ContainerWithoutFooter title="Receitas Favoritas">
      {ShowAlert && (
        <Alert variant="success" onClick={ () => SetShowAlert(false) }>
          Link copiado!
        </Alert>
      )}
      <FilterTypeButton
        currentFilter={ useCurrentFilter }
        setCurrentFilter={ setUseCurrentFilter }
      />
      { !isLoading && useCurrentRecipes.map(
        ({ id, area, category, alcoholicOrNot, name, image, type }, index) => (
          <CardFavorites
            name={ name }
            id={ id }
            area={ area }
            index={ index }
            key={ index }
            category={ category }
            image={ image }
            alcoholicOrNot={ alcoholicOrNot }
            onClick={ removeFavorite }
            ShowAlert={ () => SetShowAlert(true) }
            type={ type }
          />
        ),
      )}
    </ContainerWithoutFooter>);
}

export default FavoritesRecipes;
