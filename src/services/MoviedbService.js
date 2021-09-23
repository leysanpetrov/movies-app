import dummyImage from '../7395312.png'

export default class MoviedbService {

  _apiBase = 'https://api.themoviedb.org/3'

  _query = 'return'

  _apiKey = 'api_key=4ef841d6cda764295c576698e2b27bcc'

  getResource = async (url, query = this._query, page = 1) => {
    /* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
    const res = await fetch(`${this._apiBase}${url}?query=${query}&${this._apiKey}&page=${page}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }

    return res.json()
  }

  getMovies = async (query, page) => {
    const res = await this.getResource(`/search/movie`, query, page)
    return {
      movies: res.results.map(this._constructorMovie),
      totalResults: res.total_results
    }
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
      image: movie.poster_path ? `${imageBase}${movie.poster_path}` : dummyImage
    }
  }
}
