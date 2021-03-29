import React from 'react';
import './Search.css';

function Search() {
  return (
    <div className="search-container">
      <form>
        <input type="text" className="input-search" data-testid="search-input" />
        <section className="radio">
          <label htmlFor="ing">
            Ingredientes:
            <input
              data-testid="ingredient-search-radio"
              type="radio"
              value="ing"
              name="filter"
              id="ing"
            />
          </label>
          <label htmlFor="name">
            Nome:
            <input
              data-testid="name-search-radio"
              type="radio"
              value="Nome"
              name="filter"
              id="name"
            />
          </label>
          <label htmlFor="first">
            Primeira Letra:
            <input
              data-testid="first-letter-search-radio"
              type="radio"
              value="fisrt"
              id="first"
              name="filter"
            />
          </label>
        </section>
        <button data-testid="exec-search-btn" type="submit">Buscar</button>
      </form>
    </div>
  );
}

export default Search;
