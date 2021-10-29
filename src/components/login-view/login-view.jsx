import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login-view.scss';

import {  BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';



export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication, then call props.onLoggedIn(username)
    axios.post('https://myflix-by-jop.herokuapp.com/login', {
        Username: username,
        Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('User not found')
    });
  };


  return (
    <Router>

    <Form>
    <h1 className="form-title">Login</h1>
      <Form.Group controlId="form-Username">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Enter Password"  onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <div className="buttons-login">
      <Button variant="success link" type="submit" onClick={handleSubmit}>Submit</Button>
      <Button onClick={() => {window.location.href="/register"}} variant="primary" type="button">Register</Button>
      </div>
    </Form>
    
    

    </Router>
  );
}

LoginView.propTypes = {
  login: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};