import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import Context from '../context/Context';

import '../styles/HeaderPS.css';

const radioSearchOptions = [
  ['ingredient', 'Ingrediente', 'i'],
  ['name', 'Nome', 's'],
  ['first-letter', 'Primeira letra', 'f'],
];

const HeaderPS = ({ title, endpoint }) => {
  const {
    inputText,
    setInputText,
    radioValue,
    setRadioValue,
    requestApiData,
    setToggle,
  } = useContext(Context);

  const [data, setData] = useState('');
  const [open, setOpen] = useState('collapse');

  function handleClick(e) {
    e.preventDefault();
    setToggle(false);
    return (radioValue === 'f' && inputText.length !== 1)
      ? alert('Sua busca deve conter somente 1 (um) caracter')
      : requestApiData(endpoint);
  }

  return (
    <div>
      <div className="navbar headerPS">
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile"
          />
        </Link>
        <h1 data-testid="page-title">{ title }</h1>
        <a
          data-toggle="collapse"
          href="#collapseInput"
          role="button"
          aria-expanded="false"
          aria-controls="collapseInput"
          onClick={ () => {
            setData(data === '' ? 'search-input' : '');
            setOpen(open === 'collapse' ? 'collapse.show' : 'collapse');
          } }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search"
          />
        </a>
      </div>
      <div>
        <div className={ open }>
          <hr />
          <div className="one-headerps">
            <input
              type="text"
              data-testid={ data }
              placeholder="Buscar Receita"
              onChange={ (e) => setInputText(e.target.value) }
              value={ inputText }
              className="input-headerps"
            />
          </div>
          <div className="two-headerps">
            { radioSearchOptions.map((option) => (
              <label
                key={ option[0] }
                htmlFor={ option[0] }
                className="label-radio-headerps"
              >
                <input
                  checked={ radioValue === option[2] }
                  data-testid={ `${option[0]}-search-radio` }
                  id={ option[0] }
                  name="search-radio"
                  type="radio"
                  onChange={ (e) => setRadioValue(e.target.value) }
                  value={ option[2] }
                  className="input-radio-headerps"
                />
                { option[1] }
              </label>
            )) }
          </div>
          <div className="three-headerps">
            <button
              data-testid="exec-search-btn"
              onClick={ handleClick }
              type="submit"
              className="btn-headerps"
            >
              Buscar
            </button>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

HeaderPS.propTypes = {
  title: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default HeaderPS;
