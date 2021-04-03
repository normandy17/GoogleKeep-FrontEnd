import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Fade, ClickAwayListener, useTheme, Button } from "@material-ui/core";
import ActionsBar from "../task/actions";
import LabelsBar from "../task/labels";
import ContentTitle from "../task/heading";
import Content from "../task/content";
import { useDispatch} from "react-redux";
import { set_edit } from "../../Redux/uiRedux/actions";
import { editTask } from "../../Redux/taskRedux/actions";

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    borderColor: theme.custom.palette.itemBorderColor,
    borderWidth: theme.spacing(0.1),
    borderStyle: "solid"
  },
  textTitle: {
    ...theme.custom.fontFamily.metropolis,
    padding: theme.spacing(1.5, 2, 0, 2),
    fontWeight: 500,
    fontSize: "1rem",
    color: theme.palette.text.primary,
    lineHeight: theme.spacing(0.18)
  },
  barWrapper: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(1, 2),
    justifyContent: "space-between"
  }
}));

export default function ({ noteItem, isEditMode }) {
  
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch()
  const [isHovered, setHovered] = useState(false);
  const [title, setTitle] = useState(noteItem.title);
  const [noteinputs, setNotes] = useState(noteItem.tasks);
  const [color, setColor] = useState(noteItem.color);
  const [isCheckboxMode, setCheckboxMode] = useState(noteItem.type=="list"? true:false);
  const [labels, setLabels] = useState(noteItem.labels);  
  
  React.useEffect(() => {
    onAfterEdit(noteItem)
  }, [color,labels,isCheckboxMode]);

  const  setNoteInEditMode  = (id)=>{
    dispatch(set_edit(id))
  };

  const updateColor = (color) => {
    setColor(color);
    onAfterEdit(noteItem)
  }

  const updateLabels = (labels) => {
    setLabels(labels);  
    onAfterEdit(noteItem)
  }

  const updateCheckboxMode = (isCheckboxMode) => {
    setCheckboxMode(isCheckboxMode);
    onAfterEdit(noteItem)
  }

  const onAfterEdit = (item) => {
    const id=item._id
    const data={
      user_id:item.user_id,
      title,
      tasks:noteinputs,
      labels:labels,
      type:isCheckboxMode? "list":"note",
      color:color,
      status:item.status
    }
    dispatch(editTask(id,data))
    dispatch(set_edit(""))

  }

  return (
    <Paper
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={classes.wrapper}
      elevation={isHovered || isEditMode ? 2 : 0}
      style={{ backgroundColor: theme.custom.palette.noteBackground[color] }}
    >
      <ClickAwayListener onClickAway={isEditMode ? (() => onAfterEdit(noteItem)) : () => { }}>
        <div onClick={() => setNoteInEditMode(noteItem._id)}>
          <ContentTitle title={title} setTitle={setTitle} isEditMode={isEditMode} />
          <Content
            notes={noteinputs}
            setNotes={setNotes}
            isEditMode={isEditMode}
            isCheckboxMode={isCheckboxMode}
          />
        </div>
      </ClickAwayListener>
      <LabelsBar labels={labels} />
      <Fade in={isHovered || isEditMode}>
        <div className={classes.barWrapper}>
          <ActionsBar
            id={noteItem._id}
            item={noteItem}
            color={color}
            setColor={updateColor}
            labels={labels}
            setLabels={updateLabels}
            setCheckboxMode={updateCheckboxMode}
            isCreateMode={false}
            isCheckboxMode={isCheckboxMode}
          />
        </div>
      </Fade>
    </Paper>
  );
}
