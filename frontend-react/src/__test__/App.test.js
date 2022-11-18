/**
 * App test
 */

// Imports, general
import React from 'react';
import { unmountComponentAtNode } from "react-dom";
import { fireEvent, render, screen } from '@testing-library/react';
// Import, testing component
import App from '../App';

/**
 * Setups, based on https://it.reactjs.org/docs/testing-recipes.html
 */ 
 let container = null;
 // Before each function ...
 beforeEach(() => 
 {
     // setup a DOM element as a render target
     container = document.createElement("div");
     document.body.appendChild(container);
 });
 
 // After each function ...
 afterEach(() =>
 {
     // cleanup on exiting
     unmountComponentAtNode(container);
     container.remove();
     container = null;
 });
 
 /**
  * Tests
  */
 
 // Test if the component is rendered
 it('render App component', () =>
 {
     // Render App element
     render(<App/>);
     // Get the login button
     const loginButton = screen.getByRole('button', { name: /Login/i});
     // Get the register link
     const registerButton = screen.getByText('New user? Register');
     // Check if the variables are in the document, it means that the component is rendered correctely
     expect(loginButton).toBeInTheDocument();
     expect(registerButton).toBeInTheDocument();
 });
 
 // Test the click on the register link --> render the registration form
 it('click on register link', () =>
 {
     // Render App element
     render(<App/>);
     // Get the register link
     const registerLink = screen.getByText('New user? Register');
     // Check if the variables are in the document, it means that the component is rendered correctely
     expect(registerLink).toBeInTheDocument();
     // Click on the register link
     fireEvent.click(registerLink);

     /**
      * After the click we expected to have the registration form
      */
     // Get the register button
     const registerButton = screen.getByRole('button', { name: /Register/i});
     // Get the login button
     const cancelButton = screen.getByRole('button', { name: /Cancel/i});
     // Check if the variables are in the document, it means that the component is rendered correctely     
     expect(registerButton).toBeInTheDocument();
     expect(cancelButton).toBeInTheDocument();
 });
