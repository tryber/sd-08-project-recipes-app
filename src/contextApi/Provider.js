import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Login({ children }) {
  const [email, setEmail] = useState('bla');
  const [password, setPassword] = useState();
  const [searchBar, setSearchBar] = useState(false);
  const [results, setResults] = useState([]);
  const [productDetails, setProductDetails] = useState(
    {object: "",
    isLoading: false,
})
  const [all, setALL] = useState([]);
  const [inProgressRecipes, setProgressRecipes] = useState({
    cocktails: {},
    meals: {}
  })

  const saveToLocalStorage = () => {
    const localOBJ = { email };
    localStorage.setItem('user', JSON.stringify(localOBJ));
  };

  const OBJVALUE = {
    setEmail,
    email,
    setPassword,
    password,
    saveToLocalStorage,
    searchBar,
    setSearchBar,
    results,
    setResults,
    productDetails,
    setProductDetails,
    all,
    setALL,
    inProgressRecipes,
    setProgressRecipes,
  };
  return <Context.Provider value={ OBJVALUE }>{children}</Context.Provider>;
}

Login.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Login;
