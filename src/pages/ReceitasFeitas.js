import React, { Component } from 'react';
import copy from 'clipboard-copy';
import HeaderLocation from '../components/Header';
import FilterButtons from '../components/FilterButtons';
import DoneAndFavoriteCards from '../components/DoneAndFavoriteCards';

class ReceitasFeitas extends Component {
  constructor() {
    super();
    this.state = {
      filter: 'all',
      displayShareMesage: false,
    };
    this.share = this.share.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
  //   this.APIbebidas = this.APIbebidas.bind(this);
  //   this.twelveCards = this.twelveCards.bind(this);
  // }
  }

  componentDidMount() {
    this.getCards();
  }

  getCards() {
    const cards = JSON.parse(localStorage.getItem('doneRecipes'));
    this.setState({ recipes: cards });
  }
  // isDone() {
  //   const arr = [];
  //   const newArr = [];
  //   const arr2 = JSON.parse(localStorage.getItem('doneRecipes'));
  //   console.log(arr2);
  //   let area = '';
  //   let type = '';
  //   let alcoholicOrNot = '';
  //   let newObj = {};
  //   let image = '';
  //   for (let i = 0; i < arr2.length; i += 1) {
  //     if (!arr2[i].idMeal) {
  //       type = 'bebida';
  //       alcoholicOrNot = 'Alcoholic';
  //       image = arr2[i].strDrinkThumb;
  //     } else {
  //       type = 'comida';
  //       area = arr2[i].strArea;
  //       image = arr2[i].strMealThumb;
  //     }
  //     newObj = {
  //       id: arr2[i].idMeal || arr2[i].idDrink,
  //       area,
  //       alcoholicOrNot,
  //       category: arr2[i].strCategory,
  //       name: arr2[i].strMeal || arr2[i].strDrink,
  //       type,
  //       image,
  //       doneDate: '23/06/2020',
  //       tags: [arr2[i].strTags],
  //     };
  //     newArr.push(newObj);
  //     area = '';
  //     type = '';
  //     alcoholicOrNot = '';
  //     image = '';
  //   }
  //   console.log(newArr);
  // }

  changeFilter(type) {
    return this.setState({ filter: type });
  }

  share(obj) {
    const location = `http://localhost:3000/${obj.type}s/${obj.id}`;
    copy(location);
    const SHOW_TIME_MILISECONDS = 3000;
    this.setState({ displayShareMesage: true }, () => {
      setTimeout(() => this.setState(
        { displayShareMesage: false },
      ), SHOW_TIME_MILISECONDS);
    });
  }

  render() {
    const { displayShareMesage, recipes, filter } = this.state;
    return (
      <div>
        <HeaderLocation />
        <br />
        <br />
        <br />
        <FilterButtons changeFilter={ this.changeFilter } />
        { displayShareMesage ? <p className="alert">Link copiado!</p> : <div />}
        <DoneAndFavoriteCards
          recipes={ recipes }
          filter={ filter }
          share={ this.share }
        />
      </div>
    );
  }
}

export default ReceitasFeitas;
