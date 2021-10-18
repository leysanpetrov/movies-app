import React from 'react'
import './Movie.css'
import OverviewRate from '../OverviewRate/OverviewRate'

const Movie = ({ image, title, date, overview, rate, makeRate, id, genres, rememberRate }) => {
  let colorRate

  if (rate < 3) {
    colorRate = 'rate-ellipse rate-ellipse__color-red'
  } else if (rate >= 3 || rate < 5) {
    colorRate = 'rate-ellipse rate-ellipse__color-orange'
  } else if (rate >= 5 || rate < 7) {
    colorRate = 'rate-ellipse rate-ellipse__color-yellow'
  } else {
    colorRate = 'rate-ellipse rate-ellipse__color-green'
  }
  return (
    <div className="container-movie">
    <div className="container-image-aboutMovie">
      <div className="block1">
        <img alt="Poster" className="movie-image"
             src={image}/>
        <div className="container-aboutMovie">
          <div className="container-aboutMovie__withoutRate">
          <div className="container-aboutMovie__titleRate">
            <h1>{title}</h1>
            <div className={colorRate}> {rate.toFixed(1)} </div>
          </div>
          <div className="date">{date}</div>
          <div className="genres">
            {genres.slice(0, 2).map((genre) => (
                <button key={genre.id} type="button" className="button">
                  {genre.genre}
                </button>
              )
            )}
          </div>
          <div className="overviewRateDesk">
            <OverviewRate
              overview={overview}
              id={id}
              rememberRate={rememberRate}
              makeRate={makeRate}
            />
          </div>
        </div>
        </div>
      </div>
      <div className="overviewRateMobile">
        <OverviewRate
          overview={overview}
          id={id}
          rememberRate={rememberRate}
          makeRate={makeRate}
        />
      </div>
    </div>
    </div>
  )
}




  // let colorRate
  //
  // if (rate < 3) {
  //   colorRate = 'rate-ellipse rate-ellipse__color-red'
  // } else if (rate >= 3 || rate < 5) {
  //   colorRate = 'rate-ellipse rate-ellipse__color-orange'
  // } else if (rate >= 5 || rate < 7) {
  //   colorRate = 'rate-ellipse rate-ellipse__color-yellow'
  // } else {
  //   colorRate = 'rate-ellipse rate-ellipse__color-green'
  // }


//
//     return (
//       <div className="container-movie">
//         <img alt="Poster" className="movie-image"
//              src={image}/>
//         <div className="container-aboutMovie">
//           <div className="container-aboutMovie__withoutRate">
//             <div className="container-aboutMovie__titleRateDateGenres">
//               <div className="container-aboutMovie__titleRate">
//                 <h1>{title}</h1>
//                 <div className= {colorRate}> {rate.toFixed(1)} </div>
//               </div>
//               <div className="date">{date}</div>
//               <div className="genres">
//                 {genres.slice(0, 2).map((genre) => (
//                     <button key={genre.id} type="button" className="button">
//                       {genre.genre}
//                     </button>
//                   )
//                 )}
//               </div>
//             </div>
//             <section className="overview">
//               <p>{overview}</p>
//             </section>
//           </div>
//           <Rate allowHalf
//                 className="rate"
//                 defaultValue={rememberRate(id)}
//                 count={10}
//                 onChange={(value) => makeRate(id, value)}
//           />
//         </div>
//
//       </div>
//     )
//
// }

export default Movie


