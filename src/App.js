import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import logo512 from "./assets/logo/logo512.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Compositions from "./pages/Compositions";

const MENU_LINKS = [
  { label: "Compositions", link: "/compositions", element: <Compositions /> },
];

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Navbar title="The Dream Team" logo={logo512} links={MENU_LINKS} />

          <div className="content">
            <Routes>
              <Route path="/">{/* <Home /> */}</Route>
              {MENU_LINKS.map((link) => (
                <Route path={link.link} id={link.link} element={link.element} key={link.link}/>
              ))}
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
