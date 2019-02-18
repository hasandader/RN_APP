import { SET_ITEMS, FILL_CART } from '../actions/actionTypes';

const initialState = {
  data: [],
  cartItems: [],
};

const reducer = (state=initialState , action) => {
  switch(action.type) {
    case SET_ITEMS:
    return {
      ...state,
      data: action.items
    };
    case FILL_CART:
    return {
      ...state,
      cartItems: action.item
    };
    default:
    return state;
  }
};

export default reducer;
