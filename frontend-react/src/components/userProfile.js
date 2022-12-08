import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
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
// Subusers array
const [subUsers, setSubUsers] = useState([]);

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
    // Set subUsers
    setSubUsers(response.data.subusers);
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
    setBirthday(dateFunction(user.birthday));
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
        {/**
         * Image for future
         * <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
         */}
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
      {/**
       * Render the list of subusers if the user is an admin
       */}
       {subUsers.length>0 &&
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Birthday</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>

                {subUsers.map((user) => (
                  
                  <tr key={user.email}>
                    <td>{user.name}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{dateFunction(user.birthday)}</td>
                    <td>{user.description}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
       }
      <Button variant="primary" onClick={logout}>
        Log out
      </Button>
    </>
  );
}

// Function to extract the date
const dateFunction = (date) => {
  // Get user birthday yyyy-mm-dd
  const userBday = date.split('T')[0];
  // Birthday MM/DD/YYYY
  const b_day = userBday.split('-')[1] + '/' + userBday.split('-')[2] + '/' + userBday.split('-')[0];
  // Return the string
  return b_day;
}

export default UserProfile;