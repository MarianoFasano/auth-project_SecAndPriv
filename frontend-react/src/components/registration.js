// Imports
import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// Axios --> make http calls
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import "react-datepicker/dist/react-datepicker.css";

/**
 * Validation Schema
 */
 const schema = yup.object({
  // The email is required
  email: yup.string().email().required('Email is required to register'),
  // The password is required
  password: yup.string().required('Password is required to register').min(3, 'Password have to be minimum 3 char long'),
  // Password confirmation
  confirmPassword: yup.string().required('This field is required').oneOf([yup.ref('password')], 'Password does not match'),
  // User name
  name: yup.string().required('Name is required to register'),
  // User last name
  lastName: yup.string().required('Last name is required to register'),
  // The user description
  description: yup.string(),
}).required();


/**
 * Component declaration
 * 
 * The component provides multiple fields as email,
 * password and others new user's informations
 * @returns 
 */
function Registration(props) {
  const reCaptcha = useRef();
  // Registration hooks
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  // DatePicker hooks --> the default value is the currently date
  const [startDate, setStartDate] = useState(new Date());
  const [token, setToken] = useState("");


  // Destruct necessary in order to manage the inputs/forms validation
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema)});

  const onSubmit = (data) => {
    //
    //const token = reCaptcha.current.getValue();
    reCaptcha.current.reset();

    // Form data to send
    const userRegistration = {
      email: email,
      name: name,
      lastName: lastName,
      password: password,
      birthday: startDate,
      description: description,
      token: token,
    }
    
    axios.post("/registration", userRegistration)
    .then(response => {
      // Post correctely the new user
      if (response.status === 201) {
        // Redirect to root route
        window.location.href = '/';
      }
      // Handle the error status
      
    })
    .catch((error) =>{
      // Print into the console and on window the error
      //console.log(error.response);
      alert(error.response.data.error);
    })
    .finally(() => {
      setToken('');
    })
  };
  // Recaptcha on change handle function
  function onChange(value) {
    setToken(value);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} >
      {/** In this field the user inserts his/her email address */}  
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control {...register("email")} type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      {/** The 'error' message when the email's field is empty */}
      <p style={{color:"red"}}>{errors.email?.message}</p>

      {/** In this field the user inserts the password that
       *  he/she wants to use
       */}  
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control {...register("password")} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>
      {/** The 'error' message when the email's field is empty */}
      <p style={{color:"red"}}>{errors.password?.message}</p>

      {/** In this field the user confirms his/her password */}  
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control {...register("confirmPassword")} type="password" placeholder="Confirm password" />
      </Form.Group>
      {/** The 'error' message when the email's field is empty */}
      <p style={{color:"red"}}>{errors.confirmPassword?.message}</p>

      {/** In this field the user writes his/her name */}  
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Name</Form.Label>
        <Form.Control {...register("name")} type="name" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
      </Form.Group>
      {/** The 'error' message when the email's field is empty */}
      <p style={{color:"red"}}>{errors.name?.message}</p>
      
      {/** In this field the user writes his/her last name */}  
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Last name</Form.Label>
        <Form.Control {...register("lastName")} type="lastName" placeholder="Last name" onChange={(e) => setLastName(e.target.value)}/>
      </Form.Group>
      {/** The 'error' message when the email's field is empty */}
      <p style={{color:"red"}}>{errors.lastName?.message}</p>

      {/** In this field the user selects his/her birthday */}   
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Select your birthday</Form.Label>
        {/** filterDate hides the futures dates */}
        <DatePicker type="birthday" placeholderText='Select your birthday' filterDate={(date) => { return (new Date()) > date}} selected={startDate} onChange={(date) => setStartDate(date)} />
      </Form.Group>

      {/** In this field the user describes his/her-self */}  
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Describe yourself</Form.Label>
        <Form.Control {...register("description")} type="description" as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)}/>
      </Form.Group>
      {/** The 'error' message when the email's field is empty */}
      <p style={{color:"red"}}>{errors.description?.message}</p>

      {/**
       * Here the recaptcha, I'm not a robot
       */}
       <ReCAPTCHA
        ref={reCaptcha}
        sitekey='6LdzkEMjAAAAAKstRv5rbbkTGOJKPFkq-0Sw0wG7'
        onChange={onChange}
        onExpired={e => setToken('')}
        ></ReCAPTCHA>

      {/**
       * This button confirms the new user's informations
       * and sends the data to the backend for the db registration
       */}
      <Button variant="primary" type="submit">
        Register
      </Button>
      {/** This button cancels the registration and
       * sends the user to the login page
       */}
      <Button variant="danger" type="button" href="/">
        Cancel
      </Button>
    </Form>
  );
}

// Export the component
export default Registration;
