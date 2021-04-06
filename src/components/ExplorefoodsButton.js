import React, { useContext } from 'react';
import { Grid, Button, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ButtonLink from './ButtonLink';
import { Context } from '../context';

const ExplorefoodsButton = () => {
  const history = useHistory();
  const { apiData } = useContext(Context);
  return (
    <div>
      <Grid className="Button-explorer">
        <ButtonLink
          LinkT="/explorar/comidas/ingredientes"
          name="Explorar Por Ingredientes"
          className="SizeUp"
          size="large"
          variant="contained"
          color="secondary"
          type="button"
          datatest="explore-by-ingredient"
        />

        <ButtonLink
          LinkT="/explorar/comidas/area"
          name="Por Local de Origem"
          className="SizeUp"
          size="large"
          variant="contained"
          color="secondary"
          href="#contained-buttons"
          type="button"
          datatest="explore-by-area"
        />
        <Box m={ 0.25 }>
          <Button
            className="SizeUp"
            size="large"
            variant="contained"
            color="secondary"
            type="button"
            data-testid="explore-surprise"
            onClick={ () => history
              .push(`/comidas/${apiData.value.map((item) => item.idMeal)}`) }
          >
            Me Surpreenda!
          </Button>
        </Box>
      </Grid>
    </div>
  );
};

export default ExplorefoodsButton;
