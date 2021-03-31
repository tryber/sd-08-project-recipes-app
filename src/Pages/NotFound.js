import React from 'react';
import PropTypes from 'prop-types';
import '../styles/NotFound.css';

function NotFound({ history }) {
  return (
    <div className="not-found-body">
      <div className="message">
        <h1>404</h1>
        <p className="not-found">Not Found</p>
        <p>a página que você procura não foi encontrada</p>
        <button type="button" onClick={ history.goBack }>voltar</button>
      </div>
    </div>
  );
}

NotFound.propTypes = {
  history: PropTypes.shape(PropTypes.any).isRequired,
};

export default NotFound;
