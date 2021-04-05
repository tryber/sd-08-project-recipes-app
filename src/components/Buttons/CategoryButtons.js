import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { showCompleteLists } from '../../services/api';

const CategoryButtons = ({ label, onClickAll, onClickCategory }) => {
  const [fullList, setFullList] = useState([]);
  const [firstFive, setFirstFive] = useState([]);
  useEffect(() => {
    async function getList() {
      const fetchList = await showCompleteLists('categories', label);
      setFullList(label.match(/drinks/i) ? fetchList.drinks : fetchList.meals);
    }
    getList();
  }, [label]);

  useEffect(() => {
    const STOP_ON_FIVE = 5;
    const checkFullList = () => {
      if (fullList.length > 0) {
        const mapping = fullList
          .filter((element, index) => index < STOP_ON_FIVE).map((element) => element);
        setFirstFive(mapping);
      }
    }; checkFullList();
  }, [fullList]);
  const renderButtons = firstFive.map(({ strCategory }) => (
    <button
      data-testid={ `${strCategory}-category-filter` }
      className="filter-btn"
      key={ `${strCategory} - key` }
      type="button"
      onClick={ onClickCategory }
      value={ strCategory }
    >
      {strCategory}
    </button>));

  return (
    <div>
      <button
        data-testid="All-category-filter"
        className="filter-btn"
        key="All - key"
        type="button"
        onClick={ onClickAll }
        value=""
      >
        All
      </button>
      {renderButtons}
    </div>
  );
};

CategoryButtons.propTypes = {
  label: PropTypes.string.isRequired,
  onClickAll: PropTypes.func.isRequired,
  onClickCategory: PropTypes.func.isRequired,
};

export default CategoryButtons;
