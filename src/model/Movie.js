/**
 * The Movie Item
 */

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

  toggleLike() {
    this.like = !this.like;
  }
}
