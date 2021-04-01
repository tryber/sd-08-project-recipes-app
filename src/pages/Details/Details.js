import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getMeal from '../../services/requestMealForId';
import getDrink from '../../services/RequestDrinkForId';
import CardDetails from '../../components/CardDetail/CardDetail';
import Context from '../../contextApi/Context';
import Button from 'react-bootstrap/Button';
import ListIngredients from '../../components/ListIngredients/ListIngredients';

const Details = ({ title, match, history }) => {
  const {
    params: { id },
  } = match;

  const { setProductDetails } = useContext(Context);

  const [object, setObject] = useState({});
  const [isLoading, setLoad] = useState(false);

  const getMealOrDrink = async () => {
    if (title === 'Comidas') {
      const meal = await getMeal(id);
      console.log(meal);
      return meal;
    }
    const drink = await getDrink(id);
    console.log(drink);
    return drink;
  };

  useEffect(() => {
    (async () => {
      setLoad(true);
      const mealOrDrink = await getMealOrDrink();
      setObject(mealOrDrink);
      setLoad(false);
    })();
  }, []);

  const handleClick = () => {
    setProductDetails({ object: object, isLoading: isLoading });
    if (title === 'Comidas') {
      history.push(`/comidas/${id}/in-progress`);
    } else {
      history.push(`/bebidas/${id}/in-progress`);
    }
  };

  // De repente eu tenha que colocar o load aqui, por causa do botão
  return (
    <>
      <CardDetails title={title} object={object} isLoading={isLoading}>
        <ListIngredients object={object} />
      </CardDetails>
      <Button
        className="btn-recipe btn btn-primary w-100"
        data-testid="start-recipe-btn"
        onClick={handleClick}
      >
        Iniciar receita
      </Button>
    </>
  );
};

Details.propTypes = {
  title: PropTypes.string.isRequired,
  object: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default Details;
