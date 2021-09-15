import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { Spin, Alert } from 'antd';
import './MoviesList.css';
import { format } from 'date-fns'
import Movie from '../Movie/Movie'

import MoviedbService from '../../services/MoviedbService'

export default class MoviesList extends Component {

  moviedbService = new MoviedbService()

  state = {
    movies: null,
    loading: true
  }

  constructor () {
    super();
    this.getMovies()
  }

  onError = () => {
      this.setState({
        error: true,
        loading: false,
      })
  }

  getMovies () {
    this.moviedbService
      .getAllMovies()
      .then((movies) => {
        this.setState({
          movies,
          loading: false,
          error: false
        })
      })
      .catch(this.onError)
  }

  extendText(text, limit) {

    if( text.length <= limit) return text;

    const shortcutText = text.slice( 0, limit);
    const lastSpace = shortcutText.lastIndexOf(" ");

    return `${ shortcutText.substring(0, lastSpace) }...`;
  }

  formatDataMovie(date) {
    return format(new Date(date), 'MMMM d, yyyy')
  }

  render () {
    const { movies, loading, error } = this.state

    const list = movies?.map((movie) => (
          <li className="movie" key={movie.id}>
            <Movie
              title={movie.title}
              date={this.formatDataMovie(movie.date)}
              action={movie.action}
              drama={movie.drama}
              overview={this.extendText(movie.overview, 150)}
              image={movie.image}
            />
          </li>
      ))


    const content = loading ? <Spin className="spinner" size="large" /> : list
    const error1 = <Alert
      className="alert"
      message="BOOM!"
      description="something has gone terribly wrong (but we try to fix it)"
      type="error"
    />

    const errorMessage  =  error ? error1 : null;

    return (
      <ul className="movies-list">
        { content }
        { errorMessage }
      </ul>
    )
  }
}


