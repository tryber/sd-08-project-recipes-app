import React from 'react';
import Layout from '../components/Layout';

function ExploreFoodsByIngredients() {
  return (
    <Layout label="Explorar Ingredientes" Search={ () => '' }>
      <section className="content">
        Explorar Ingredientes
      </section>
    </Layout>
  );
}

export default ExploreFoodsByIngredients;
