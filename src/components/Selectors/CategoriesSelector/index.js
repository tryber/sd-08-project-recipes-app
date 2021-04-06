/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../../context';
import getApiData,
{ EpAllRecipes, EpCategories, EpRecipesByCategory } from '../../../services/apiRequest';
import './styles.css';
import ActiveButtons from '../../../lib/ActiveButtons';

const CategoriesSelector = ({ recipeType }) => {
  const { apiCategories, filteredRecipes, apiData } = useContext(Context);
  const [currentFilter, setCurrentFilter] = useState('');
  const handleActiveButtons = new ActiveButtons('.selector-grid', recipeType);

  useEffect(() => {
    getApiData(recipeType, EpCategories).then((data) => { apiCategories.set(data); });

    handleActiveButtons.init();

    return () => { apiCategories.set([]); };
  }, []);

  const handleClick = (e) => {
    if (e.target.textContent === currentFilter || e.target.textContent === 'All') {
      setCurrentFilter('');
      getApiData(recipeType, EpAllRecipes).then((data) => {
        apiData.set(data);
      });
      filteredRecipes.set([]);
    } else {
      setCurrentFilter(e.target.textContent);
      getApiData(recipeType, EpRecipesByCategory, e.target.textContent)
        .then((data) => apiData.set(data));
    }
    handleActiveButtons.onClick(e);
  };

  const CATEGORIES_AMOUNT = 5;

  return (
    <Grid container spacing={ 1 } className="selector-grid">
      <Grid item xs={ 4 } sm={ 2 }>
        <Button
          variant="contained"
          fullWidth
          value="All"
          onClick={ handleClick }
          data-testid="All-category-filter"
          size="small"
          className={ recipeType === 'drink' ? 'drink-button' : '' }
        >
          All
        </Button>
      </Grid>
      {apiCategories.value && apiCategories.value.slice(0, CATEGORIES_AMOUNT)
        .map(({ strCategory }) => (
          <Grid item key={ strCategory } xs={ 4 } sm={ 2 }>
            <Button
              variant="contained"
              fullWidth
              key={ strCategory }
              value={ strCategory }
              onClick={ handleClick }
              data-testid={ `${strCategory}-category-filter` }
              size="small"
              className={ recipeType === 'drink' ? 'drink-button' : '' }
            >

              {strCategory}

            </Button>
          </Grid>
        ))}

    </Grid>

  );
};

CategoriesSelector.propTypes = {
  recipeType: PropTypes.string.isRequired,
};

export default CategoriesSelector;
