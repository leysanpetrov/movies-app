import React from 'react';
import './Movie.css';

const Movie = ({image,title, date, action, drama, overview}) => (
      <div className="container-movie">
        <img alt="Poster" className="movie-image"
             src={image}/>
        <div className="container-aboutMovie">
          <h1>{title}</h1>
          <div className="date">{date}</div>
          <div>
            <button type="button" className="button">{action}</button>
            <button type="button" className="button">{drama}</button>
          </div>
          <section>
            <p className="overview"> {overview}</p>
          </section>
        </div>
      </div>
    )

export default Movie


