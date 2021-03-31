import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import '../../styles/Explorar.css';

function Explorar() {
  return (
    <div>
      <Header title="Explorar" search={ false } />
      <div className="explorar-body">
        <Link to="/explorar/comidas">
          <div className="options food">
            <div className="button" data-testid="explore-food">Explorar Comidas</div>
          </div>
        </Link>
        <Link to="/explorar/bebidas">
          <div className="options drink">
            <div className="button" data-testid="explore-drinks">Explorar Bebidas</div>
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Explorar;
