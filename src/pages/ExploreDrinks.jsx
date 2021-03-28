import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../components/Button';
import { requestRandomDrink } from '../services/requestDrinksAPI';
import Layout from '../components/Layout';

function ExploreDrinks() {
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
    <Layout label="Explorar Bebidas" Search={ () => '' }>
      <section className="content">
        <Link to="/explorar/bebidas/ingredientes">
          <Button name="Por Ingredientes" data-testid="explore-by-ingredient" />
        </Link>
        <Button
          name="Me Surpreenda!"
          onClick={ handleClick }
          data-testid="explore-surprise"
        />
      </section>
    </Layout>
  );
}

export default ExploreDrinks;
