import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './createContext';

function Login({ children }) {
  const [email, setEmail] = useState('bla');
  const [password, setPassword] = useState();

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
  };
  return (
    <Context.Provider value={ OBJVALUE }>
      {children}
    </Context.Provider>
  );
}

Login.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Login;
