import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { getFilterByArea } from '../../services/FoodsDrinksRequests';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './explorerByArea.css';
import Form from 'react-bootstrap/Form'

const ExplorerByArea = ({ title }) => {
  const [categories, setCategories] = useState();
  const [filterArea, setFilterArea] = useState();
  const history = useHistory();
  const [valor, setValor] = useState('Canadian');

  useEffect(() => {
    getFilterByArea().then((data) => setCategories([...data, {strArea: "All"}]));
  }, []);

  useEffect(() => {

    const getCategories = () => {
      if (valor && valor !== "All") {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${valor}`)
          .then((data) => data.json())
          .then(({ meals }) => setFilterArea(meals));
      } else {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
          .then((data) => data.json())
          .then(({ meals }) => setFilterArea(meals));
      }
    };
    getCategories();
  }, [valor]);

  const redirectToFood = (id) => {
    const { push } = history;
    push(`/comidas/${id}`);
  };

  return (
    <>
      <Header title={title} />
      <Form.Control
        as="select"
        custom
        className="list-select"
        data-testid="explore-by-area-dropdown"
        onChange={(e) => setValor(e.target.value)}
      >
        {categories &&
          categories.map(({ strArea }, index) => {
            return (
              <option data-testid={`${strArea}-option`} key={index}>
                {strArea}
              </option>
            );
          })}
      </Form.Control>
      <div className="list-area">
      {filterArea &&
        filterArea.map(({ idMeal, strMeal, strMealThumb }, index) => {
          if (index < 12) {
            return (
              
                <button onClick={() => redirectToFood(idMeal)} key={index}>
                  <Card data-testid={`${index}-recipe-card`}>
                    <Card.Img
                      data-testid={`${index}-card-img`}
                      variant="top"
                      src={strMealThumb}
                    />
                    <Card.Body>
                      <Card.Title data-testid={`${index}-card-name`}>
                        {strMeal}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </button>
            );
          }
        })}
      </div>
      <Footer />
    </>
  );
};
ExplorerByArea.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ExplorerByArea;
