import React from "react";
import AppBar from "../../Components/navbar/navbar";
import NavDrawer from "../../Components/drawer/drawer";
import NotesArea from "../../Components/feed/tasksContainer";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { dark, light } from "../../Components/theme";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../Redux/taskRedux/actions";



export const Feed = () => {

    const dispatch = useDispatch()
    const id = useSelector(state => state.auth.id);
    var i=0

    React.useEffect(() => {        
        dispatch(getTasks(id))
    }, []);

    const currTheme = useSelector(state => state.theme.theme);
    
    return (
        <>
            <ThemeProvider theme={currTheme ? dark : light}>
                <CssBaseline />
                <AppBar />
                <NavDrawer />
                <Container maxWidth={false}>
                    <Box mt={8}>
                        <NotesArea />
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}

