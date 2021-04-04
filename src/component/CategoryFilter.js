import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Context from '../context/Context';
import StyledCategoryFilter from '../styles/component/CategoryFilter';

const SHOW_FIVE_CATEGORIES = 6;

export default function CategoryFilter() {
  const { categories, setSearchParams,
    searchParams: { searchInput } } = useContext(Context);
  const history = useHistory();
  const [categoriesToRender, setCategoriesToRender] = useState([]);

  useEffect(() => {
    setCategoriesToRender([...categories].slice(0, SHOW_FIVE_CATEGORIES));
  }, [categories, setCategoriesToRender]);

  const filterByCategory = (category) => {
    setSearchParams({
      searchInput: category,
      selectedParameter: (searchInput === category || category === 'All')
        ? 'none' : 'category',
      location: history.location.pathname,
    });
  };

  return (
    <StyledCategoryFilter>
      {categoriesToRender
        .map((category, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${category}-category-filter` }
            onClick={ () => filterByCategory(category) }
          >
            {category}
          </button>
        ))}
    </StyledCategoryFilter>
  );
}
