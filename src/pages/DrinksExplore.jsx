import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Button from '../components/Button';
import { requestRandomDrink } from '../services/requestDrinksAPI';

function DrinksExplore() {
  const history = useHistory();
  const getRandonDrink = async () => {
    const idDrink = await requestRandomDrink();
    return idDrink;
  };

  const handleClick = async () => {
    const id = await getRandonDrink();
    history.push(`/bebidas/${id}`);
  };

  return (
    <>
      <Header label="Explorar Bebidas" Search={ () => '' } />
      <br />
      <br />
      <br />
      <section className="explorar">
        <Link to="/explorar/bebidas/ingredientes">
          <Button
            name="Por Ingredientes"
            data-testid="explore-by-ingredient"
            className="btn btn-warning"
          />
        </Link>
        <Button
          className="btn btn-warning"
          name="Me Surpreenda!"
          onClick={ handleClick }
          data-testid="explore-surprise"
        />
      </section>
      <Footer />
    </>
  );
}

export default DrinksExplore;
