import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import CardDoneRecipe from '../../components/CardDoneRecipe';
import ContainerWithoutFooter from '../../components/ContainerWithoutFooter';
import FilterTypeButton from '../../components/FilterTypeButton';
import { getlocalStorage } from '../../services/localStorage';

// import { Container } from './styles';

function RecipesMade() {
  const [doneRecipesList, setDoneRecipesList] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('All');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const doneRecipes = getlocalStorage('doneRecipes');
    if (currentFilter === 'All') {
      setDoneRecipesList(doneRecipes);
    } else if (currentFilter === 'Food') {
      const filteredArray = doneRecipes.filter(({ type }) => type === 'comida');
      setDoneRecipesList(filteredArray);
    } else {
      const filteredArray = doneRecipes.filter(({ type }) => type === 'bebida');
      setDoneRecipesList(filteredArray);
    }
  }, [currentFilter]);

  return (
    <ContainerWithoutFooter title="Receitas Feitas">
      {showAlert && (
        <Alert variant="success" onClick={ () => setShowAlert(false) }>
          Link copiado!
        </Alert>)}
      <FilterTypeButton
        currentFilter={ currentFilter }
        setCurrentFilter={ setCurrentFilter }
      />
      {doneRecipesList && doneRecipesList.map(({
        id, type, area, category, alcoholicOrNot,
        name, image, doneDate, tags,
      }, index) => (
        <CardDoneRecipe
          id={ id }
          type={ type }
          area={ area }
          category={ category }
          alcoholicOrNot={ alcoholicOrNot }
          name={ name }
          image={ image }
          doneDate={ doneDate }
          tags={ tags }
          index={ index }
          key={ index }
          showAlert={ setShowAlert }
        />
      ))}
    </ContainerWithoutFooter>);
}

export default RecipesMade;
