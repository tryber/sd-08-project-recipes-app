import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './explorer.css';

const Explorer = ({ title, visible }) => {
  const redirectToExplore = (type) => {
    history.push(`/explorar/${type}`);
  };
  const history = useHistory();
  return (
    <div className="explorer-page">
      <Header title={title} visible={visible} />
      <button
        className="btn btn-danger"
        data-testid="explore-food"
        onClick={() => redirectToExplore('comidas')}
      >
        Explorar Comidas
      </button>
      <button
        className="btn btn-danger"
        data-testid="explore-drinks"
        onClick={() => redirectToExplore('bebidas')}
      >
        Explorar Bebidas
      </button>
      <Footer />
    </div>
  );
};
Explorer.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Explorer;
