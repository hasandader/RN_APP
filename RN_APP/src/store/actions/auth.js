import { TRY_AUTH, AUTH_SET_TOKEN } from "./actionTypes";
import startMainTabs from "../../screens/MainTabs/startMainTabs";

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    const apiKey = "AIzaSyDmuu3rMi-OAN52MToNjyijMl4-jxOwpmo";
    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
      apiKey;
      if (authMode === "signup") {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
        apiKey;
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
          alert("This account already exists, please try loging in!");
        } else {
          dispatch(authSetToken(parsedRes.idToken));
          startMainTabs();
        }
      });
  };
};

export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    token: token
  };
};

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if (!token) {
                reject();
            } else {
                resolve(token);
            }
        });
        return promise;
    };
};
