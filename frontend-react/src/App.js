import React, { useState, useEffect } from 'react';
import { Container, Col} from 'react-bootstrap';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

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
import Message from './components/message';

/**
 * Main function
 * 
 * It contains the variables use by the components
 * and the JSX framment with the components 
 * @returns
 */
function App() {

  // Variables e Hooks
  
  /**
   * This hook tells the system which view show to the user
   * true  --> user login
   * false --> user not login
   */
  const [isUserLogged, setisUserLogged] = useState(false);
  /**
   * 
   */
  const [messageToUser, setMessageToUser] = useState("");
  /**
   * 
   */
  const [problemOccured, setProblemOccured] = useState("");
  /**
   * Function that change the value of 'isLoginView'
   * true  --> login form
   * false --> register form
   */
  function changeUserLogStatus() {
    setisUserLogged(isUserLogged => !isUserLogged);
  };
  /**
   * Function to set the message to show to the user
   */
  const setMessage = (messageText) => {
    setMessageToUser(messageText);
  };
  /**
   * Function to set the problem, if there is one
   */
  const setProblem = (problemText) => {
    setProblemOccured(problemText);
  }
  return (
    <>
      <Router>
      <Container>
        <Col>
        </Col>
        <Col>

          <Routes>
            <Route exact path="/" element={<Login setMessage={setMessage} setProblem={setProblem}/>}></Route>
            <Route exact path="/register" element={<Registration />}></Route>
            <Route exact path="/user" element={<UserProfile/>}></Route>
            <Route exact path="/welcome" element={<Message message={messageToUser} problem={problemOccured}/>}></Route>
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