import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TodoItem from "./task";
import { useMediaQuery } from "@material-ui/core";
import {  useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  content: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: theme.mixins.drawer.minWidth - theme.spacing(2.5),
    marginRight: -1 * theme.spacing(3)
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  todoCreateContainer: {
    display: "flex",
    padding: theme.spacing(4, 0),
    margin: theme.spacing(0, 1)
  },
  todoCreateWrapper: {
    flex: 1,
    maxWidth: theme.spacing(75),
    margin: "0 auto"
  },
  todosWrapper: {
    margin: "0 auto",
    columnWidth: theme.spacing(29),
    columnGap: "0.5rem"
  },
  todoWrapper: {
    width: theme.spacing(29),
    margin: "0 auto",
    breakInside: "avoid",
    pageBreakInside: "avoid",
    padding: "0.5rem 0",
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.standard
    })
  }
}));

export default function () {


  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isTablet = useMediaQuery(theme.breakpoints.up("sm"));
  const isLaptop = useMediaQuery(theme.breakpoints.up("md"));
  const isLaptopL = useMediaQuery(theme.breakpoints.up("lg"));
  const is4K = useMediaQuery(theme.breakpoints.up("xl"));
  const numberOfColumns = is4K
    ? 8
    : isLaptopL
      ? 4
      : isLaptop
        ? 3
        : isTablet
          ? 2
          : 1;
  var width = is4K
    ? "100%"
    : isLaptopL
      ? "1000px"
      : isLaptop
        ? "730px"
        : isTablet
          ? "480px"
          : "100%";
  const isListView = useSelector(state => state.theme.UI);
  const isNavBarOpen = false
  const noteInEditMode = useSelector(state => state.theme.edit)
  const selectedLabel = useSelector(state => state.theme.label);
  const selectedFilter = useSelector(state => state.theme.filter);
  const notes = useSelector(state => state.search.searched);

  const statusfilteredItems = notes.filter(item =>  item.status===selectedFilter);

  const filteredItems = statusfilteredItems.filter(item => {
    if (selectedLabel !== "") {
      return item.labels.some((labelItem) => labelItem === selectedLabel);
    } else {
      return true;
    }
  }); 

  width = isListView
    ? isLaptop || isLaptopL
      ? theme.spacing(75)
      : "100%"
    : width;

  return (
    <main>
      {notes.length==0 && <div style={{width:"100%",height:"100%",textAlign:"center", marginTop:"100px"}}>Uh Oh!<br/>Soory, We coudn't find any notes that match your query, Please try again!</div>}
      <div
        className={
          isMobile || !isNavBarOpen ? classes.contentShift : classes.content
        }
      >
        <div className={classes.todoCreateContainer}>
          <div className={classes.todoCreateWrapper}>
            
          </div>
        </div>
        <div
          className={classes.todosWrapper}
          style={{
            columnCount: isListView ? 1 : numberOfColumns,
            width: width
          }}
        >
          
          {filteredItems && filteredItems.map((noteItem) => {
            return (
              <div
                key={noteItem._id}
                className={classes.todoWrapper}
                style={{ width: isMobile || isListView ? "100%" : null }}
              >
                <TodoItem
                  noteItem={noteItem}
                  isEditMode={noteInEditMode === noteItem._id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
