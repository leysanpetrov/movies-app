import React, {Component} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Pagination } from 'antd';
import MoviesList from '../components/MoviesList/MoviesList'
import Navigation from '../components/Navigation/Navigation'
import Search from '../components/Search/Search'


export default class App extends Component {

  // state = {
  //   label: '',
  // };
  //
  // onChange = (ev) => {
  //   this.setState({
  //     label: ev.target.value,
  //   });
  // };

  render() {
    return (
      <div className="container-box">
        <Navigation doSearch={this.doSearch}/>
        <Search
          //       onChange={this.onChange}
        />
        <MoviesList
          getMovies={this.getMovies}
        />
        <Pagination size="small" defaultCurrent={1} total={50} className="pagination"/>
      </div>
    )
  }
}