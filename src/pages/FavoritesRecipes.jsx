import React from 'react';
import Layout from '../components/Layout';

function FavoritesRecipes() {
  return (
    <Layout label="Receitas Favoritas" Search={ () => '' }>
      <section className="content">
        Receitas Favoritas
      </section>
    </Layout>
  );
}

export default FavoritesRecipes;
