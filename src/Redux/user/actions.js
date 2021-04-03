import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAILURE,
  LOGOUT,
  SET_REGISTER,
  ADD_WATCHLIST,
  GET_ACTIVE_USER,
  REGISTER_SUCCESS,
} from "./actionTypes";
import axios from "axios";
const loginRequest = (uname, pass) => {
  return {
    type: LOGIN_REQUEST,
    payload: {
      username: uname,
      password: pass,
    },
  };
};
const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload: payload,
  };
};

const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};
const registerRequest = () => {
  return {
    type: REGISTER_REQUEST,
  };
};

const registerFailure = (error) => {
  return {
    type: REGISTER_FAILURE,
    payload: error,
  };
};



export const logout = () => {
  return {
    type: LOGOUT,
  };
};

const registerSuccess = (payload) => {
  return {
    type: REGISTER_SUCCESS,
    payload: payload,
  };
};


var i=0

export const getActiveUser = () => (dispatch) => {
  console.log("refreshing",++i)
  // dispatch(loginRequest())
  const accessToken = localStorage.getItem('accesstoken');
  axios({
    method: "GET",
    url: "http://localhost:8001/api/users",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      //console.log("logged in", res.data[0]);
      dispatch(loginSuccess(res.data[0]));
      return true;
    })
    .catch((res) => {
     // console.log("error", res);
      dispatch(loginFailure(res));
    });
}

export const Loginreq = (email, pass) => (dispatch) => {
  dispatch(loginRequest(email, pass));
  const config = {
    method: "POST",
    url: "http://localhost:8001/api/login",
    data: {
      email: email,
      password: pass,
    },
  };

  return axios(config)
    .then((res) => {
     // console.log(res.data.accesstoken);
      localStorage.setItem('accesstoken', res.data.accesstoken)
      return axios({
        method: "GET",
        url: "http://localhost:8001/api/users",
        headers: {
          authorization: `Bearer ${res.data.accesstoken}`,
        },
      })
        .then((res) => {
         // console.log("logged in", res.data[0]);
          dispatch(loginSuccess(res.data[0]));
          return true;
        })
        .catch((res) => {
          //console.log("error", res.response.data);
          dispatch(loginFailure(res.response.data));
        });
    })
    .catch((res) => {
     // console.log("error", res.response.data);
      dispatch(loginFailure(res.response.data));
    });
};

export const Regreq = (name,email,pass) => (dispatch) => {
  //console.log(name,email,pass)
  dispatch(registerRequest());
  const config = {
    method: "post",
    url: "http://localhost:8001/api/users",
    data: {
      name:name,
      email:email,
      password:pass
    },
  };

  return axios(config)
    .then((res) => {
      console.log(res.data);
      //dispatch(setRegister(true));
      //dispatch(registerSuccess(res.data));
      dispatch(Loginreq(email,pass))
      return true;
    })
    .catch((res) => {
      //console.log("error", res.response.data);
      dispatch(registerFailure(res.response.data));
    });
};





