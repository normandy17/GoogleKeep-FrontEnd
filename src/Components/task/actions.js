import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Tooltip } from "@material-ui/core";
import {PaletteOutlined as PaletteIcon,LabelOutlined as LabelIcon,DeleteOutlineOutlined as DeleteIcon,
  ArchiveOutlined as ArchiveIcon,CheckBoxOutlined as CheckBoxIcon,WbIncandescentOutlined as IdeaIcon,
  IndeterminateCheckBoxOutlined as HideCheckBoxIcon} from "@material-ui/icons";
import { useTheme } from "@material-ui/core/styles";
import ColorPopover from "./color";
import LabelPopover from "./label";
import { useDispatch} from "react-redux";
import { set_edit } from "../../Redux/uiRedux/actions";
import { editTask } from "../../Redux/taskRedux/actions";

const useStyles = makeStyles(theme => ({
  optionsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  optionWrapperFirst: {
    padding: theme.spacing(0, 1, 0, 0)
  },
  optionWrapperLast: {
    padding: theme.spacing(0, 0, 0, 1)
  },
  optionWrapper: {
    padding: theme.spacing(0, 1)
  },
  barClose: {}
}));

export default function ({ id,item, labels, setLabels, color, setColor, setCheckboxMode, isCreateMode, isCheckboxMode }) {
  const classes = useStyles();
  const theme = useTheme();
  const refActionColor = useRef();
  const refActionLabel = useRef();
  const dispatch = useDispatch()
  const [isColorPopoverOpen, setColorPopoverOpen] = useState(false);
  const [isLabelPopoverOpen, setLabelPopoverOpen] = useState(false);  

  const archiveNote = () => {
    const data={
      user_id:item.user_id,
      title:item.title,
      tasks:item.tasks,
      labels:item.labels,
      type:item.type,
      color:item.color,
      status:"archive"
    }
    dispatch(editTask(id,data))
    dispatch(set_edit(""))
  }
  const setActive = () => {
    const data={
      user_id:item.user_id,
      title:item.title,
      tasks:item.tasks,
      labels:item.labels,
      type:item.type,
      color:item.color,
      status:"active"
    }
    dispatch(editTask(id,data))
    dispatch(set_edit(""))
  }

  const deleteNote = () => {
    const data={
      user_id:item.user_id,
      title:item.title,
      tasks:item.tasks,
      labels:item.labels,
      type:item.type,
      color:item.color,
      status:"trash"
    }
    dispatch(editTask(id,data))
    dispatch(set_edit(""))
  }

  return (
    <>
      <div className={classes.optionsWrapper}>
        <div className={classes.optionWrapperFirst}>
          <Tooltip title="Change Color">
            <IconButton
              size="small"
              aria-label="change color"
              ref={refActionColor}
              onClick={() => setColorPopoverOpen(true)}
            >
              <PaletteIcon
                htmlColor={theme.custom.palette.iconHighlight}
                fontSize="small"
              />
            </IconButton>
          </Tooltip>
        </div>
        <div className={classes.optionWrapper}>
          <Tooltip title="Show Checkboxes">
            <IconButton
              size="small"
              aria-label="show checkboxes"
              onClick={() => setCheckboxMode(!isCheckboxMode)}
            >
              {isCheckboxMode ? (
                <HideCheckBoxIcon
                  htmlColor={theme.custom.palette.iconHighlight}
                  fontSize="small"
                />
              ) : (
                  <CheckBoxIcon
                    htmlColor={theme.custom.palette.iconHighlight}
                    fontSize="small"
                  />
                )}
            </IconButton>
          </Tooltip>
        </div>
        <div className={classes.optionWrapper}>
          <Tooltip title="Change labels">
            <IconButton
              size="small"
              aria-label="change labels"
              ref={refActionLabel}
              onClick={() => setLabelPopoverOpen(true)}
            >
              <LabelIcon
                htmlColor={theme.custom.palette.iconHighlight}
                fontSize="small"
              />
            </IconButton>
          </Tooltip>
        </div>
        {isCreateMode ? null : (
          <>
            <div className={classes.optionWrapper}>
             {item.status!=="archive" && <Tooltip title="Archive">
                <IconButton
                  size="small"
                  aria-label="archive note"
                  onClick={archiveNote}
                >
                  <ArchiveIcon
                    htmlColor={theme.custom.palette.iconHighlight}
                    fontSize="small"
                  />
                </IconButton>
              </Tooltip>}
             {item.status==="archive" && <Tooltip title="Undo Archive">
                <IconButton
                  size="small"
                  aria-label="archive note"
                  onClick={setActive}
                >
                  <IdeaIcon
                    htmlColor={theme.custom.palette.iconHighlight}
                    fontSize="small"
                  />
                </IconButton>
              </Tooltip>}
            </div>

            <div className={classes.optionWrapperLast}>
              {item.status!=="trash" &&<Tooltip title="Delete">
                <IconButton
                  size="small"
                  aria-label="delete note"
                  onClick={deleteNote}
                >
                  <DeleteIcon
                    htmlColor={theme.custom.palette.iconHighlight}
                    fontSize="small"
                  />
                </IconButton>
              </Tooltip>}
              {item.status==="trash" &&<Tooltip title="Undo Delete">
                <IconButton
                  size="small"
                  aria-label="delete note"
                  onClick={setActive}
                >
                  <IdeaIcon
                    htmlColor={theme.custom.palette.iconHighlight}
                    fontSize="small"
                  />
                </IconButton>
              </Tooltip>}
            </div>
          </>
        )}
      </div>
      <ColorPopover
        anchorEl={refActionColor.current}
        isOpen={isColorPopoverOpen}
        onClose={() => setColorPopoverOpen(false)}
        currentColor={color}
        onColorSelect={color => setColor(color)}
      />
      <LabelPopover
        anchorEl={refActionLabel.current}
        isOpen={isLabelPopoverOpen}
        setLabels={setLabels}
        labels={labels}
        onClose={() => setLabelPopoverOpen(false)}
      />
    </>
  );
}
