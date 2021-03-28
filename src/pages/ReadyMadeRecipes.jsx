import React from 'react';
import Layout from '../components/Layout';

function ReadyMadeRecipes() {
  return (
    <Layout label="Receitas Feitas" Search={ () => '' }>
      <section className="content">
        Receitas Feitas
      </section>
    </Layout>
  );
}

export default ReadyMadeRecipes;
