import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default class ShowDoneRecipes extends Component {
  constructor() {
    super();

    this.state = {
      copied: {},
      doneRecipes: [],
    };

    this.copyRecipe = this.copyRecipe.bind(this);
    this.fetchDoneRecipes = this.fetchDoneRecipes.bind(this);
  }

  componentDidMount() {
    this.fetchDoneRecipes();
  }

  fetchDoneRecipes() {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) this.setState({ doneRecipes });
  }

  copyRecipe(id, type, index) {
    const { copied } = this.state;
    let pathUrl = '';
    if (type === 'comida') pathUrl = `/comidas/${id}`;
    if (type === 'bebida') pathUrl = `/bebidas/${id}`;
    const TWO_SECOND = 2000;
    copy(`http://localhost:3000${pathUrl}`);
    this.setState({
      copied: {
        ...copied,
        [index]: true,
      },
    }, () => {
      setTimeout(() => {
        this.setState({ copied: {
          ...copied,
          [index]: false,
        } });
      }, TWO_SECOND);
    });
  }

  render() {
    const { copied, doneRecipes } = this.state;
    return (
      <div>
        {doneRecipes && doneRecipes.map((item, index) => (
          <section key={ index }>
            <Link to={ `/${item.type}s/${item.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ item.image }
                width="200px"
                alt="Recipe Pic"
              />
            </Link>
            {item.alcoholicOrNot ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {item.alcoholicOrNot}
              </p>
            )
              : (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { `${item.area} - ${item.category}` }
                </p>
              )}
            <Link to={ `/${item.type}s/${item.id}` }>
              <h4 data-testid={ `${index}-horizontal-name` }>{item.name}</h4>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
            <button
              type="button"
              onClick={ () => this.copyRecipe(item.id, item.type, index) }
            >
              <img
                src={ shareIcon }
                data-testid={ `${index}-horizontal-share-btn` }
                alt="Share Icon"
              />
            </button>
            <button type="button">
              <img
                src={ blackHeartIcon }
                // data-testid={ `${index}-horizontal-share-btn` }
                alt="Favorite Icon"
              />
            </button>
            {copied[index] && <span>Link copiado!</span>}
            {item.tags && item.tags.map((tagName) => (
              <h5
                key={ tagName }
                data-testid={ `${index}-${tagName}-horizontal-tag` }
              >
                {tagName}
              </h5>
            ))}
          </section>
        ))}
      </div>
    );
  }
}
