// Imports
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

  // Desctruct necessary in order to manage the inputs/forms validation
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema)});
  const onSubmit = data => console.log(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/** In this field the user inserts his/her email address */}  
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control {...register("email")} type="email" placeholder="Enter email"
        aria-invalid={errors.email ? "true" : "false"} />
      </Form.Group>
      {/** The 'error' message when the email's field is empty */}
      <p style={{color:"orangered"}}>{errors.email?.message}</p>

      {/** In this field the user inserts his/her password */}  
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control {...register("password")} type="password" placeholder="Password"
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
      <Button variant="link" onClick={props.changeViewToRegister}>
        New user? Register
      </Button>
    </Form>
  );
}

// Export the component
export default Login;
