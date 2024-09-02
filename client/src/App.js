import "./App.css";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import IssuesPage from "./components/IssuesPage";
import NewIssuePage from "./components/NewIssuePage";
import UpdateIssuePage from "./components/UpdateIssuePage";
import { Button, ThemeProvider } from "@mui/material";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="container">
          <h1>Issue Tracker</h1>

          <div>
            <Button type="submit" variant="contained" color="primary" href="/">
             View Issues
            </Button>
            <Button type="submit" variant="contained" color="secondary" href="/create">
              Create Issue
            </Button>
          </div>
          <Routes>
            <Route path="/" element={<IssuesPage />} />
            <Route path="/create" element={<NewIssuePage />} />
            <Route path="/update/:id" element={<UpdateIssuePage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
