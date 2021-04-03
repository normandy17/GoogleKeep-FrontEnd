import React, { useState,useEffect } from "react";
import Container from "@material-ui/core/Container";
import { Paper, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {Loading} from "../../Components/Loading/Loading";
import { Regreq } from "../../Redux/user/actions";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom"


const useStyles = makeStyles(theme => ({
    pageWrapper: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    pageContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: "1"
    },
    boxWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(3)
    },
    textWelcome: {
        ...theme.custom.fontFamily.metropolis
    },
    textLogin: {
        textDecoration: "none",
        color: theme.palette.secondary.dark
    },
    textLoginText: {
        ...theme.custom.fontFamily.metropolis,
        paddingTop: theme.spacing(3)
    },
    textNotice: {
        ...theme.custom.fontFamily.roboto,
        lineHeight: "unset",
        textAlign: "center",
        paddingTop: theme.spacing(2)
    },
    textAttribution: {
        padding: theme.spacing(0, 2, 2, 0),
        textAlign: "right"
    },
    textCreator: {
        textDecoration: "none",
        color: theme.palette.secondary.dark
    },
    registerButtonRoot: {
        marginTop: theme.spacing(3)
    },
    registerButtonText: {
        ...theme.custom.fontFamily.metropolis,
        color: theme.palette.secondary.contrastText,
        textTransform: "capitalize"
    },
    logo: {
        height: theme.spacing(7),
        padding: theme.spacing(0, 0, 1, 0)
    },
    inputRoot: {
        '&$inputFocused $inputNotchedOutline': {
            borderColor: theme.palette.secondary.main
        },
    },
    inputNotchedOutline: {},
    inputFocused: {},
    inputLabelRoot: {
        '&$inputFocused': {
            color: theme.palette.secondary.main
        },
    }
}));

export function Register ({ navigate }) {
    const classes = useStyles();
    const history=useHistory()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const isAuth  = useSelector(state => state.auth.isAuth);
    const error = useSelector(state => state.auth.error)
    const result = useSelector(state => state.auth.errormsg)
    const loading = useSelector(state => state.auth.loading)   
    const dispatch=useDispatch()

    useEffect(() => {
        if (isAuth) {
          history.push("/home");
        }
      }, [isAuth]);

    const inputProps = {
        classes: {
            root: classes.inputRoot,
            notchedOutline: classes.inputNotchedOutline,
            focused: classes.inputFocused
        }
    }
    const inputLabelProps = {
        classes: {
            root: classes.inputLabelRoot,
            focused: classes.inputFocused
        }
    }

    const onRegisterClick = ()=>{        
        dispatch(Regreq(name,email,password))
    }
    
    if (loading) return (<Loading />)
    
    return (
        <div className={classes.pageWrapper}>
            <Container maxWidth="md" className={classes.pageContainer}>
                <Paper elevation={3}>
                    <div className={classes.boxWrapper} >
                        <img className={classes.logo} src={`../logo.png`} alt={"logo"} />
                        <Typography className={classes.textWelcome} color="textSecondary" variant="subtitle1">Hello!</Typography>
                        <TextField required InputLabelProps={inputLabelProps} InputProps={inputProps} name="name" label="Name" type="text" variant="outlined" value={name} onChange={event => setName(event.target.value)} error={result === `"name" is not allowed to be empty`} helperText={result === `"name" is not allowed to be empty` && result} fullWidth margin="normal" />
                        <TextField required InputLabelProps={inputLabelProps} InputProps={inputProps} name="email" label="Email" type="email" variant="outlined" value={email} error={result === "User has already registered"} helperText={result === "User has already registered" && result } onChange={event => setEmail(event.target.value)} fullWidth margin="normal" />
                        <TextField required InputLabelProps={inputLabelProps} InputProps={inputProps} name="password" label="Password" type="password" variant="outlined" value={password} error={result === `"password" length must be at least 4 characters long`} helperText={result === `"password" length must be at least 4 characters long` && result} onChange={event => setPassword(event.target.value)} fullWidth margin="normal" />
                        <Button classes={{ root: classes.registerButtonRoot, label: classes.registerButtonText }} onClick={onRegisterClick} disabled={email === "" || password === ""} variant="contained" color="secondary" disableElevation fullWidth size="large">Register</Button>
                    </div>
                </Paper>
                <Typography className={classes.textLoginText} color="textSecondary" variant="body2">Already have an account? <Link className={classes.textLogin} to="/login">Log In</Link></Typography>
            </Container>
        </div>
    )
}