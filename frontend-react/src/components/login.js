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
import { Link } from 'react-router-dom';
import Message from './message';

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
function Login(props) {

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
  const onSubmit = data => {
    axios.post("/login", userLogin)
    .then(response => {
      console.log(response.data);
      // HERE THE REDIRECTION IN GOOD CASE
      if (response.status === 200){
        return <Message message={response.data.message}/>;
      } else if(response.response.data.status === 401 && response.data.problem === 'verification'){
        return <Message message={response.data.message} problem={response.data.problem}/>
      } else if (response.status === 401){
        alert(response.data.message);
      }
    })
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
      <Button variant="link">
        <Link to="/register">New user? Register</Link>        
      </Button>
    </Form>
  );
}

// Export the component
export default Login;
