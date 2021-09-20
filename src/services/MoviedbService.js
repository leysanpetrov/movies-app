
// import Search from "../components/Search/Search"

export default class MoviedbService {

  _apiBase = 'https://api.themoviedb.org/3'

  _query = 'query=return'
  // _query = `query=${value}`

  // getQuery = () => {
  //
  // }

  _apiKey = 'api_key=4ef841d6cda764295c576698e2b27bcc'

  getResource = async (url) => {
    /* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
    const res = await fetch(`${this._apiBase}${url}?${this._query}&${this._apiKey}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }

    return res.json()
  }

  getAllMovies = async () => {
    const res = await this.getResource(`/search/movie`)
    return res.results
      .map(this._constructorMovie)
  }

  _constructorMovie = (movie) => {
    const imageBase = "https://www.themoviedb.org/t/p/w440_and_h660_face"
    return {
      id: movie.id,
      title: movie.title,
      date: movie.release_date,
      action: "Action",
      drama: "Drama",
      overview: movie.overview,
      image: `${imageBase}${movie.poster_path}`
    }
  }
}
