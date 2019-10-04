/**
 * The Movie Database Api & Storage helper
 * See online documentation: https://www.themoviedb.org/documentation/api
 */

import Movie from './Movie';
import MovieStorage from './MovieStorage';
import MovieDbApi from './MovieDbApi';
import { MOVIE_POSTER_PATH } from '../consts';

class MovieFactory {
  async getRandomMovies() {
    try {
      // get some movies from our MovieDbApi
      const movies = await MovieDbApi.discover();

      // get the likes from our storage
      const likes = MovieStorage.getMovieLikes();

      // loop over every item and return a new movie object
      return movies.map((movieDbItem) => new Movie({
        id: movieDbItem.id,
        title: movieDbItem.title,
        overview: movieDbItem.overview,
        like: likes.includes(movieDbItem.id),
        posterUrl: `${MOVIE_POSTER_PATH}${movieDbItem.poster_path}`,
      }));
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

// export instance of our database
export default new MovieFactory();
