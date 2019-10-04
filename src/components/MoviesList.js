/**
 * The MoviesList Component
 */

import MovieComponent from './MovieComponent';
import Component from './Component';

export default class MoviesList extends Component {
  constructor(movies) {
    super();
    this.movies = movies;
  }

  render() {
    // create a new movieslist container
    const moviesListContainer = document.createElement('div');
    moviesListContainer.id = 'moviesList';

    // loop over movies and add to our movies list container
    this.movies.forEach((movie) => {
      moviesListContainer.appendChild(new MovieComponent(movie).render());
    });

    // return the movies list
    return moviesListContainer;
  }
}
