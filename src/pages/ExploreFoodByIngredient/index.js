import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import ContainerDefault from '../../components/ContainerDefault';
import Loading from '../../components/Loading';
import { filterMealsByIngrendient } from '../../redux/actions';
import { fetchIngredient } from '../../services/theMeadlDB';
import './styles.css';

function ExploreFoodByIngredient() {
  const [useingredient, setIngredient] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const apiIngredient = async () => {
      setIsLoading(true);
      const ingred = await fetchIngredient();
      setIngredient(ingred);
      setIsLoading(false);
    };
    apiIngredient();
  }, []);

  const mealsByIngredient = (ingredient, e) => {
    e.preventDefault();
    dispatch(filterMealsByIngrendient(ingredient));
    history.push('/comidas');
  };
  const numberIngredient = 12;
  return (
    <ContainerDefault title="Explorar Ingredientes">
      {
        isLoading ? <Loading /> : (
          <div
            className="d-flex flex-row flex-wrap
            align-items-center justify-content-center"
          >
            {useingredient.map(({ strIngredient }, index) => (index < numberIngredient ? (
              <Card
                className="card mb-3"
                border="primary"
                data-testid={ `${index}-ingredient-card` }
                key={ index }
                onClick={ (e) => mealsByIngredient(strIngredient, e) }
              >
                <Card.Img
                  variant="top"
                  className="card-img"
                  data-testid={ `${index}-card-img` }
                  alt={ strIngredient }
                  src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                />
                <Card.Body
                  className="card-body-custom d-flex align-items-center
                    justify-content-center"
                >
                  <Card.Title
                    data-testid={ `${index}-card-name` }
                    className="text-center m-0 h6"
                  >
                    {strIngredient}
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

export default ExploreFoodByIngredient;
