import React from 'react';
import axios from 'axios';
import { Button, Card, Col, Form, Row, Container } from 'react-bootstrap';
import './user-view.scss';


export class Userview extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favorites: [],
    };
  }

  componentDidMount() {
    this.props.getUser()
  }

  removeFavouriteMovie(_id) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    console.log(_id, '_id')
    axios.delete(`https://myflix-by-jop.herokuapp.com/user/favorites/delete/${user}/movies/${_id}`, {

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
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.location.pathname = "/";
          })
          .catch(function (error) {
              console.log(error);
          })};
          
      }

      editUser(e) {
        e.preventDefault();
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
    
        axios.put(`https://myflix-by-jop.herokuapp.com/user/update/${username}`,
          {
            Name: this.state.Name,
            Username: this.state.Username,
            Password: this.state.Password,
            Email: this.state.Email,
            Birthday: this.state.Birthday
          },
          { headers: { Authorization: `Bearer ${token}` }
          })
          .then((response) => {
            this.setState({
              Name: response.data.Name,
              Username: response.data.Username,
              Password: response.data.Password,
              Email: response.data.Email,
              Birthday: response.data.Birthday
            });
            localStorage.setItem('user', this.state.Username);
            const data = response.data;
            console.log(data);
            console.log(this.state.Username);
            alert('Profile updated');
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          })
      }

      setName(value) {
        this.state.Name = value;
      }

      setUsername(value) {
        this.state.Username = value;
      }
    
      setPassword(value) {
        this.state.Password = value;
      }
    
      setEmail(value) {
        this.state.Email = value;
      }
    
      setBirthday(value) {
        this.state.Birthday = value;
      }


   render() {
    const { movies, user, name, username, email, password, birthday, favorites } = this.props;

    console.log({username})

    return(
      <Container className="UserView">
        <Row className="justify-content-md-center">
          <Col className="user-info">
          <div className="profileContent">
            <h1>MY PROFILE</h1>
          </div>
            <h4>Name: {name}</h4>
            <h4>Username: {username}</h4>
            <h4>Password: *******</h4>
            <h4>Email: {email}</h4>
            <h4>Birthday: {birthday}</h4>
          </Col>
        </Row>
          <Row>
          
          </Row>
          <div className="profileInformation">        
          <Form className="formDisplay" onSubmit={(e) => this.editUser(e)}>
          <div>
            <h3>EDIT PROFILE</h3>
          </div>
          <Form.Group>
              Name
              <Form.Control type='text' name="Name" placeholder="New Name" onChange={(e) => this.setName(e.target.value)} />
            </Form.Group>

            <Form.Group>
              Username
              <Form.Control type='text' name="Username" placeholder="New Username" onChange={(e) => this.setUsername(e.target.value)} required />
            </Form.Group>

            <Form.Group>
              Password
              <Form.Control type='password' name="Password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} required />

            </Form.Group>
            <Form.Group>
              Email Address
              <Form.Control type='email' name="Email" placeholder="New Email" onChange={(e) => this.setEmail(e.target.value)} required />

            </Form.Group>
            <Form.Group>
              Birthday
              <Form.Control type='date' name="Birthday" onChange={(e) => this.setBirthday(e.target.value)} />

            </Form.Group>
            <div className="marginSpacer">
              <Button variant="success" type="submit" >Update</Button>
            </div>
          </Form>
          </div>
          <Row>
            <Col className="acc-btns mt-1">
              <Button size="md" variant="outline-danger" type="submit" ml="4" onClick={() => this.deleteUser()} >Delete Account</Button>
            </Col>
            
         </Row>
     </Container>
    )
   }  
}