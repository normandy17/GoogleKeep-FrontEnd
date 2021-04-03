import {
    GET_TASKS_REQUEST, GET_TASKS_SUCCESS, GET_TASKS_FAILURE,
    // GET_TASK_REQUEST, GET_TASK_SUCCESS, GET_TASK_FAILURE,
    ADD_LABEL,ADD_TASK_REQUEST, ADD_TASK_SUCCESS, ADD_TASK_FAILURE
} from "./actionTypes";

const initialState = {
    isLoading: false,
    error: null,
    tasks: [],
    labelItems: []
}

export const tasksReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_TASKS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }

        case GET_TASKS_SUCCESS:
            //console.log(payload)
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
                tasks: payload,
                labelItems: labels,
                isLoading: false
            }

        case GET_TASKS_FAILURE:
            return {
                ...state,
                error: true,
                isLoading: false
            }

        case ADD_LABEL: {
            return {
                ...state,
                labelItems: [...state.labelItems, payload]
            };
        }

        default: return state
    }
}
