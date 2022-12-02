import React, { useState, useEffect } from 'react';
import { Container, Col} from 'react-bootstrap';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

/**
 * Components
 */
// Login component
import Login from './components/login';
// Registration component
import Registration from './components/registration';
// UserProfile component
import UserProfile from './components/userProfile';
// Message component
import VerifyMessage from './components/verifyMessage';
import WelcomeMessage from './components/welcomeMessage';

/**
 * Main function
 * 
 * It contains the variables use by the components
 * and the JSX framment with the components 
 * @returns
 */
function App() {

  // Variables e Hooks
  
  return (
    <>
      <Router>
      <Container>
        <Col>
        </Col>
        <Col>

          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            <Route exact path="/register" element={<Registration />}></Route>
            <Route exact path="/user" element={<UserProfile/>}></Route>
            <Route exact path="/welcome" element={<WelcomeMessage />}></Route>
            <Route exact path="/not-verify" element={<VerifyMessage />}></Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Col>
        <Col>
        </Col> 
      </Container>
    </Router>
    
    </>
  );


}

export default App;

/** <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/