import meals from '../../../store/ducks/meals';

const INITIAL_STATE = {
  recipes: { isFetching: false, notFound: false, recipes: [], error: '' },
  ingredients: { isFetching: false, ingredients: [], error: '' },
  categories: { isFetching: false, categories: [], error: '' },
  areas: { isFetching: false, areas: [], error: '' },
};

describe('meals', () => {
  test('ao usar o reducer meals o estado é iniciado da forma correta', () => {
    expect(meals(undefined, {})).toEqual(INITIAL_STATE);
  });
});
