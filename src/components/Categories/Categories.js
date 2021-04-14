import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  getCategories,
  getFilterCategories,
  getAllRecipes,
} from '../../services/FoodsDrinksRequests';
import Context from '../../contextApi/Context';
import './categories.css';

const Categories = ({ title }) => {
  const [categories, setCategories] = useState([2]);
  const [toogle, setToggle] = useState(true);
  const [text, setText] = useState();

  const { setResults, all } = useContext(Context);

  useEffect(() => {
    getCategories(title).then((response) => setCategories(response));
  }, [title]);

  const filtro = ({ target }) => {
    setText(target.value);
    if (toogle === true || text !== target.value) {
      getFilterCategories(title, target.value).then((response) =>
        setResults(response),
      );
      setToggle(false);
    } else {
      getAllRecipes(title).then((response) => {
        setResults(response);
        setToggle(true);
      });
    }
  };

  return (
    <div>
      {categories.length > 0 && (
        <section className="btn-categories">
          <button
            className="btn btn-danger"
            type="button"
            data-testid="All-category-filter"
            onClick={() => setResults(all)}
          >
            All
          </button>
          {categories.map((category, index) => (
            <button
              className="btn btn-danger"
              key={index}
              type="button"
              data-testid={`${category.strCategory}-category-filter`}
              value={category.strCategory}
              onClick={(e) => filtro(e)}
            >
              {category.strCategory}
            </button>
          ))}
        </section>
      )}
    </div>
  );
};
Categories.propTypes = { title: PropTypes.string.isRequired };
export default Categories;
