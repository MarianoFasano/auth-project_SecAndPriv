/**
 * Imports
 * 
 * @param {*} props 
 * @returns 
 */
 import {  useEffect } from 'react';
 import Button from 'react-bootstrap/Button';

function WelcomeMessage() {

  // UseEffects to check if the user is not logged in
  useEffect(() => {
    // Get the user info stored in the browser
    const items = JSON.parse(localStorage.getItem('currentUser'));
     if (items == null){
      // If there are no informations stored in the browser redirect to the login page, user is not logged in
      return window.location.href = '/';
     }
  }, []);

    /**
     * Variables
     */
     const userMessage = "Welcome, you logged in successfully!";
     const buttonText = "Go to your data";
     const redirection = "/user";

  return (
    <>
        <h3>{userMessage}</h3>
        <Button variant="secondary" type='button' href={redirection}>{buttonText}</Button>
    </>
    
  );
}

export default WelcomeMessage;