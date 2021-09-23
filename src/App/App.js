import React, { Component } from 'react'
import { debounce } from 'lodash'
import './App.css'
import 'antd/dist/antd.css'
import { Input, Pagination } from 'antd'
import MoviesList from '../components/MoviesList/MoviesList'
import Navigation from '../components/Navigation/Navigation'
import MoviedbService from '../services/MoviedbService'


export default class App extends Component {

  moviedbService = new MoviedbService()

  state = {
    movies: null,
    loading: true,
    query: undefined,
    page: 1,
    totalItems: null
  }

  componentDidMount () {
    this.getMoviesByName()
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  getMoviesByName () {
    const { query, page } = this.state
    this.moviedbService
      .getMovies(query, page)
      .then(({ movies, totalResults: totalItems }) => {
        this.setState({
          movies,
          totalItems,
          loading: false,
          error: false
        })
      })
      .catch(this.onError)
  }


  onChangeQuery = (ev) => {
      this.setState({
        query: ev.target.value ? ev.target.value : undefined
      }, this.getMoviesByName)
  }

  onChangePage = (actualPage) => {
    this.setState({
      page: actualPage
    }, this.getMoviesByName)
  };

  render () {
    const { page, movies, loading, error, totalItems} = this.state

    return (
      <div className="container-box">
        <Navigation/>
        <Input placeholder="Basic usage"
               onChange={debounce(this.onChangeQuery,1500)}
        />
        <MoviesList
                    movies= {movies}
                    loading={loading}
                    error={error}
        />
        <Pagination size="small"
                    defaultCurrent={1}
                    total={totalItems} className="pagination"
                    page={page}
                    onChange={this.onChangePage}
        />
      </div>
    )
  }
}