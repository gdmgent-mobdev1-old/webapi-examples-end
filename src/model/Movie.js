/**
 * The Movie Item
 */

import MovieStorage from './MovieStorage';

export default class Movie {
  constructor({
    id, title, overview, posterUrl, like,
  }) {
    this.id = id;
    this.title = title;
    this.overview = overview;
    this.posterUrl = posterUrl;
    this.like = like;
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
    movieContainer.id = this.id;
    movieContainer.className = 'movie';

    // create a new movie link
    const anchor = document.createElement('a');
    anchor.href = '#';
    anchor.className = 'movieLink';
    anchor.id = this.id;
    anchor.addEventListener('click', this.toggleLike.bind(this));

    // add the movie poster container
    const moviePoster = document.createElement('img');
    moviePoster.className = 'moviePoster';
    moviePoster.className += this.like ? ' like' : ' dislike';

    moviePoster.alt = this.title;
    moviePoster.title = this.title;
    moviePoster.src = this.posterUrl;

    // append movie poster to anchor
    anchor.appendChild(moviePoster);

    // append anchor to movie container
    movieContainer.appendChild(anchor);

    // return the moviecontainer
    return movieContainer;
  }
}
