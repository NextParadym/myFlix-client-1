import React from 'react';

import { MovieCard } from '../movie-card/movie-card';

import { MovieView } from '../movie-view/movie-view';

export default class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
          movies: [
            { _id: 1, Title: 'Inception', Description: 'Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter peoples dreams and steal their secrets from their subconscious. His skill has made him a hot commodity in the world of corporate espionage but has also cost him everything he loves. Cobb gets a chance at redemption when he is offered a seemingly impossible task: Plant an idea in someones mind. If he succeeds, it will be the perfect crime, but a dangerous enemy anticipates Cobbs every move....', ImagePath: '../../../img/inception.jpg'},
            { _id: 2, Title: 'The Lord of the Rings', Description: 'Set in mythic pre-historic times, a young hobbit named Frodo Baggins inherits a magic ring from his elderly cousin Bilbo. Wise to the powers that the magic ring holds, the dark Lord Sauron wants it, knowing it will enable him to enslave the people of Middle Earth. In his effort to thwart Sauron, Frodo recruits the fellowship of a wizard, an elf, a dwarf and others on a mission to destroy the ring by casting it into the volcanic fires in the Crack of Doom. However, the ring unleashes its own power as a result of the struggle...', ImagePath: '../../../img/lotr1.jpg'},
            { _id: 3, Title: 'Mr. Nobody', Description: 'In 2092 the last mortal human (Jared Leto) on Earth reflects on his long past and thinks about the lives he might have led.', ImagePath: '../../../img/mrnobody.jpg'}
          ],
          selectedMovie: null
        }
      }

      setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
      }

      render() {
        const { movies, selectedMovie } = this.state;
    
    
        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    
        return (
          <div className="main-view">
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
              ))
            }
          </div>
        );
      }
    
    }