import { CLOSE_PAGE, SELECT_ITEM } from '../actions/actionTypes';

import bear from '../../assets/bear.jpg';
import car from '../../assets/car.jpg';
import duck from '../../assets/duck.jpg';
import minion from '../../assets/minion.jpg';

const initialState = {
  data: [{key: 1,
  image: bear,
  price: "40 TL",
  name: "Bear"},
  {key: 2,
  image: car,
  price: "75 TL",
  name: "Car"},
  {
    key: 3,
    image: duck,
    price: "15 TL",
    name: "Duck"
  },
  {
    key: 4,
    image: minion,
    price: "55 TL",
    name: "Minions"
  },
  {
    key: 5,
    image: bear,
    price: "40 TL",
    name: "Bear"
  },
  {
    key: 6,
    image: car,
    price: "75 TL",
    name: "Car"
  },
  {
    key: 7,
    image: duck,
    price: "15 TL",
    name: "Duck"
  },
  {
    key: 8,
    image: minion,
    price: "55 TL",
    name: "Minions"
  },
  {
    key: 9,
    image: bear,
    price: "40 TL",
    name: "Bear"
  },
  {
    key: 10,
    image: car,
    price: "75 TL",
    name: "Car"
  },
  {
    key: 11,
    image: duck,
    price: "15 TL",
    name: "Duck"
  },
  {
    key: 12,
    image: minion,
    price: "55 TL",
    name: "Minions"
  },
  {
    key: 13,
    image: bear,
    price: "40 TL",
    name: "Bear"
  },
  {
    key: 14,
    image: car,
    price: "75 TL",
    name: "Car"
  },
  {
    key: 15,
    image: duck,
    price: "15 TL",
    name: "Duck"
  },
  {
    key: 16,
    image: minion,
    price: "55 TL",
    name: "Minions"
  },
  {
    key: 17,
    image: bear,
    price: "40 TL",
    name: "Bear"
  },
  {
    key: 18,
    image: car,
    price: "75 TL",
    name: "Car"
  },
  {
    key: 19,
    image: duck,
    price: "15 TL",
    name: "Duck"
  },
  {
    key: 20,
    image: minion,
    price: "55 TL",
    name: "Minions"
  }],
  selectedItem: null
};

const reducer = (state=initialState , action) => {
  switch(action.type) {
    case CLOSE_PAGE:
    return {
      ...state,
      selectedItem: null
    };
    case SELECT_ITEM:
    return {
      ...state,
      selectedItem: state.data.find(item => {
        return item.key === action.itemKey;
      })
    };
    default:
    return state;
  }
};

export default reducer;
