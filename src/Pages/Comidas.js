import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import { fetchItem } from '../store/apiSlice';
import { fetchCategories } from '../store/apiCategoriesSlice';
import CardItens from './Card';

const PRIMEIRO = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

function Comidas() {
  const name = useSelector((state) => state.api.explore);
  const SEGUNDO = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories('https://www.themealdb.com/api/json/v1/1/list.php?c=list'));
    dispatch(fetchItem(name === '' ? PRIMEIRO : SEGUNDO));
  }, [dispatch, SEGUNDO, name]);
  const loadingAPI = useSelector((state) => state.api.loading);
  const loadingCategoriesAPI = useSelector((state) => state.categoriesButton.loading);
  const foodsArray = useSelector((state) => state.api.data.meals);
  const foodCategories = useSelector((state) => state.categoriesButton.categories.meals);
  const [value, setValue] = useState('5');
  const history = useHistory();
  const isSearching = useSelector((state) => state.search.isSearching);

  if (loadingAPI === 'fulfilled' && loadingCategoriesAPI === 'fulfilled' && foodsArray) {
    if (foodsArray.length === 1 && isSearching === true) {
      history.push(`/comidas/${foodsArray[0].idMeal}`);
    }
    const foodsNew = [...foodsArray];
    foodsNew.length = 12;
    const foodCategoriesNew = [...foodCategories];
    foodCategoriesNew.length = 5;
    return (
      <>
        <Header title="Comidas" />
        <Container fluid>
          <Row style={ { justifyContent: 'space-around' } }>
            { foodCategoriesNew.map((categories, index) => (
              <Button
                style={ { margin: '10px 0px', borderRadius: '5px' } }
                key={ index }
                variant="secondary"
                value={ index }
                data-testid={ `${categories.strCategory}-category-filter` }
                onClick={ (e) => {
                  if (e.target.value !== value) {
                    dispatch(fetchItem(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories.strCategory}`));
                    setValue(e.target.value);
                  } else if (e.target.value === value) {
                    dispatch(fetchItem(PRIMEIRO));
                    setValue('5');
                  }
                } }
              >
                {categories.strCategory}
              </Button>
            )) }
            <Button
              variant="secondary"
              style={ { margin: '10px 0px', borderRadius: '5px' } }
              onClick={ () => dispatch(fetchItem(PRIMEIRO)) }
              data-testid="All-category-filter"
            >
              All
            </Button>
          </Row>
        </Container>
        <Container fluid style={ { marginBottom: '80px' } }>
          <Row style={ { justifyContent: 'space-around' } }>
            { foodsNew
              .map((food, index) => (
                <CardItens
                  key={ index }
                  index={ index }
                  name={ food.strMeal }
                  image={ food.strMealThumb }
                  id={ food.idMeal }
                  food="true"
                />
              )) }
          </Row>
        </Container>
        <Footer />
      </>
    );
  }

  if ((foodsArray === null && loadingAPI === 'fulfilled')
    || loadingAPI === 'rejected') {
    // eslint-disable-next-line no-alert
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return (
    <>
      <Header title="Comidas" />
      <h2>Carregando...</h2>
      <Footer />
    </>
  );
}

export default Comidas;
