import React from "react";
import { Switch, Route } from "react-router-dom";
import  {Login } from "../Pages/Login/Login";
import { Feed } from "../Pages/Feed/Feed";
import { Register } from "../Pages/Register/Register";
import { SearchResult } from "../Pages/SearchResult/SearchResult";
import PrivateRoute from "./PrivateRoute";


export const Routes = () => {
  return (
    <div>
      <Route path="/" exact render={() => <Login />} />
        <Route path="/login" exact render={() => <Login />} />
        <Route path="/register" exact render={() => <Register />} />
      <Switch>       
        <PrivateRoute path="/search" exact MyComponent={SearchResult} />        
        <PrivateRoute path="/home" exact MyComponent={Feed} />       
      </Switch>    
    </div>
  );
};