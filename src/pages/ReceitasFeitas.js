import React, { Component } from 'react';
import copy from 'clipboard-copy';
import HeaderLocation from '../components/Header';
import FilterButtons from '../components/FilterButtons';
import DoneAndFavoriteCards from '../components/DoneAndFavoriteCards';

class ReceitasFeitas extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [
        {
          id: '52771',
          type: 'comida',
          area: 'Italian',
          category: 'Vegetarian',
          alcoholicOrNot: '',
          name: 'Spicy Arrabiata Penne',
          image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
          doneDate: '23/06/2020',
          tags: ['Pasta', 'Curry'],
        },
        {
          id: '178319',
          type: 'bebida',
          area: '',
          category: 'Cocktail',
          alcoholicOrNot: 'Alcoholic',
          name: 'Aquamarine',
          image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
          doneDate: '23/06/2020',
          tags: [],
        },
      ],
      filter: 'all',
      displayShareMesage: false,
    };
    this.share = this.share.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
  //   this.APIbebidas = this.APIbebidas.bind(this);
  //   this.twelveCards = this.twelveCards.bind(this);
  // }
  }

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
