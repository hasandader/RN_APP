import { FILL_CART } from './actionTypes';

export const fillCart = (items) => {
  return {
    type: FILL_CART,
    item: items
  };
};
