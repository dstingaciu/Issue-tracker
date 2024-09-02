import './App.css';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import IssuesPage from './components/IssuesPage';
import NewIssuePage from './components/NewIssuePage';
import UpdateIssuePage from './components/UpdateIssuePage';



function App() {

  
  return (
    <Router>
    <div className="container">
        <h1>Issue Tracker</h1>
    
    <div>
      <button><Link to="/">View Issues</Link></button>
      <button><Link to="/create">Create Issue</Link></button>
    </div>
    <Routes>
      <Route path="/" element={<IssuesPage />} />
      <Route path="/create" element={<NewIssuePage />} />
      <Route path="/update/:id" element={<UpdateIssuePage />} />
    </Routes>
    </div>
    </Router>
  );
}

export default App;
