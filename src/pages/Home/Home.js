import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import Context from '../../contextApi/Context';
import List from '../../components/List/List';
import Footer from '../../components/Footer/Footer';
import Categories from '../../components/Categories/Categories';
import { getAllRecipes } from '../../services/FoodsDrinksRequests';
import './home.css'

const Home = ({ title }) => {
  const { searchBar, results, setResults, setALL } = useContext(Context);

  useEffect(() => {
    if (results.length === 0) {
      getAllRecipes(title).then((response) => {
        setResults(response);
        setALL(response);
      });
    }
  }, [title]);

  return (
    <>
      <Header title={title} />
      {searchBar && <SearchBar title={title} />}
      <Categories title={title} />
      {results && (
        <div className="list-recipes">
          <List title={title} results={results} />
        </div>
      )}
      <Footer />
    </>
  );
};
Home.propTypes = { title: PropTypes.string.isRequired };

export default Home;
