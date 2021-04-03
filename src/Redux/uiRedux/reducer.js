import {SET_LABEL, TOGGLE_DRAWER,TOGGLE_THEME,TOGGLE_UI,SET_FILTER, SET_EDIT} from "./actionTypes";

const initState = {
  theme:JSON.parse(localStorage.getItem('theme')) || false,
  drawer:false,
  UI:JSON.parse(localStorage.getItem('UI')) || false,
  label:"",
  filter:"active",
  edit:""
};

export const themeReducer = (state = initState, { type, payload }) => {

  switch (type) {

    case TOGGLE_UI: {
      var stat=state.UI
      localStorage.setItem('UI', !stat)
      return {
        ...state,
        UI:!stat       
      };
    }
    case TOGGLE_DRAWER: {
      return {
        ...state,
        drawer:!state.drawer        
      };
    }
    case TOGGLE_THEME: {
      var stat=state.theme
      localStorage.setItem('theme', !stat)
      return {
        ...state,
        theme:!stat        
      };
    }
    case SET_LABEL: {      
      return {
        ...state,
        label:payload        
      };
    }
    case SET_FILTER: {      
      return {
        ...state,
        filter:payload        
      };
    }
    case SET_EDIT: {      
      return {
        ...state,
        edit:payload        
      };
    }  
    
    default:
      return state;
  }
};
