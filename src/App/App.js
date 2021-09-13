import React, {Component} from 'react';
import './App.css';
import MoviesList from '../components/MoviesList/MoviesList'

export default class App extends Component {

  render() {
    return (
      <div className="container-box">
        <MoviesList
          getMovies={this.getMovies}
        />
      </div>
    )
  }
}