import { CLOSE_PAGE, SELECT_ITEM } from './actionTypes';

export const closePage = () => {
  return {
    type: CLOSE_PAGE
  };
};

export const selectItem = (key) => {
  return {
    type: SELECT_ITEM,
    itemKey: key
  };
};
