import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Form from './components/Form/Form';
import ViewEmployees from './components/View/ViewEmployees';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add-employee">Add Employee</Link>
            </li>
            <li>
              <Link to="/view-employees">View Employees</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<h1>Welcome to Employee Management System</h1>} />
          <Route path="/add-employee" element={<Form />} />
          <Route path="/view-employees" element={<ViewEmployees />} />
          <Route path="*" element={<h1 className="page-not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
