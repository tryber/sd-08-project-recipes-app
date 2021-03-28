import React from 'react';
import Layout from '../components/Layout';
import SearchButton from '../components/SearchButton';

function ExploreFoodByLocalOrigin() {
  return (
    <Layout label="Explorar Origem" Search={ SearchButton }>
      <section className="content">
        Explorar Origem
      </section>
    </Layout>
  );
}

export default ExploreFoodByLocalOrigin;
