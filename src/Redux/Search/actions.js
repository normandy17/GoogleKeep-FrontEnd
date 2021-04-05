import { SEARCHED,SEARCH_REQUEST,SEARCH_SUCESS} from "./actionTypes";
import axios from "axios";

export const searchedData = (payload) => {
  return {
    type: SEARCHED,
    payload,
  };
};
 const searchReq = () => {
  return {
    type: SEARCH_REQUEST
  };
};


export const searchQuery = (payload) => (dispatch) => {
  //console.log("searching",payload)
  dispatch(searchReq())
  var config = {
    method: "post",
    url: "https://google-keep-backend.herokuapp.com/api/tasks/search",
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
  };

  axios(config)
    .then(function (response) {
      //console.log(response.data);
      dispatch(searchedData(response.data));
    })
    .catch(function (error) {
     // console.log(error);
    });
};
