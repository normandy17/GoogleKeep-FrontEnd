import "./App.css";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { Routes } from "./Routes";
import { light } from "./Components/theme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={light}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </div>
  );
}

export default App;
