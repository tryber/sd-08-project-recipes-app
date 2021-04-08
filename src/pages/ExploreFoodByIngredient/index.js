import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import ContainerDefault from '../../components/ContainerDefault';
import { filterMealsByIngrendient } from '../../redux/actions';
import { fetchIngredient, imgIngrediente } from '../../services/theMeadlDB';
// import { Container } from './styles';

function ExploreFoodByIngredient() {
  const [useingredient, setIngredient] = useState([{}]);
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();

  useEffect(() => {
    const apiIngredient = async () => {
      const ingred = await fetchIngredient();
      setIngredient(ingred);
    };
    apiIngredient();
  }, []);

  const mealsByIngredient = (ingredient) => {
    dispatch(filterMealsByIngrendient(ingredient));
    if (path.includes('/comidas')) {
      history.push('/comidas');
    }
  };
  const numberIngredient = 12;
  return (
    <ContainerDefault title="Explorar Ingredientes">
      <div className="d-flex flex-wrap">
        {useingredient.map((ingredient, index) => (index < numberIngredient ? (
          <Card
            data-testid={ `${index}-ingredient-card` }
            key={ index }
            onClick={ () => mealsByIngredient(ingredient.strIngredient) }
          >
            <Card.Img
              data-testid={ `${index}-card-img` }
              alt={ ingredient.strIngredient }
              src={ imgIngrediente(ingredient.strIngredient) }
            />
            <Card.Title data-testid={ `${index}-card-name` }>
              {ingredient.strIngredient}
            </Card.Title>
          </Card>
        ) : null))}
      </div>
    </ContainerDefault>
  );
}

export default ExploreFoodByIngredient;
