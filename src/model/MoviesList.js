/**
 * The Movie Database Api helper
 * See online documentation: https://www.themoviedb.org/documentation/api
 */

export default class MoviesList {
  constructor(movies) {
    this.movies = movies;
  }

  render() {
    // create a new movieslist container
    const moviesListContainer = document.createElement('div');
    moviesListContainer.id = 'moviesList';

    // loop over movies and add to our movies list container
    this.movies.forEach((movie) => {
      moviesListContainer.appendChild(movie.render());
    });

    // return the movies list
    return moviesListContainer;
  }
}
