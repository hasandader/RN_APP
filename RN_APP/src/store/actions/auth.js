import { AsyncStorage } from 'react-native';

import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_SET_UID, AUTH_REMOVE_TOKEN } from "./actionTypes";
import startMainTabs from "../../screens/MainTabs/startMainTabs";
import App from "../../../App";

const API_KEY = "AIzaSyDmuu3rMi-OAN52MToNjyijMl4-jxOwpmo";
var uID = "";

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
      API_KEY;
      if (authMode === "signup") {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
        API_KEY;
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(err => {
        console.log(err);
        alert("Authentication failed, please try again!");
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
        if (!parsedRes.idToken) {
          alert("This account already exists, please try loging in!" + parsedRes.localId);
        } else {
          dispatch(authSetUID(parsedRes.localId));
          dispatch(
            authStoreToken(
              parsedRes.idToken,
              parsedRes.expiresIn,
              parsedRes.refreshToken,
              parsedRes.localId
            )
          );
          startMainTabs();
        }
      });
  };
};

export const authStoreToken = (token, expiresIn, refreshToken, uid) => {
  return dispatch => {
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 1000;
    dispatch(authSetToken(token, expiryDate));
    AsyncStorage.setItem("rn:auth:token", token);
    AsyncStorage.setItem("rn:auth:expiryDate", expiryDate.toString());
    AsyncStorage.setItem("rn:auth:refreshToken", refreshToken);
    AsyncStorage.setItem("rn:auth:UID", uid);
  };
};

export const authSetToken = (token, expiryDate) => {
  return {
    type: AUTH_SET_TOKEN,
    token: token,
    expiryDate: expiryDate
  };
};

export const getUserData = () => {
  return dispatch => {
    let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=" + API_KEY;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idToken: authGetToken()
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch(err => {
      alert("Check idToken!")
    })
    .then(res => res.json())
    .then(parsedRes => {
        dispatch(authSetUID(parsedRes.users.localId));
    });
  };
};

export const authSetUID = uid => {
  return {
    type: AUTH_SET_UID,
    uid: uid
  };
};

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            const expiryDate = getState().auth.expiryDate;
            //uID = getState().auth.uid;
            if (!token || new Date(expiryDate) <= new Date()) {
              let fetchedToken;
      AsyncStorage.getItem("rn:auth:token")
        .catch(err => reject())
        .then(tokenFromStorage => {
          fetchedToken = tokenFromStorage;
          if (!tokenFromStorage) {
            reject();
            return;
          }
          return AsyncStorage.getItem("rn:auth:expiryDate");
        })
        .then(expiryDate => {
          const parsedExpiryDate = new Date(parseInt(expiryDate));
          const now = new Date();
          if (parsedExpiryDate > now) {
            dispatch(authSetToken(fetchedToken));
            resolve(fetchedToken);
          } else {
            reject();
          }
        })
        .catch(err => reject())
        AsyncStorage.getItem("rn:auth:UID")
        .then(user => {
          uID = user;
        });
            } else {
                resolve(token);
            }
        });
        return promise
        .catch(err => {
      return AsyncStorage.getItem("rn:auth:refreshToken")
        .then(refreshToken => {
          return fetch(
            "https://securetoken.googleapis.com/v1/token?key=" + API_KEY,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              body: "grant_type=refresh_token&refresh_token=" + refreshToken
            }
          );
        })
        .then(res => res.json())
        .then(parsedRes => {
          if (parsedRes.id_token) {
            console.log("Refresh token worked!");
            dispatch(
              authStoreToken(
                parsedRes.id_token,
                parsedRes.expires_in,
                parsedRes.refresh_token,
                parsedRes.user_id
              )
            );
            //uID = "parsedRes.user_id";
            return parsedRes.id_token;
          } else {
            //uID = "HasanC";
            dispatch(authClearStorage());
          }
            //uID = "HasanF";
        });
    })
    .then(token => {
        if (!token) {
          throw new Error();
        } else {
          return token;
        }
      });
    };
};

export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        //alert(uID);
          dispatch(authSetUID(uID));
        startMainTabs();
      })
      .catch(err => console.log("Failed to fetch token!"));
  };
};

export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem("rn:auth:token");
    AsyncStorage.removeItem("rn:auth:expiryDate");
    AsyncStorage.removeItem("rn:auth:UID");
    return AsyncStorage.removeItem("rn:auth:refreshToken");
  };
};

export const authLogout = () => {
  return dispatch => {
    dispatch(authClearStorage()).then(() => {
      App();
    });
    dispatch(authRemoveToken());
  };
};

export const authRemoveToken = () => {
  return {
    type: AUTH_REMOVE_TOKEN
  };
};
