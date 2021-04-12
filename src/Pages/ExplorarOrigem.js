import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Form } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import { fetchItem } from '../store/apiSlice';
import { fetchCategories } from '../store/apiCategoriesSlice';
import CardItens from './Card';

const FETCH_ALL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

function ExplorarOrigem() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories('https://www.themealdb.com/api/json/v1/1/list.php?a=list'));
    dispatch(fetchItem(FETCH_ALL));
  }, [dispatch]);
  const loadingAPI = useSelector((state) => state.api.loading);
  const loadingCategoriesAPI = useSelector((state) => state.categoriesButton.loading);
  const foodsArray = useSelector((state) => state.api.data.meals);
  const areaCategories = useSelector((state) => state.categoriesButton.categories.meals);

  const fecthArea = (area) => {
    if (area === 'All') {
      dispatch(fetchItem(FETCH_ALL));
    } else {
      dispatch(fetchItem(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`));
    }
  };

  if (loadingAPI === 'fulfilled' && loadingCategoriesAPI === 'fulfilled' && foodsArray) {
    const foodsNew = [...foodsArray];
    foodsNew.length = 12;
    const areaCategoriesNew = [...areaCategories];
    areaCategoriesNew.push({ strArea: 'All' });
    return (
      <>
        <Header title="Explorar Origem" />
        <Container fluid>
          <Row style={ { justifyContent: 'space-around' } }>
            <Form>
              <Form.Control
                as="select"
                onChange={ (e) => fecthArea(e.target.value) }
                data-testid="explore-by-area-dropdown"
              >
                { areaCategoriesNew.map((area, index) => (
                  <option
                    key={ index }
                    data-testid={ `${area.strArea}-option` }
                    value={ area.strArea }
                  >
                    {area.strArea}
                  </option>
                ))}
              </Form.Control>
            </Form>
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

  // if ((foodsArray === null && loadingAPI === 'fulfilled')
  //   || loadingAPI === 'rejected') {
  //   alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  // }

  return (
    <>
      <Header title="Comidas" />
      <h2>Carregando...</h2>
      <Footer />
    </>
  );
}

export default ExplorarOrigem;
