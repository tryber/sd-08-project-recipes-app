import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import CardsDone from '../../components/CardsDone';
// import CardsDone from '../../components/CardsDone';
import ContainerWithoutFooter from '../../components/ContainerWithoutFooter';
import FilterButtonsRecipesMade from '../../components/FilterButtonsRecipesMade';
import { getlocalStorage } from '../../services/localStorage';

// import { Container } from './styles';
function RecipesMade() {
  const [useCurrentFilter, setUseCurrentFilter] = useState('All');
  const [useDoneRecipes, setUseDoneRecipes] = useState([{}]);
  const [ShowAlert, SetShowAlert] = useState(false);
  useEffect(() => {
    const doneRecipes = getlocalStorage('doneRecipes');
    if (doneRecipes && useCurrentFilter === 'All') {
      setUseDoneRecipes(doneRecipes);
    } else if (doneRecipes && useCurrentFilter === 'Food') {
      const filterDoneRecipes = doneRecipes.filter(({ type }) => type === 'comida');
      setUseDoneRecipes(filterDoneRecipes);
    } else if (doneRecipes && useCurrentFilter === 'Drinks') {
      const filterDoneRecipes = doneRecipes.filter(({ type }) => type === 'bebida');
      setUseDoneRecipes(filterDoneRecipes);
    }
  }, [useCurrentFilter]);
  return (
    <ContainerWithoutFooter title="Receitas Feitas">
      {ShowAlert && (
        <Alert variant="success" onClick={ () => SetShowAlert(false) }>
          Link copiado!
        </Alert>
      )}
      <FilterButtonsRecipesMade
        currentFilter={ useCurrentFilter }
        setCurrentFilter={ setUseCurrentFilter }
      />
      {useDoneRecipes.map(
        ({ id,
          type,
          area,
          category,
          alcoholicOrNot,
          name,
          image,
          doneDate,
          tags },
        index) => (
          <CardsDone
            name={ name }
            id={ id }
            area={ area }
            index={ index }
            key={ index }
            category={ category }
            image={ image }
            alcoholicOrNot={ alcoholicOrNot }
            type={ type }
            doneDate={ doneDate }
            tagName={ tags }
            ShowAlert={ () => SetShowAlert(true) }
          />
        ),
      )}
    </ContainerWithoutFooter>);
}

export default RecipesMade;
