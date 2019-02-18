import { SET_ITEMS, FILL_CART } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken, fillCart } from './index';

export const addItem = (key, name, price, image, amount, user) => {
  return dispatch => {
    const itemData = {
      key:key,
      name: name,
      price: price,
      image: image,
      amount: amount
        };
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(() => {
         fetch("https://rn-app-9fc18.firebaseio.com/" + user + "/items.json", {
          method: "POST",
          body: JSON.stringify(itemData)
        })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
          console.log(parsedRes);
        });
      });
  };
};

export const getItems = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        return fetch(
          "https://rn-app-9fc18.firebaseio.com/photos.json?auth=" +
            token
        );
      })
      .catch(() => {
        alert("No valid token found!");
      })
      .then(res => res.json())
      .then(parsedRes => {
        const items = [];
        for (let key in parsedRes) {
          items.push({
            ...parsedRes[key],
            image: {
              uri: parsedRes[key].image.uri
            },
            key: key
          });
        }
        dispatch(setItems(items));
      })
      .catch(err => {
        alert("Something went wrong, sorry :/" + err);
        console.log(err);
      });
  };
};

export const getOrders = (user) => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        return fetch(
          "https://rn-app-9fc18.firebaseio.com/" + user + "/items.json?auth=" +
            token
        );
      })
      .catch(() => {
        alert("No valid token found!");
      })
      .then(res => res.json())
      .then(parsedRes => {
        const items = [];
        for (let key in parsedRes) {
          items.push({
            ...parsedRes[key],
            image: {
              uri: parsedRes[key].image.uri
            },
            key: key
          });
        }
        dispatch(fillCart(items));
      })
      .catch(err => {
        alert("Something went wrong, sorry :/" + err);
        console.log(err);
      });
  };
};

export const updateOrders = (key, name, price, image, amount, user) => {
  return dispatch => {
    const itemData = {
      key:key,
      name: name,
      price: price,
      image: image,
      amount: amount
        };
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(() => {
         fetch("https://rn-app-9fc18.firebaseio.com/" + user + "/items/" + key + ".json", {
          method: "PUT",
          body: JSON.stringify(itemData)
        })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
          console.log(parsedRes);
        });
      });
  };
};

export const deleteOrder = (key, user) => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(() => {
        fetch("https://rn-app-9fc18.firebaseio.com/" + user + "/items/" + key + ".json", {
          method: "DELETE"
        })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
          console.log(parsedRes);
        });
      });
  };
};

export const setItems = items => {
  return {
    type: SET_ITEMS,
    items: items
  };
};
