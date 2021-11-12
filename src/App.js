import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import logo512 from "./assets/logo/logo512.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Compositions from "./pages/Compositions";
import { useState } from "react";
import goat_transparent from "./assets/goat_transparent.png";
import goat from "./assets/logo/goat.png";
import Home from "./pages/Home";

const theme = createTheme();

function App() {
  const [goats, setGoats] = useState(false);

  const MENU_LINKS = [
    {
      label: "Compositions",
      link: "/compositions",
      element: <Compositions goats={goats} />,
    },
  ];

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div
          className="App"
          style={{
            backgroundImage: goats ? `url(${goat_transparent})` : "",
            backgroundSize: "repeat",
            minHeight: "100vh",
          }}
        >
          <Navbar
            title={goats ? "The Goats Team" : "The Dream Team"}
            logo={goats ? goat : logo512}
            links={MENU_LINKS}
            letThereBeGoats={() => setGoats(!goats)}
            goats={goats}
          />

          <div className="content">
            <Routes>
              <Route path="/" element={<Home goats={goats} />} />
              {MENU_LINKS.map((link) => (
                <Route
                  path={link.link}
                  id={link.link}
                  element={link.element}
                  key={link.link}
                />
              ))}
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
