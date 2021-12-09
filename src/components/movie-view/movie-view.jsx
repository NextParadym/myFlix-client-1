import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

import "./movie-view.scss";




export class MovieView extends React.Component {

  constructor(props) {
    super(props);

}



addFavoriteMovie() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`https://myflix-by-jop.herokuapp.com/user/favorites/${username}/movies/${this.props.movie._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'POST'
    })
        .then(response => {
            alert(`Added to Favorites List`)
        })
        .catch(function (error) {
            console.log(error);
        });
};

  render() {
    const { movie, onBackClick } = this.props;
    return (

      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <Link to={`/genres/${movie.Genre.Name}`} className="value">{movie.Genre.Name}</Link>
          
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <Link to={`/directors/${movie.Director.Name}`} className="value">{movie.Director.Name}</Link>

        </div>
        <div className="movie-actors">
          <span className="label">Actors: </span>
        

          {movie.Actors.map((actor) => (<Link key={actor.Name} to={`/actors/${actor.Name}`} className="value">{actor.Name}
          </Link>)).reduce((prev, curr) => [prev, ", ", curr])}
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
        <Button variant="outline-primary" className="btn-outline-primary" value={movie._id} onClick={(e) => this.addFavoriteMovie(e, movie)}>Add to Favorites</Button>

      </div>
    );
  }
}

MovieView.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImgPath: PropTypes.string.isRequired,
    Genre: PropTypes.array.isRequired,
    Director: PropTypes.array.isRequired,
    Actors: PropTypes.array.isRequired,
    Featured: PropTypes.bool.isRequired,
  }),
};


