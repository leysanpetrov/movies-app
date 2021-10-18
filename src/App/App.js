import React, { Component } from 'react'
import { debounce } from 'lodash'
import './App.css'
import 'antd/dist/antd.css'
import { Input, Pagination } from 'antd'
import MoviesList from '../components/MoviesList/MoviesList'
import Navigation from '../components/Navigation/Navigation'
import MoviedbService from '../services/MoviedbService'
import { MoviesServicesContextProvider } from '../components/MoviesServicesContext/MoviesServicesContext'

export default class App extends Component {

  moviedbService = new MoviedbService()

  state = {
    movies: null,
    genresList: null,
    loading: true,
    query: undefined,
    page: 1,
    totalItems: null,
    isVisibleSearch: true,
    typeQuery: undefined
  }

  async componentDidMount () {
    await this.moviedbService.getGuestSession()
    await this.getGenres()
    this.getMoviesByName()
  }

  componentDidUpdate (prevProps, prevState) {
    const { query } = this.state
    if (query !== prevState.query) {
      this.getMoviesByName()
    }
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  getGenres () {
    this.moviedbService
      .getGenres()
      .then((items) => {
        this.setState({
          genresList: items
        })
      })
      .catch(this.onError)
  }

  getMoviesByName () {
    const { typeQuery, query, page } = this.state
    this.moviedbService
      .getMovies(typeQuery, query, page)
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
  }

  onChangeTab = (activeKey) => {
    if (activeKey === '1') {
      this.setState({
        query: undefined,
        isVisibleSearch: true,
        typeQuery: 'search'
      }, this.getMoviesByName)
    }
    if (activeKey === '2') {
      this.setState({
        query: undefined,
        isVisibleSearch: false,
        typeQuery: 'rate'
      }, this.getMoviesByName)
    }
  }

  rememberRate = (id) => {
    const getRate = localStorage.getItem(id)
    return JSON.parse(getRate)
  }

  makeRate = (id, value = 0) => {
    this.moviedbService.posMaketRate(id, value)
    localStorage.setItem(id, JSON.stringify(value))
  }

  render () {
    const { query, page, movies, loading, error, totalItems, isVisibleSearch, genresList } = this.state

    const classNameSearch = isVisibleSearch ? 'search' : 'search_visibility'

    return (

        <div className="container-box">
          <Navigation onChangeTab={this.onChangeTab}/>
          <div className={classNameSearch}>
            <Input placeholder="Basic usage"
                   value={query}
                   onChange={debounce(this.onChangeQuery, 1500)}
            />
          </div>
          <MoviesServicesContextProvider value={genresList}>
          <MoviesList
            movies={movies}
            loading={loading}
            error={error}
            makeRate={this.makeRate}
            rememberRate={this.rememberRate}
          />
          </MoviesServicesContextProvider>
          <Pagination size="small"
                      defaultCurrent={1}
                      total={totalItems} className="pagination"
                      pageSize={20}
                      page={page}
                      showSizeChanger={false}
                      onChange={this.onChangePage}
          />
        </div>
    )
  }
}