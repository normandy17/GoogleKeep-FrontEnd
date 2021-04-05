import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { searchQuery } from "../../Redux/Search/actions";
import AppBar from "../../Components/navbar/navbar";
import NotesArea from "../../Components/feed/searchedTasksContainer";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { dark, light } from "../../Components/theme";
import {Loading} from "../../Components/Loading/Loading"


export function SearchResult(props) {
  const dispatch = useDispatch()
  const id = useSelector(state => state.auth.id);
  const history = useHistory()
  const currTheme = useSelector(state => state.theme.theme);
  const loading = useSelector(state => state.search.isLoading);

  useEffect(() => {
    let query = history.location.search.split("=")[1];
    dispatch(searchQuery({ id, query }));
  }, [history.location.search]);

  return (
    <>
      <ThemeProvider theme={currTheme ? dark : light}>
        <CssBaseline />
        <AppBar />
        <Container maxWidth={false}>
          <Box mt={8}>
            {!loading && <NotesArea />}
            {loading && <Loading></Loading>}
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
