import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function UserProfile() {

/**
 * Hooks
 */
// User name
const [name, setName] = useState('');
// User last name
const [lastName, setLastName] = useState('');
// User names
const [nameAndLastName, setNameAndLastName] = useState('');
// User email
const [email, setEmail] = useState('');
// User Birthday
const [birthday, setBirthday] = useState();
// User description
const [description, setDescription] = useState('');

// UseEffect to get the data from backend
useEffect(() => {
  const items = JSON.parse(localStorage.getItem('currentUser'));
  if (items == null){
    // If there are no information stored in the browser redirect to the login page
    return window.location.href = '/';
   }
  axios.get('/user', { headers: {"Authorization" : `${items.token_type} ${items.token}`} })
  .then(response => {
    // Get the user from the response
    const user = response.data.user;
    //const b_day = user.birthday.toISOString().split('T')[0];
    /**
     * Set the user data
     */
    // Name
    setName(user.name);
    // Last name
    setLastName(user.lastName);
    // Email
    setEmail(user.email);
    // Birthday    
    setBirthday(user.birthday);
    // Description
    setDescription(user.description);

  })
  .catch(error => {
    console.log('UseEffect error')
    console.log(error.response);
  });
}, []);

/**
 * Functions
 */
// Logout function
function logout() {
  // Send the request to the backend with axios
  axios.get('/logout')
  .then(response => {
    // Print information about logout
    alert(response.data.message);
    // Delete user info from the local storage in the client (so the token)
    localStorage.removeItem('currentUser');
    // Redirect to the login page
    window.location.href = '/';
  })
  .catch(error => {
    // Print in the browser terminal the error
    console.log(error.data);
  })
}

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
        <Card.Body>
          <Card.Title>Name</Card.Title>
          <Card.Text>
            {name}
          </Card.Text>
          <Card.Title>Lastname</Card.Title>
          <Card.Text>
            {lastName}
          </Card.Text>
          <Card.Title>Email</Card.Title>
          <Card.Text>
            {email}
          </Card.Text>
          <Card.Title>Birthday</Card.Title>
          <Card.Text>
            {birthday}
          </Card.Text>
          <Card.Title>Description</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
          {/**<Card.Link href="#">Modify</Card.Link>*/}
        </Card.Body>
      </Card>
      <Button variant="primary" onClick={logout}>
        Log out
      </Button>
    </>
  );
}

export default UserProfile;