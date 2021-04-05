import React from 'react';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();

  return (
    <div
      style={
        { alignItems: 'center',
          display: 'flex',
          flexFlow: 'column wrap',
          justifyContent: 'center',
          textAlign: 'center' }
      }
    >
      <h1>Not Found</h1>
      <img
        src="https://image.freepik.com/free-vector/404-error-page-found_41910-364.jpg"
        alt="not found"
      />
      <button
        style={
          { boxSizing:
         'content-box',
          marginTop: '10px',
          padding: '10px',
          textAlign: 'center' }
        }
        type="button"
        onClick={ () => history.push('/perfil') }
      >
        Clique aqui para retornar à página do perfil
      </button>
    </div>
  );
};

export default NotFound;
