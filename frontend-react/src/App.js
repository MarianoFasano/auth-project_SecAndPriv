import React, { useState, useEffect } from 'react';
import { Container, Col} from 'react-bootstrap';
import './App.css';
import Login from './components/login';
import Registration from './components/registration';
import UserProfile from './components/userProfile';

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
   * true  --> login form
   * false --> register form
   */
  const [isLoginView, setLoginRegisterView] = useState(true);

  return (
    <>
    <Container>
      <Col>
      </Col>
      <Col>
        { isLoginView && <Login changeViewToRegister={loginOrregisterView}/>}
        { !isLoginView && <Registration changeViewToLogin={loginOrregisterView}/>}
        < UserProfile></UserProfile>
      </Col>
      <Col>
      </Col> 
    </Container>
    
    </>
  );

  /**
   * Function that change the value of 'isLoginView'
   * true  --> login form
   * false --> register form
   */
  function loginOrregisterView() {
    setLoginRegisterView(isLoginView => !isLoginView);
  }
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