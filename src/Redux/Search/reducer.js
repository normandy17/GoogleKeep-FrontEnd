import { SEARCHED } from "./actionTypes";

const initState = {
  searched:[],
  labelItems: [],
  isLoading:false
};

export const searchReducer = (state = initState, { type, payload }) => {
   //console.log("type", type, payload);
  switch (type) {
    case SEARCHED:
      var labels = []
            for (var i = 0; i < payload.length; i++) {
                for (var j = 0; j < payload[i].labels.length; j++) {
                    labels.push(payload[i].labels[j])
                }
            }
            //console.log("labels",labels)
            labels = [...new Set(labels)]

            return {
                ...state,
                searched: payload,
                labelItems: labels,
                isLoading: false
            }

    default:
      return state;
  }
};
