import React from 'react';
import PropTypes from 'prop-types';
import {
  Feed, Meals, Drinks, Ingredients, NotFound, Origin,
} from '../../components/ExploreComponents';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Explore({ history }) {
  const { location: { pathname } } = history;

  return (
    <>
      <Header history={ history } />
      {pathname === '/explorar' && <Feed />}
      {pathname === '/explorar/comidas' && <Meals path={ pathname } />}
      {pathname === '/explorar/bebidas' && <Drinks path={ pathname } />}
      {pathname === '/explorar/comidas/ingredientes' && <Ingredients path="comidas" />}
      {pathname === '/explorar/bebidas/ingredientes' && <Ingredients path="bebidas" />}
      {pathname === '/explorar/comidas/area' && <Origin />}
      {pathname === '/explorar/bebidas/area' && <NotFound />}
      <Footer />
    </>
  );
}

Explore.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Explore;
