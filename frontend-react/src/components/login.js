/**
 * Imports
 */
import React, { useState, useEffect, Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// UseForm --> validation for react's form
import { useForm } from 'react-hook-form';
// YupResolver
import { yupResolver } from '@hookform/resolvers/yup';
// Yup --> validate schemas for react
import * as yup from 'yup';
// Axios --> make http calls
import axios from 'axios';

/**
 * Validation Schema
 */
const schema = yup.object({
  // The email is required
  email: yup.string().required('Email is required to login'),
  // The password is required
  password: yup.string().required('Password is required to login'),
}).required();

/**
 * Component declaration
 * 
 * The component provides multiple fields as email,
 * password to log in the user
 * @returns 
 */
function Login() {

  // UseEffects to check if the user is already logged in
  useEffect(() => {
    // Get the user info stored in the browser
    const items = JSON.parse(localStorage.getItem('currentUser'));
     if (items != null){
      // If there are informations stored in the browser redirect to the welcome page, user already logged in
      return window.location.href = '/welcome';
     }
  }, []);

  // Registration hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Form data to send
  const userLogin = {
    email: email,
    password: password,
  }

  // Destruct necessary in order to manage the inputs/forms validation
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema)});
  // onSubmit function call on the nodejs backend
  const onSubmit = (data) => {
    axios.post("/login", userLogin)
    .then((response) => {
      // HERE THE REDIRECTION IN GOOD CASE
      if (response.status === 200){
        // Store user details and jwt in the local storage
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        // Redirect to the welcome page
        window.location.href = '/welcome';
      }
    })
    .catch((error) =>{
      // Response variable
      const res = error.response;
      if(res.status === 401 && res.data.problem === 'verification'){
        // Redirect to the welcome page
        window.location.href = '/not-verify';
      } else if (res.status === 401){
        alert(res.data.message);
      } else if(res.status === 404){
        alert(res.data.message); 
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/** In this field the user inserts his/her email address */}  
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control {...register("email")} type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}
        aria-invalid={errors.email ? "true" : "false"} />
      </Form.Group>
      {/** The 'error' message when the email's field is empty */}
      <p style={{color:"orangered"}}>{errors.email?.message}</p>

      {/** In this field the user inserts his/her password */}  
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control {...register("password")} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}
        aria-invalid={errors.password ? "true" : "false"} />
      </Form.Group>
      {/** The 'error' message when the password's field is empty */}
      <p style={{color:"orangered"}}>{errors.password?.message}</p>
      {/**
       * This button confirms the new user's informations
       * and sends the data to the backend to check credentials
       */}
      <Button variant="primary" type="submit">
        Login
      </Button>
      {/** This link redirects the user to the registration form
       */}
      <Button variant="link" href="/register">
        New user? Register       
      </Button>
    </Form>
  );
}

// Export the component
export default Login;
