import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';

function UserProvider({ children }) {
  const [password, setPassword] = useState('');
  const handlePassword = ({ target }) => setPassword(target.value);

  const provide = {
    values: {
      password,
    },
    functions: {
      handlePassword,
    },
  };
  return (
    <UserContext.Provider value={ provide }>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
