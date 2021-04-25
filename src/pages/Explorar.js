import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderLocation from '../components/Header';

class Explorar extends Component {
  render() {
    return (
      <div>
        <HeaderLocation title="Explorar" />
        <div>
          <Link
            data-testid="explore-food"
            to="/explorar/comidas"
          >
            Explorar Comidas
          </Link>
          <Link
            data-testid="explore-drinks"
            to="/explorar/bebidas"
          >
            Explorar Bebidas
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Explorar;
