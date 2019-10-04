/**
 * The Movie Item
 */

import MovieStorage from '../model/MovieStorage';
import Component from './Component';

export default class MovieComponent extends Component {
  constructor(movie) {
    super();
    this.movie = movie;
  }

  toggleLike(e) {
    // prevent default behaviour
    e.preventDefault();

    // set the new state
    this.like = !this.like;

    // get the movie container
    const movieContainer = document.getElementById(this.id);
    const moviePoster = movieContainer.querySelector('.moviePoster');

    // remove existing classes
    moviePoster.classList.remove('like');
    moviePoster.classList.remove('dislike');

    // add new class (based on the lik/dislike status)
    moviePoster.classList.add(this.like ? 'like' : 'dislike');

    // save in the moviestorage
    if (this.like) MovieStorage.likeMovieId(this.id);
    else MovieStorage.dislikeMovieId(this.id);
  }

  render() {
    // create the movie container
    const movieContainer = document.createElement('div');
    movieContainer.id = this.movie.id;
    movieContainer.className = 'movie';

    // create a new movie link
    const anchor = document.createElement('a');
    anchor.href = '#';
    anchor.className = 'movieLink';
    anchor.id = this.movie.id;
    anchor.addEventListener('click', this.toggleLike.bind(this.movie));

    // add the movie poster container
    const moviePoster = document.createElement('img');
    moviePoster.className = 'moviePoster';
    moviePoster.className += this.movie.like ? ' like' : ' dislike';

    moviePoster.alt = this.movie.title;
    moviePoster.title = this.movie.title;
    moviePoster.src = this.movie.posterUrl;

    // append movie poster to anchor
    anchor.appendChild(moviePoster);

    // append anchor to movie container
    movieContainer.appendChild(anchor);

    // return the moviecontainer
    return movieContainer;
  }
}
