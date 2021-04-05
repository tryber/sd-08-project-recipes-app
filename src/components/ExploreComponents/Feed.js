import React from 'react';
import { Link } from 'react-router-dom';

function Feed() {
  return (
    <main className="explore-container">
      <Link
        className="explore__button"
        data-testid="explore-food"
        to="/explorar/comidas"
      >
        Explorar Comidas
      </Link>
      <Link
        className="explore__button"
        data-testid="explore-drinks"
        to="/explorar/bebidas"
      >
        Explorar Bebidas
      </Link>
    </main>
  );
}

export default Feed;
