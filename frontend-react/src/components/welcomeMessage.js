/**
 * Imports
 * 
 * @param {*} props 
 * @returns 
 */
 import Button from 'react-bootstrap/Button';

function WelcomeMessage() {

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