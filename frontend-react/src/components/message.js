/**
 * Imports
 * 
 * @param {*} props 
 * @returns 
 */
 import Button from 'react-bootstrap/Button';

function Message(props) {
    const problem = props.problem
    let redirection, userText;

    console.log(props.message);

    if(problem){
        redirection = "/login";
        userText = "Go to login";
    } else {
        redirection = "/user";
        userText = "Go to your data";
    }

  return (
    <>
        <h3>{props.message}</h3>
        <Button variant="secondary" type='button' href={redirection}>{userText}</Button>
    </>
    
  );
}

export default Message;