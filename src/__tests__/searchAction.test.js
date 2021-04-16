import searchAction from '../redux/actions/searchAction';
import { SEARCH_INPUT } from '../redux/actions/index';

describe('searchAction.js', () => {
  test('creation of search action', () => {
    const search = { inputValue: '', inputType: '' };
    const expectAction = {
      type: SEARCH_INPUT,
      payload: {
        search,
      },
    };

    expect(searchAction(search)).toEqual(expectAction);
  });
});
