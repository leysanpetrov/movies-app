import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Spin, Alert } from 'antd'
import './MoviesList.css'
import { format } from 'date-fns'
import Movie from '../Movie/Movie'

export default class MoviesList extends Component {

  extendText (text, limit) {
    if (text.length <= limit) return text

    const shortcutText = text.slice(0, limit)
    const lastSpace = shortcutText.lastIndexOf(' ')

    return `${shortcutText.substring(0, lastSpace)}...`
  }

  formatDataMovie (date) {
    return date ? format(new Date(date), 'MMMM d, yyyy') : ''
  }

  render () {
    const { movies, loading, error } = this.props

    const movieList = movies?.map((movie) => (
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

    const noMoviesAlert = <Alert message="No results were found for your search" type="info" />
    const errorAlert = <Alert
      className="alert"
      message="BOOM!"
      description="something has gone terribly wrong (but we try to fix it)"
      type="error"
    />

    const list = !movieList?.length ? noMoviesAlert : movieList

    const content = loading ? <Spin className="spinner" size="large"/> : list

    const errorMessage = error ? errorAlert : null

      return (
        <ul className="movies-list">
          {errorMessage}
          {content}
        </ul>
        )
  }
}


