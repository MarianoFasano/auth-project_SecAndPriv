/**
 * Imports
 * 
 * @param {*} props 
 * @returns 
 */
 import Button from 'react-bootstrap/Button';

function VerifyMessage() {
    
    /**
     * Variables
     */
     const userMessage = "Welcome, we know you, but you have not verified your account. Please verify it by the mail we sent to you during your the registration and than attempt once again the login :) !";
     const buttonText = "Go to login";
     const redirection = "/";

  return (
    <>
        <h3>{userMessage}</h3>
        <Button variant="secondary" type='button' href={redirection}>{buttonText}</Button>
    </>
    
  );
}

export default VerifyMessage;