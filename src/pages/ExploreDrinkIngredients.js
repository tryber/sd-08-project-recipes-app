import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';

import Header from '../components/Header';

export default class ExploreDrinkIngredients extends Component {
  constructor() {
    super();
    this.state = {
      resultados: [],
    };
    this.listaIngredientesBebidas = this.listaIngredientesBebidas.bind(this);
    this.clicar = this.clicar.bind(this);
  }

  componentDidMount() {
    this.listaIngredientesBebidas();
  }

  clicar() {
    const { history } = this.props;
    history.push('/bebidas');
  }

  async listaIngredientesBebidas() {
    const req = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const results = await req.json();
    console.log(results, 'sdvw');
    this.setState({ resultados: results });
  }

  render() {
    const { resultados } = this.state;
    console.log(resultados.drinks, 'wsedg');
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
        {resultados.drinks && resultados.drinks.length
        && resultados.drinks.map((item, index) => {
          const TOTAL_ITEMS = 12;
          if (index >= TOTAL_ITEMS) {
            return null;
          }
          return (
            <button
              key={ item.strIngredient1 }
              type="button"
              data-testid={ `${index}-ingredient-card` }
              className="card"
              onClick={ () => this.clicar() }
            >
              <img
                data-testid={ `${index}-card-img` }
                alt="ingredient"
                src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
              />
              <span data-testid={ `${index}-card-name` }>{item.strIngredient1}</span>
            </button>
          );
        })}
        <Footer />
      </div>
    );
  }
}

ExploreDrinkIngredients.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

ExploreDrinkIngredients.defaultProps = {
  history: undefined,
};
