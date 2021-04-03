import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Popover, Typography, Avatar, Divider, Button, useTheme } from "@material-ui/core";
import {FaceOutlined as FaceIcon,} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/user/actions";

const useStyles = makeStyles(theme => ({
  popover: {
    background: theme.custom.palette.profilePopColor,
    width: theme.spacing(40),
    borderRadius: theme.shape.borderRadius
  },
  container: {
    display: "flex",
    padding: theme.spacing(2),
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    margin: theme.spacing(1),
    background: theme.palette.background.default
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: theme.spacing(1)
  },
  userName: {
    ...theme.custom.fontFamily.metropolis,
    fontSize: "1rem",
    fontWeight: 500
  },
  userEmail: {
    ...theme.custom.fontFamily.roboto,
    fontSize: "0.9rem",
  },
  bar: {
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonSignout: {
    ...theme.custom.fontFamily.metropolis,
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 2),
    fontSize: "0.8rem",
    fontWeight: 500,
    textTransform: "none"
  }
}));

export default function ProfilePopover({ anchorEl, isOpen, onClose }) {
  const classes = useStyles();
  const theme = useTheme();
  const id = isOpen ? "profile-popover" : undefined;
  const name=useSelector(state => state.auth.name)
  const email =useSelector(state => state.auth.email)
  const loading = useSelector(state => state.auth.isLoading)  
  const dispatch = useDispatch()


  const doLogout=( )=>{
    dispatch(logout())
    window.location.reload();
 }

  return (
    <div>
      <Popover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        classes={{
          paper: classes.popover
        }}
      >
        <div className={classes.container}>
          <Avatar
            alt={name}
            className={classes.avatar}
          >
            <FaceIcon htmlColor={theme.custom.palette.iconColor} fontSize="large" />
          </Avatar>
          <div className={classes.userInfo}>
            <Typography className={classes.userName} variant="h6" component="span" color="textPrimary">
              {name}
            </Typography>
            <Typography className={classes.userEmail} variant="body1" component="span" color="textSecondary">
              {email}
            </Typography>
          </div>
        </div>
        <Divider />
        <div className={classes.bar}>
          <Button disabled={loading} variant="outlined" size="small" onClick={doLogout} classes={{ root: classes.buttonSignout }}>Sign out</Button>
        </div>
      </Popover>
    </div>
  );
}
