import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Button, Box } from '@material-ui/core';
import ButtonLink from './ButtonLink';
import { Context } from '../context';

const ExploreDrinksButton = () => {
  const history = useHistory();
  const { apiData } = useContext(Context);

  return (
    <div>
      <Grid className="Button-explorer">
        <ButtonLink
          LinkT="/explorar/bebidas/ingredientes"
          name="Explorar Por Ingredientes"
          className="SizeUp"
          size="large"
          variant="contained"
          color="primary"
          type="button"
          datatest="explore-by-ingredient"
        />
        <Box m={ 0.25 }>
          <Button
            className="SizeUp"
            size="large"
            variant="contained"
            color="primary"
            type="button"
            data-testid="explore-surprise"
            onClick={ () => history
              .push(`/bebidas/${apiData.value.map((item) => item.idDrink)}`) }
          >
            Me Surpreenda!
          </Button>
        </Box>
      </Grid>
    </div>
  );
};

export default ExploreDrinksButton;
