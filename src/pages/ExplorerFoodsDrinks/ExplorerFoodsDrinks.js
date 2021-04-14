import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './explorerFoodsDrinks.css';

const FoodsAndDrinks = ({ title, visible }) => {
  const history = useHistory();
  const [areaVisible, setAreaVisible] = useState(true);
  const [retrieveFoodOrDrink, setRetrieveFoodOrDrink] = useState();
  useEffect(() => {
    if (title === 'Explorar Bebidas') {
      setAreaVisible(false);
      fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php').then(data=>data.json()).then(result=>setRetrieveFoodOrDrink(result))
    }else{
      fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(data=>data.json()).then(result=>setRetrieveFoodOrDrink(result))
    }
  
  }, []);
  const redirectToIgredients = () => {
    if (title === 'Explorar Comidas') {
      history.push(`/explorar/comidas/ingredientes`);
    } else if (title === 'Explorar Bebidas') {
      history.push(`/explorar/bebidas/ingredientes`);
    }
  };
  const redirectToRandom = ()=>{
    if(title === 'Explorar Comidas'){
    const {meals} = retrieveFoodOrDrink
  history.push(`/comidas/${meals[0].idMeal}`)
    }else{
      const {drinks} = retrieveFoodOrDrink
      history.push(`/bebidas/${drinks[0].idDrink}`)
    }
  }

  console.log(retrieveFoodOrDrink)
  return (
    <div className="explorer-foods-drinks">
      <Header title={title} visible={visible} />
      <button
        className="btn btn-danger"
        data-testid="explore-by-ingredient"
        onClick={() => redirectToIgredients()}
      >
        Por Ingredientes
      </button>
      {areaVisible && (
        <button className="btn btn-danger" data-testid="explore-by-area" onClick={()=>history.push('/explorar/comidas/area')}>
          Por Local de Origem
        </button>
      )}
      <button className="btn btn-danger" data-testid="explore-surprise" onClick={()=>redirectToRandom()}>
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
};
FoodsAndDrinks.defaultProps = {
  visible: true,
};
FoodsAndDrinks.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool,
};
export default FoodsAndDrinks;
