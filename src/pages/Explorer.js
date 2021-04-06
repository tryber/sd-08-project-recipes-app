import { Grid } from '@material-ui/core';
import React from 'react';
import ButtonLink from '../components/ButtonLink';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Explorer = () => (
  <div>
    <Header
      name="Explorar"
      foodClass="explorer"
      Show={ false }
    />
    <Grid className="Button-explorer">
      <ButtonLink
        LinkT="/explorar/comidas"
        name="Explorar Comidas"
        className="SizeUp"
        size="large"
        variant="contained"
        color="secondary"
        href="#contained-buttons"
        type="button"
        datatest="explore-food"
      />
      <ButtonLink
        LinkT="/explorar/bebidas"
        name="Explorar Bebidas"
        className="SizeUp"
        size="large"
        variant="contained"
        color="primary"
        type="button"
        datatest="explore-drinks"
      />
    </Grid>
    <Footer
      foodClass="explorer-footer"
    />
  </div>
);

export default Explorer;
