import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from "../genre-view/genre-view";
import { Actorview } from '../actor-view/actor-view';
import { DirectorView } from '../director-view/director-view';
import { Navbar } from '../navbar-view/navbar-view';
import { RegistrationView } from '../registration-view/registration-view'
import { Userview } from '../user-view/user-view';

import './main-view.scss'

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'




export default class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
          movies: [],
          selectedMovie: null,
          user: null,
          register: null,
        }

        this.getUser = this.getUser.bind(this)
      }

      componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
          this.setState({
            user: localStorage.getItem('user')
          });
          this.getMovies(accessToken);
        }
      }

      

      setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
      }

      

      onLoggedIn(authData) {
        console.log(authData);
        this.setState({
          user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
      }

      onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
          user: null
        });
      }

      getMovies(token) {
        axios.get('https://myflix-by-jop.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
          this.setState({
            movies: response.data
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      }

      getUser() {
        const username = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        axios
          .get(`https://myflix-by-jop.herokuapp.com/user/username/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            this.setState({
              name: response.data.Name,
              username: response.data.Username,
              password: response.data.Password,
              email: response.data.Email,
              birthday: response.data.Birthday,
              favorites: response.data.Favorites
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }


      

      render() {
        const { movies, name, user, username, password, email, birthday, favorites } = this.state;

        

        return (
          

          <Router>
          
          <Route exact path="/" render={() => {
                console.log('login')
                if (user) return <Navbar user={user}></Navbar>
                
                 if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                
              
            }} />

            {/* Register view */}
            <Route exact path="/register" render={() => {
              if (user) return <Redirect to="/" />
                return <Col>
                  <RegistrationView
                  />
                </Col>
              }} />
          
          

            <div className="main-view">
        
            <Row className="main-view justify-content-md-center">
              <Route exact path="/" render={() => {
                return movies.map(m => (
                  <Col lg={3} md={6} sm={9} xs={6} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ))
              }} /> 

              <Route path="/movies/:movieId" render={({ match, history }) => {
                return <Col md={8}>
                  <Navbar user={user}></Navbar>
                  <MovieView movie={movies.find(m => m._id === match.params.movieId)} 
                  onBackClick={() => history.goBack()} />
                </Col>
              }} />


               <Route path="/genres/:name" render={({ match, history }) => { 
              if ( !user ) 
              return (
                <Col>
                  <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                </Col>
              );
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <Navbar user={user} ></Navbar>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()}/>
              </Col>
              }}  />


              <Route path="/directors/:name" render={({ match, history }) => { 
              if ( !user ) 
              return (
                <Col>
                  <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                </Col>
              );
              
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <Navbar user={user}></Navbar>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()}/>
              </Col>
              }}  />

              <Route path="/actors/:name" render={({ match, history }) => { 
              if ( !user ) 
              return (
                <Col>
                  <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                </Col>
              );
              
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <Navbar user={user}></Navbar>
                <Actorview actor={movies.find(m => m.Actor.Name === match.params.name).Actor} onBackClick={() => history.goBack()}/>
              </Col>
              }}  />

              {/* Path to Profile view  */}
            <Route  path="/user" render={() => {
              if ( !user ) 
              return (
                <Col>
                  <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                </Col>
              );
              if (movies.length === 0) return <div className="main-view" />;
              return (
              <>
              <Col>
              <Navbar user={user}></Navbar>
                <Userview 
                username={username} password={password} email={email} name={name}
                birthday={birthday} favorites={favorites}movies={movies}
                getUser={this.getUser}
                onBackClick={() => history.goBack()} removeMovie={(_id) => this.onRemoveFavorite(_id)} />
              </Col>
              </>)
            }} /> 
            </Row>
            </div>
          </Router>
        );
      }
    }

    
