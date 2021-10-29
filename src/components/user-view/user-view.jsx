import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Form, Row, Container } from 'react-bootstrap';
import './user-view.scss';


export class Userview extends React.Component {
  constructor(props) {
    super(props);
  }

  removeFavouriteMovie(_id) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    console.log(_id, '_id')
    axios.delete(`https://myflix-by-jop.herokuapp.com/user/favorites/delete/${user}/movies/${movies._id}`, {

      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      alert ('Favorite was removed')
      window.location.reload(); 

      

    })
    .catch(function (error) {
      console.log(error);
    })
  }
  deleteUser() {

    const answer = window.confirm("Are you sure you want to delete your account?");
    if (answer) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
        axios.delete( `https://myflix-by-jop.herokuapp.com/user/delete/${user}`,
          { headers: { Authorization: `Bearer ${token}` } }
          )
          .then(() => {
            alert(user + " has been deleted.");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.pathname = "/";
          })
          .catch(function (error) {
              console.log(error);
          })};
          
      }

   render() {
    const { movies, user, username, email, password, birthday, favorites } = this.props;

    return(
      <Container className="User-view">
        <Row className="justify-content-md-center">
          <Col className="user-info">
            <p>Username: {username}</p>
            <p>Password: *******</p>
            <p>Email: {email}</p>
            <p>Birthday: {birthday}</p>
          </Col>
        </Row>
          
          <Row>
            <Col className="acc-btns mt-1">
              <Button size="md" variant="outline-danger" type="submit" ml="4" onClick={() => this.deleteUser()} >Delete Account</Button>
            </Col>
            
         </Row>
     </Container>
    )
   }  
}