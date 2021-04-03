import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { getActiveUser } from "../Redux/user/actions";
import { useDispatch } from "react-redux";

const PrivateRoute = ({ MyComponent, ...rest }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getActiveUser());
  }, []);
  const isAuth  = useSelector(state => state.auth.isAuth);
  return isAuth? (
    <Route {...rest} render={(props) => <MyComponent {...props} />} />
  ) : (<Redirect to="/home" />);
};

export default PrivateRoute;