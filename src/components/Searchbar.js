/* eslint-disable no-alert */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Paper, Grid, RadioGroup, Button } from '@material-ui/core';
import InputText from './InputText';
import InputRadio from './InputRadio';
import { Context } from '../context';
import getApiData from '../services/apiRequest';
import './Search.css';
import useVerifyNoOrSingleDish from '../hooks';

const Searchbar = ({ type }) => {
  const history = useHistory();
  const { apiData } = useContext(Context);
  const [radioValue, setRadioValue] = useState('filter.php?i=');
  const [search, setSearch] = useState('');
  const [shouldAlert, setShouldAlert] = useState(false);

  const dishType = type === 'food' ? 'meals' : 'drinks';
  const searchBtnClass = type === 'food' ? 'search-btn food-search'
    : 'search-btn drink-search';
  const radioClass = type === 'food' ? '' : 'radio-search-drink';
  const radioColor = type === 'food' ? 'secondary' : 'primary';

  const radioChange = (evt) => {
    setRadioValue(evt.target.value);
  };

  useEffect(() => {
    if (search.length > 1 && radioValue === 'search.php?f=') {
      setShouldAlert(true);
    } else {
      setShouldAlert(false);
    }
  }, [search, radioValue, setShouldAlert]);

  const handleSearch = () => {
    if (shouldAlert) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      getApiData(type, `${radioValue}${search}`)
        .then((data) => apiData.set(data));
    }
  };

  useVerifyNoOrSingleDish(apiData.value, dishType, history);

  return (
    <Paper elevation={ 10 } variant="elevation">
      <Grid container component="form" className="search-bar" direction="column">
        <InputText
          fullWidth
          id="Search"
          label="Search"
          size="small"
          name="search-input"
          variant="filled"
          value={ search }
          updateState={ setSearch }
        />
        <RadioGroup
          aria-label="search-type"
          value={ radioValue }
          onChange={ radioChange }
          row
          className="search-radio-group"
        >
          <InputRadio
            name="ingredient-search-radio"
            value="filter.php?i="
            label="Ingrediente"
            color={ radioColor }
            classes={ radioClass }
          />
          <InputRadio
            name="name-search-radio"
            value="search.php?s="
            label="Nome"
            color={ radioColor }
            classes={ radioClass }
          />
          <InputRadio
            name="first-letter-search-radio"
            value="search.php?f="
            label="Primeira letra"
            color={ radioColor }
            classes={ radioClass }
          />
        </RadioGroup>
        <Button
          type="button"
          variant="contained"
          className={ searchBtnClass }
          data-testid="exec-search-btn"
          onClick={ handleSearch }
        >
          Search
        </Button>
      </Grid>
    </Paper>
  );
};

Searchbar.propTypes = {
  type: PropTypes.string,
};

Searchbar.defaultProps = {
  type: 'food',
};

export default Searchbar;
