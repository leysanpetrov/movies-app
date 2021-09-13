import React, {Component} from 'react';
import './MoviesList.css';
import { format } from 'date-fns'
import Movie from '../Movie/Movie'
import MoviedbService from '../../services/MoviedbService'

export default class MoviesList extends Component {

  moviedbService = new MoviedbService()

  state = {
    movies: null
  }

  constructor () {
    super();
    this.getMovies()
  }

  getMovies () {
    this.moviedbService
      .getAllMovies()
      .then((movies) => {
        this.setState({
          movies
        })
      })
  }

  extendText(text, limit) {
    // text = text.trim();
    if( text.length <= limit) return text;

    const shortcutText = text.slice( 0, limit);
    const lastSpace = shortcutText.lastIndexOf(" ");

    return `${ shortcutText.substring(0, lastSpace) }...`;
  }

  formatDataMovie(date) {
    return format(new Date(date), 'MMMM d, yyyy')
  }

  render () {
    const { movies } = this.state

    const list = movies?.map((movie) => (
          <li key={movie.id}>
            <Movie
              title={movie.title}
              date={this.formatDataMovie(movie.date)}
              action={movie.action}
              drama={movie.drama}
              overview={this.extendText(movie.overview, 207)}
              image={movie.image}
            />
          </li>
      ))
    return (
      <ul> { list } </ul>
    )
  }
}


