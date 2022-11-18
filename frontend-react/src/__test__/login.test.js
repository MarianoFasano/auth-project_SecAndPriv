/**
 * Login test
 */

// Imports, general
import React from 'react';
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from '@testing-library/react';

// Import, testing component
import Login from '../components/login';

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
it('render Login component', () =>
{
    // Render Login element
    render(<Login/>);
    // Get the email address field
    const emailElement = screen.getByPlaceholderText(/Enter email/i);
    // Get the password field
    const passwordElement = screen.getByPlaceholderText(/Password/i);
    // Check if the variables are in the document, it means that the component is rendered correctely
    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
});
