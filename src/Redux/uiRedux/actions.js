import {TOGGLE_DRAWER,TOGGLE_THEME,TOGGLE_UI,SET_LABEL,SET_FILTER, SET_EDIT} from "./actionTypes";

export const toggle_drawer = () => {
  return {
    type: TOGGLE_DRAWER,
  };
};
export const toggle_theme = () => {
  return {
    type: TOGGLE_THEME,
  };
};
export const toggle_UI = () => {
  return {
    type: TOGGLE_UI,
  };
};
export const set_label = (label) => {
  return {
    type: SET_LABEL,
    payload:label
  };
};
export const set_filter = (filter) => {
  return {
    type: SET_FILTER,
    payload:filter
  };
};
export const set_edit = (id) => {
  return {
    type: SET_EDIT,
    payload:id
  };
};


