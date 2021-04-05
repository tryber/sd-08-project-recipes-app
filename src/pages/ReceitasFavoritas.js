import copy from 'clipboard-copy';
import React, { Component } from 'react';
import DoneAndFavoriteCards from '../components/DoneAndFavoriteCards';
import FilterButtons from '../components/FilterButtons';
import HeaderLocation from '../components/Header';

class ReceitasFavoritas extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      filter: 'all',
      displayShareMesage: false,
    };
    this.share = this.share.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.updateFavoriteItems = this.updateFavoriteItems.bind(this);
  }

  componentDidMount() {
    this.updateFavoriteItems();
  }

  updateFavoriteItems() {
    const list = JSON.parse(localStorage.getItem('favoriteRecipes'));
    this.setState({ recipes: list });
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
    const { filter, displayShareMesage, recipes } = this.state;
    return (
      <div>
        <HeaderLocation />
        <FilterButtons changeFilter={ this.changeFilter } />

        { displayShareMesage ? <p className="alert">Link copiado!</p> : <div />}
        <DoneAndFavoriteCards
          recipes={ recipes }
          filter={ filter }
          share={ this.share }
          updateFavoriteItems={ this.updateFavoriteItems }
        />
      </div>
    );
  }
}

export default ReceitasFavoritas;
