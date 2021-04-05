import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";

export const Loading= ()=> {
    return (
        <Backdrop open={true} >
            <CircularProgress color="inherit" />
        </ Backdrop>
    )
}