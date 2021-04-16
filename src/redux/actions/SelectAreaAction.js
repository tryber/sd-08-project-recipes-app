import { AREA_SELECT } from './index';

const selectAreaAction = (area) => ({
  type: AREA_SELECT,
  payload: {
    area,
  },
});

export default selectAreaAction;
