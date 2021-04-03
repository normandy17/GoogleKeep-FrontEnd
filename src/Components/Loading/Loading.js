import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export const Loading=()=> {
  return (
    <CircularProgress
      disableShrink
      style={{ position: "absolute", top: "50%", left: "50%", margin: "auto", marginTop:"100px",marginBottom:"100px"}}
    />
  );
}
