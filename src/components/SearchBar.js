/* eslint-disable no-alert */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      array: [],
      input: '',
      radio: '',
      rotaComida: false,
      rotaBebida: false,
    };
    this.foodAPIngredientes = this.foodAPIngredientes.bind(this);
    this.change = this.change.bind(this);
    this.APIcomidas = this.APIcomidas.bind(this);
    this.APIbebidas = this.APIbebidas.bind(this);
    this.twelveCards = this.twelveCards.bind(this);
  }

  change(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  foodAPIngredientes() {
    const { location } = this.props;
    if (location.pathname === '/comidas') {
      this.APIcomidas();
    }
    if (location.pathname === '/bebidas') {
      this.APIbebidas();
    }
  }

  async APIcomidas() {
    const { radio, input } = this.state;
    const { geraRota, detalhes, history } = this.props;
    let endPoint;
    if (radio === 'ingredientes') {
      endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`;
    }
    if (radio === 'nome') {
      endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
    }
    if (radio === 'primeiraLetra') {
      if (input.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
      endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`;
    }
    const { meals } = await fetch(endPoint)
      .then((response) => response.json());
    if (meals !== null) {
      this.setState({ array: meals, rotaComida: true, rotaBebida: false });
    } else {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return [];
    }
    if (meals.length === 1) {
      geraRota(`/comidas/${meals[0].idMeal}`);
      detalhes(meals);
      history.push(`/comidas/${meals[0].idMeal}`);
    }
  }

  async APIbebidas() {
    const { radio, input } = this.state;
    const { geraRota, detalhes, history } = this.props;
    let endPoint;
    if (radio === 'ingredientes') {
      endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`;
    }
    if (radio === 'nome') {
      endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`;
    }
    if (radio === 'primeiraLetra') {
      if (input.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
      endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`;
    }
    // const { drinks } = await fetch(endPoint);
    const { drinks } = await fetch(endPoint)
      .then((response) => response.json());
    if (drinks !== null && drinks.length > 1) {
      this.setState({ array: drinks, rotaComida: false, rotaBebida: true });
    } if (drinks === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return [];
    }
    if (drinks.length === 1) {
      geraRota(`/bebidas/${drinks[0].idDrink}`);
      detalhes(drinks);
      history.push(`/bebidas/${drinks[0].idDrink}`);
    }
  }

  twelveCards(arr) {
    const newArr = [];
    const indiceMaximoParaRenderizarDozeCards = 11;
    const indiceMinino = 0;
    for (let i = indiceMinino; i <= indiceMaximoParaRenderizarDozeCards; i += 1) {
      if (arr[i] !== undefined) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  }

  render() {
    const { detalhes, geraRota, history } = this.props;
    const { array, rotaComida, rotaBebida } = this.state;
    const newArr = this.twelveCards(array);
    return (
      <div>
        <input
          type="text"
          data-testid="search-input"
          name="input"
          onChange={ (event) => this.change(event) }
        />
        <div>
          <input
            type="radio"
            name="radio"
            value="nome"
            data-testid="name-search-radio"
            onChange={ (event) => this.change(event) }
          />
          Nome
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="radio"
            value="ingredientes"
            onChange={ (event) => this.change(event) }
          />
          Ingrediente
          <input
            type="radio"
            name="radio"
            value="primeiraLetra"
            data-testid="first-letter-search-radio"
            onChange={ (event) => this.change(event) }
          />
          Primeira Letra
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ async () => this.foodAPIngredientes() }
        >
          Executar Pesquisa
        </button>
        {rotaComida ? (newArr.map((food, index) => (
          <div
            key={ food.idMeal }
            data-testid={ `${index}-recipe-card` }
            className="cards"
          >
            <div data-testid={ `${index}-card-name` }>{food.strMeal}</div>
            <button
              type="button"
              onClick={ () => {
                geraRota(`/comidas/${food.idMeal}`);
                detalhes(food);
                history.push(`/comidas/${food.idMeal}`);
              } }
            >
              <img
                src={ food.strMealThumb }
                data-testid={ `${index}-card-img` }
                alt="Imagem Do Elemento"
              />
            </button>
          </div>)))
          : <div />}
        {rotaBebida ? (newArr.map((drink, index) => (
          <div key="drink" data-testid={ `${index}-recipe-card` } className="cards">
            <div data-testid={ `${index}-card-name` }>{drink.strDrink}</div>
            <button
              type="button"
              onClick={ () => {
                geraRota(`/bebidas/${drink.idDrink}`);
                detalhes(drink);
                history.push(`/bebidas/${drink.idDrink}`);
              } }
            >
              <img
                src={ drink.strDrinkThumb }
                alt="Imagem Do Elemento"
                data-testid={ `${index}-card-img` }
              />
            </button>
          </div>))) : <div />}
      </div>

    );
  }
}

SearchBar.propTypes = {
  location: PropTypes.shape.isRequired,
  history: PropTypes.shape.isRequired,
  geraRota: PropTypes.func.isRequired,
  detalhes: PropTypes.func.isRequired,
};

const SearchBarLocation = withRouter(SearchBar);

const mapDispatchToProps = (dispatch) => ({
  geraRota: (rota) => dispatch({ type: 'GERA_ROTA', rota }),
  detalhes: (detalhes) => dispatch({ type: 'COMIDA_DETALHES', detalhes }),
  // bebida: (bebidaid) => dispatch({ type: 'BEBIDAS', bebidaid }),
});

export default connect(null, mapDispatchToProps)(SearchBarLocation);

// export default SearchBarLocation;
