import {
  LOGIN_SUCCESS,LOGIN_FAILURE,LOGIN_REQUEST,
  REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAILURE,
  LOGOUT,ADD_LABEL} from "./actionTypes";

const initState = {
  isAuth: false,
  name: null,
  loading:false,
  email: null,
  error: false,
  errormsg: "",  
  id:null
};

export const authReducer = (state = initState, { type, payload }) => {
  //console.log("type", type, payload);
  switch (type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
        isAuth: false,
      };
    }
    case LOGIN_SUCCESS: {      
      return {
        ...state,
        isAuth: true,
        loading:false,
        name: payload.name,
        email: payload.email,
        id:payload._id,
        error: null
      };
    }

    case LOGIN_FAILURE: {
       //console.log(payload);
      return {
        ...state,
        isAuth: false,
        loading:false,
        userdata: null,
        error: true,
        errormsg: payload,
      };
    }
    case REGISTER_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
        isAuth: false,
      };
    }
    case REGISTER_SUCCESS: {
      console.log(payload)
      return {
        ...state,
        isAuth: true,
        loading:false,
        name: payload.name,
        email: payload.email,
        id:payload._id,
        error: null
      };
    }

    case REGISTER_FAILURE: {
      return {
        ...state,
        status: payload,
        error: true,
        errormsg: payload,
        userdata:null,
        isAuth: false,
      };
    }

    case LOGOUT: {
      localStorage.removeItem('accesstoken')
      
      return {
        ...state,
        isAuth: false,
        userdata: null,
        name:null,
        email:null,
        id:null
      };
    }

    default:
      return state;
  }
};
