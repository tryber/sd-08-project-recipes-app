import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import ContainerDefault from '../../components/ContainerDefault';
import Loading from '../../components/Loading';
import { filterDrinksByIngrendient } from '../../redux/actions';
import { fetchIngredientDrinks } from '../../services/theCockTailDB';
import './styles.css';

// import { Container } from './styles';

function ExploreDrinksByIngredient() {
  const [useingredient, setIngredient] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();

  useEffect(() => {
    const apiIngredient = async () => {
      setIsLoading(true);
      const ingred = await fetchIngredientDrinks();
      setIngredient(ingred);
      setIsLoading(false);
    };
    apiIngredient();
  }, []);
  const NUMBER_OF_INGREDIENTS = 12;

  const drinksByIngredient = (ingredient) => {
    dispatch(filterDrinksByIngrendient(ingredient));
    if (path.includes('/bebidas')) {
      history.push('/bebidas');
    }
  };
  return (
    <ContainerDefault title="Explorar Ingredientes">
      {
        isLoading ? <Loading /> : (
          <div
            className="d-flex flex-row flex-wrap
            align-items-center justify-content-center"
          >
            {useingredient.map(({ strIngredient1 }, index) => (
              index < NUMBER_OF_INGREDIENTS ? (
                <Card
                  className="card mb-3"
                  border="primary"
                  data-testid={ `${index}-ingredient-card` }
                  key={ index }
                  onClick={ () => drinksByIngredient(strIngredient1) }
                >
                  <Card.Img
                    variant="top"
                    className="card-img"
                    data-testid={ `${index}-card-img` }
                    alt={ strIngredient1 }
                    src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                  />
                  <Card.Body
                    className="card-body-custom d-flex align-items-center
                    justify-content-center"
                  >
                    <Card.Title
                      className="text-center m-0 h6"
                      data-testid={ `${index}-card-name` }
                    >
                      {strIngredient1 }
                    </Card.Title>
                  </Card.Body>
                </Card>
              ) : null))}
          </div>
        )
      }
    </ContainerDefault>
  );
}

export default ExploreDrinksByIngredient;
