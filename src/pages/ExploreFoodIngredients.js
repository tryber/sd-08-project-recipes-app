import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';

import Header from '../components/Header';

export default class ExploreFoodIngredients extends Component {
  constructor() {
    super();
    this.state = {
      resultados: [],
    };
    this.listaIngredientes = this.listaIngredientes.bind(this);
  }

  componentDidMount() {
    this.listaIngredientes();
  }

  async listaIngredientes() {
    // const { history } = this.props;
    const req = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const results = await req.json();
    console.log(results);
    // history.push(`/comidas/${results.meals[0].idMeal}`);
    this.setState({ resultados: results });
  }

  render() {
    const { resultados } = this.state;
    console.log(resultados.meals, 'wsedg');
    // const { history } = this.props;
    const values = {
      name: 'Explorar Ingredientes',
      url: {
        byIngredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
        byName: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
        byFirstLetter: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
      },
    };

    return (
      <div>
        <Header params={ values } />
        {resultados.meals && resultados.meals.length
        && resultados.meals.map((item, index) => {
          const TOTAL_ITEMS = 12;
          if (index >= TOTAL_ITEMS) {
            return null;
          }
          return (
            <button
              key={ item.idIngredient }
              type="button"
              data-testid={ `${index}-ingredient-card` }
              className="card"
            >
              <img
                data-testid={ `${index}-card-img` }
                alt="ingredient"
                src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
              />
              <span data-testid={ `${index}-card-name` }>{item.strIngredient}</span>
            </button>
          );
        })}
        <Footer />
      </div>
    );
  }
}

ExploreFoodIngredients.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

ExploreFoodIngredients.defaultProps = {
  history: undefined,
};
