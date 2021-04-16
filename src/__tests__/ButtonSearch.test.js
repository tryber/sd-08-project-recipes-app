import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithReduxandRouter from '../renderWithReduxandRouter';
import ButtonSearch from '../components/ButtonSearch';
import selectAreaAction from '../redux/actions/SelectAreaAction';
import { AREA_SELECT } from '../redux/actions/index';
import areasMeals from '../TestsMocks/mockAreasMeals';

describe('ButtonSearch.js', () => {
  test('if the Button state toggle when clicked', () => {
    renderWithReduxandRouter(<ButtonSearch type="search" />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    userEvent.click(button);
    expect(searchInput).not.toBeInTheDocument();
  });

  test('if the Button set to SearchArea', () => {
    const search = {
      areas: areasMeals,
    };
    const INITIAL_ENTRIES = {
      initialEntries: ['/explorar/comidas/area'],
      initialState: {
        search,
      },
    };
    const area = 'American';
    const expectAction = {
      type: AREA_SELECT,
      payload: {
        area,
      },
    };
    renderWithReduxandRouter(<ButtonSearch type="origem" />, INITIAL_ENTRIES);

    const searchDropDown = screen.getByTestId('explore-by-area-dropdown');
    expect(searchDropDown).toBeInTheDocument();
    const allOption = screen.getByTestId('All-option');
    expect(allOption).toBeInTheDocument();
    userEvent.selectOptions(allOption);
    const americanOption = screen.getByTestId('American-option');
    userEvent.selectOptions(americanOption);
    expect(selectAreaAction(area)).toEqual(expectAction);
  });
});
