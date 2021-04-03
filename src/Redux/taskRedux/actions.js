import axios from "axios";
import {
    GET_TASKS_REQUEST, GET_TASKS_SUCCESS, GET_TASKS_FAILURE,
    ADD_TASK_REQUEST, ADD_TASK_SUCCESS, ADD_TASK_FAILURE,ADD_LABEL
} from "./actionTypes";

import { getActiveUser } from "../user/actions";
var i=0
const addTask_Request = (payload) => ({
    type: ADD_TASK_REQUEST,
    payload
})

const addTask_Success = (payload) => ({
    type: ADD_TASK_SUCCESS,
    payload
})

const addTask_Failure = (payload) => ({
    type: ADD_TASK_FAILURE,
    payload
})


const getTasks_Request = (page,limit) => ({
    type: GET_TASKS_REQUEST,
    payload:{page:page,limit:limit}
})

const getTasks_Success = (payload) => ({
    type: GET_TASKS_SUCCESS,
    payload
})

const getTasks_Failure = (payload) => ({
    type: GET_TASKS_FAILURE,
    payload
})

export const add_label = (label) => {
    return {
      type: ADD_LABEL,
      payload:label
    };
  };



export const getTasks = (id) => dispatch => {
    console.log("action task", ++i)
    dispatch(getTasks_Request())
    var config = {
            method: 'get',
            url: `https://google-keep-backend.herokuapp.com/api/tasks?id=${id}`,           
        }    
    return axios(config)
        .then((res) => {
            //console.log("result ",res.data)
            dispatch(getTasks_Success(res.data))
            return true
        }).catch((err) => {
            //console.log(err)
            dispatch(getTasks_Failure(err))
        });
}



export const addTask = (data) => dispatch => {
    //console.log("addding")
    dispatch(addTask_Request)
    const config = {
        method: 'post',
        url: `https://google-keep-backend.herokuapp.com/api/Tasks`,
        data,
    }
    return axios(config)
        .then((res) => {
             //console.log(res.data)
            dispatch(addTask_Success(res.data))
            dispatch(getTasks(data.user_id))
            //alert("Task Added Successfully")
            return true
        }).catch((err) => {
            // console.log(err)
            ///alert("New Task Could not be added, please Retry")
            dispatch(addTask_Failure(err))
        });
}

export const editTask = (id,data) => dispatch => {
    //console.log("editing")
    const config = {
        method: 'put',
        url: `https://google-keep-backend.herokuapp.com/api/Tasks/${id}`,
        data:data
    }
    return axios(config)
        .then((res) => { 
            dispatch(getTasks(data.user_id))                  
            return true
        }).catch((err) => {
             //console.log(err)
            return false
        });
}

