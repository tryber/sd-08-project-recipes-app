import SelectAreaAction from '../redux/actions/SelectAreaAction';
import { AREA_SELECT } from '../redux/actions/index';

describe('SelectAreaAction.js', () => {
  test('creation of SelectArea action', () => {
    const area = 'chinese';
    const expectAction = {
      type: AREA_SELECT,
      payload: {
        area,
      },
    };

    expect(SelectAreaAction(area)).toEqual(expectAction);
  });
});
