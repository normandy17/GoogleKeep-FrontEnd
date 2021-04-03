import React, { useRef, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {AppBar,Toolbar,IconButton,Typography,useScrollTrigger,useMediaQuery} from "@material-ui/core";
import {AccountCircleOutlined as AccountsIcon,DashboardOutlined as TileViewIcon,Brightness4Outlined as ToggleDarkModeIcon,
  Brightness5Outlined as ToggleLightModeIcon,SearchOutlined as SearchIcon,FastfoodOutlined as MenuIcon,FastfoodRounded as MenuIcon2,
  ViewAgendaOutlined as ListIcon} from "@material-ui/icons";
import ProfilePopover from "./profile";
import SearchBar from "./search";
import { useDispatch, useSelector } from "react-redux";
import { toggle_drawer, toggle_theme, toggle_UI } from "../../Redux/uiRedux/actions";
import {useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  containerBorder: {
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    borderBottomColor: theme.palette.divider
  },
  menuButton: {
    [theme.breakpoints.up("md")]: {
      marginRight: theme.spacing(1)
    }
  },
  logoContainer: {
    display: "flex",
    justifyContent: "stretch",
    cursor:"pointer",
    background:""
  },
  logo: {
    display: "none",
    height: theme.spacing(5.5),
    padding: theme.spacing(0, 1, 0, 0),
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  title: {
    ...theme.custom.fontFamily.metropolis,
    display: "none",
    [theme.breakpoints.up("xs")]: {
      display: "flex",
      alignItems: "center"
    }
  },
  searchbarContainer: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      flexGrow: 0,
      width: theme.spacing(90),
      marginLeft: theme.spacing(9)
    }
  }
}));

export default function () {
  const menuId = "primary-search-account-menu";
  const classes = useStyles();
  const theme = useTheme();
  const [isProfilePopoverOpen, setProfilePopoverOpen] = useState(false);
  const [isSearchShowingInMobile, setSearchShowing] = useState(false);
  const profileMenuRef = useRef();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });
  const dispatch=useDispatch()
  
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isDarkMode=useSelector(state => state.theme.theme)
  const isListView =useSelector(state => state.theme.UI)
  const isNavBarOpen=useSelector(state => state.theme.drawer)
  const updateUserSettings=()=>{}


  const toggleNavBar = ()=>{
    dispatch(toggle_drawer())
  };
  const onDarkModeToggle = ()=>{
    dispatch(toggle_theme())
  }
  const onViewToggle = ()=>{
    dispatch(toggle_UI())
  }
  

  return (
    <div className={classes.grow}>
      <AppBar
        elevation={trigger ? 4 : 0}
        className={trigger ? null : classes.containerBorder}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="open drawer"
            onClick={toggleNavBar}
          >
            {!isNavBarOpen && <MenuIcon htmlColor={theme.custom.palette.iconColor} />}
            {isNavBarOpen && <MenuIcon2 htmlColor={theme.custom.palette.iconColor} />}
          </IconButton>
          {isMobile ? (
            isSearchShowingInMobile ? (
              <SearchContainer onSearchClose={() => setSearchShowing(false)} />
            ) : (
                <LogoContainer />
              )
          ) : (
              <>
                <LogoContainer />
                <SearchContainer onSearchClose={() => setSearchShowing(false)} />
              </>
            )}
          <div className={classes.grow} />
          {isMobile && !isSearchShowingInMobile ? (
            <div>
              <IconButton
                aria-label="search"
                aria-controls={menuId}
                onClick={() => setSearchShowing(true)}
              >
                <SearchIcon htmlColor={theme.custom.palette.iconColor} />
              </IconButton>
            </div>
          ) : null}          
          <div>
            <IconButton
              aria-label="toggle dark theme"
              aria-controls={menuId}
              onClick={onDarkModeToggle}
            >
              {isDarkMode ? <ToggleLightModeIcon htmlColor={theme.custom.palette.iconColor} /> : <ToggleDarkModeIcon htmlColor={theme.custom.palette.iconColor} />}
            </IconButton>
          </div>
          {isMobile ? null : (
            <div>
              <IconButton
                aria-label={
                  isListView ? "toggle tile view" : "toggle list view"
                }
                aria-controls={menuId}
                onClick={onViewToggle}
              >
                {isListView ? <TileViewIcon htmlColor={theme.custom.palette.iconColor} /> : <ListIcon htmlColor={theme.custom.palette.iconColor} />}
              </IconButton>
            </div>
          )}
          <div>
            <IconButton
              edge="end"
              ref={profileMenuRef}
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => setProfilePopoverOpen(true)}
            >
              <AccountsIcon htmlColor={theme.custom.palette.iconColor} />
            </IconButton>
          </div>
        </Toolbar>
        <ProfilePopover
          anchorEl={profileMenuRef.current}
          isOpen={isProfilePopoverOpen}
          onClose={() => setProfilePopoverOpen(false)}
        />
      </AppBar>
    </div>
  );
}

function LogoContainer() {
  const classes = useStyles();
  const history = useHistory();
  const onClickHome = ()=>{
    history.push("/home");
  }
  return (
    <div className={classes.logoContainer} onClick={onClickHome}>
      <img className={classes.logo} src={`../../logo.png`} alt={"logo"} />
      <Typography
        color="textSecondary"
        className={classes.title}
        variant="h6"
        noWrap
      >
        Keep
      </Typography>
    </div>
  );
}

function SearchContainer({ onSearchClose }) {
  const classes = useStyles();
  return (
    <div className={classes.searchbarContainer}>
      <SearchBar ml={8} onSearchClose={onSearchClose} />
    </div>
  );
}
