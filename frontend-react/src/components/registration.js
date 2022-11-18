// Imports
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import "react-datepicker/dist/react-datepicker.css";

/**
 * Validation Schema
 */
 const schema = yup.object({
  // The email is required
  email: yup.string().email().required('Email is required to register'),
  // The password is required
  password: yup.string().required('Password is required to register'),
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

  // Desctruct necessary in order to manage the inputs/forms validation
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema)});
  const onSubmit = data => console.log(data);

  // DatePicker hooks --> the default value is the currently date
  const [startDate, setStartDate] = useState(new Date());

  return (
    <Form onSubmit={handleSubmit(onSubmit)} >
      {/** In this field the user inserts his/her email address */}  
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control {...register("email")} type="email" placeholder="Enter email" />
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
        <Form.Control {...register("password")} type="password" placeholder="Password" />
      </Form.Group>
      {/** The 'error' message when the email's field is empty */}
      <p style={{color:"red"}}>{errors.password?.message}</p>

      {/** In this field the user confirms his/her password */}  
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control {...register("confirmPassword")} type="confirmPassword" placeholder="Confirm password" />
      </Form.Group>
      {/** The 'error' message when the email's field is empty */}
      <p style={{color:"red"}}>{errors.confirmPassword?.message}</p>

      {/** In this field the user writes his/her name */}  
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Name</Form.Label>
        <Form.Control {...register("name")} type="name" placeholder="Name" />
      </Form.Group>
      {/** The 'error' message when the email's field is empty */}
      <p style={{color:"red"}}>{errors.name?.message}</p>
      
      {/** In this field the user writes his/her last name */}  
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Last name</Form.Label>
        <Form.Control {...register("lastName")} type="lastName" placeholder="Last name" />
      </Form.Group>
      {/** The 'error' message when the email's field is empty */}
      <p style={{color:"red"}}>{errors.lastName?.message}</p>

      {/** In this field the user selects his/her birthday */}   
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Select your birthday</Form.Label>
        <DatePicker {...register("birthday")} type="birthday" selected={startDate} onChange={(date) => setStartDate(date)} />
      </Form.Group>
      {/** The 'error' message when the email's field is empty */}
      <p style={{color:"red"}}>{errors.birthday?.message}</p>

      {/** In this field the user describes his/her-self */}  
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Describe yourself</Form.Label>
        <Form.Control {...register("description")} type="description" as="textarea" rows={3} />
      </Form.Group>
      {/** The 'error' message when the email's field is empty */}
      <p style={{color:"red"}}>{errors.description?.message}</p>

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
      <Button variant="danger" type="button" onClick={props.changeViewToLogin}>
        Cancel
      </Button>
    </Form>
  );
}

// Export the component
export default Registration;
