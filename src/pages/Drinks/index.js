import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { drinksOnMount } from '../../redux/actions';
import ContainerDefault from '../../components/ContainerDefault';
import Loading from '../../components/Loading';
import CardsArea from '../../components/CardsArea';
import FilterButtonsSection from '../../components/FilterButtonsSection';

function Drinks() {
  const dispatch = useDispatch();
  const { onClickByDrink } = useSelector((state) => state.flags);
  useEffect(() => {
    if (!onClickByDrink) {
      dispatch(drinksOnMount());
    }
  }, [dispatch, onClickByDrink]);

  const { isFetching, onClickFilter, drinks } = useSelector((state) => state.drinks);
  const oneDrink = drinks ? drinks.length : false;
  return (
    <ContainerDefault title="Bebidas">
      {
        isFetching && drinks.length === 0 ? <Loading />
          : (
            <>
              <FilterButtonsSection />
              <CardsArea type="drinks" />
            </>
          )
      }
      { oneDrink === 1 && !onClickFilter
      && <Redirect to={ `/bebidas/${drinks[0].idDrink}` } />}
    </ContainerDefault>
  );
}

export default Drinks;
