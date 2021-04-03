import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Drawer,List,Divider,Typography,useTheme,useMediaQuery} from "@material-ui/core";
import {WbIncandescentOutlined as IdeaIcon,LabelOutlined as LabelIcon, DeleteOutlined as DeleteIcon, 
  FastfoodRounded as MenuIcon2,ArchiveOutlined as ArchiveIcon, RestoreOutlined, Fastfood} from "@material-ui/icons";
import DrawerItem from "./drawerItem";
import { useDispatch, useSelector } from "react-redux";
import { set_filter, set_label } from "../../Redux/uiRedux/actions";
import { toggle_drawer } from "../../Redux/uiRedux/actions";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: theme.mixins.drawer.minWidth,
    flexShrink: 0
  },
  drawerPaper: {
    background: theme.palette.background.default,
    width: theme.mixins.drawer.minWidth,
    border: 0
  },
  sectionTitle: {
    padding: theme.spacing(2, 1, 0, 2),
    color: theme.palette.text.secondary
  },
  toolbar: theme.mixins.toolbar
}));

export default function NavDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const labelItems = useSelector(state => state.tasks.labelItems)
  const selectedLabel=useSelector(state => state.theme.label)  
  const selectedFilter = useSelector(state => state.theme.filter);
  const isNavBarOpen=useSelector(state => state.theme.drawer)
  const dispatch=useDispatch()

  const onDrawerItemSelected = (label) => {
    dispatch(set_label(label))
    if(label===""){
      dispatch(set_filter("active"))
    }
  }
  const onFilterItemSelected = (filter) => {
    dispatch(set_filter(filter))
  }

  const toggleNavBar = ()=>{
    dispatch(toggle_drawer())
  };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      anchor="left"
      open={isNavBarOpen}
      onClose={toggleNavBar}
      classes={{
        root: classes.drawer,
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <List>       
        <DrawerItem
          text={"Notes"}
          isSelected={selectedFilter=="active"}
          icon={<IdeaIcon htmlColor={theme.custom.palette.iconColor} />}
          onClick={() => onFilterItemSelected("active")}
        />
        <DrawerItem
          text={"Archive"}
          isSelected={selectedFilter === "archive"}
          icon={<ArchiveIcon htmlColor={theme.custom.palette.iconColor} />}
          onClick={() => onFilterItemSelected("archive")}
        />
        <DrawerItem
          text={"Trash"}
          isSelected={selectedFilter === "trash"}
          icon={<DeleteIcon htmlColor={theme.custom.palette.iconColor} />}
          onClick={() => onFilterItemSelected("trash")}
        />
      </List>
      <Divider />
      <div className={classes.sectionTitle}>
        <Typography variant="overline" component="span">
          Labels
        </Typography>
      </div>
      <List>
        {labelItems.map(labelItem => (
          <DrawerItem
            key={labelItem}
            text={labelItem}
            icon={<LabelIcon htmlColor={theme.custom.palette.iconColor} />}
            isSelected={selectedLabel === labelItem}
            onClick={() => onDrawerItemSelected(labelItem)}
          />
        ))}
        <DrawerItem
            text="Reset"
            icon={<RestoreOutlined htmlColor={theme.custom.palette.iconColor} />}
            onClick={() => onDrawerItemSelected("")}
          />
      </List>
    </Drawer>
  );
}
