import dummyImage from '../7395312.png'

export default class MoviedbService {

  _apiBase = 'https://api.themoviedb.org/3'

  _query = 'return'

  _apiKey = 'api_key=4ef841d6cda764295c576698e2b27bcc'

  _authentication = '/authentication/guest_session/new'

  _guestSessionId = ""

  _search = '/search/movie'

  getGuestSession = async () => {
    /* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
    const res = await fetch(`${this._apiBase}${this._authentication}?${this._apiKey}`)
    const result = await res.json()

    this._guestSessionId = result.guest_session_id
  }

  getResource = async (typeQuery= "search", query = this._query, page = 1) => {
    const typeQueryValue = typeQuery === "search" ? this._search : `/guest_session/${this._guestSessionId}/rated/movies`
    const fullWay = `${this._apiBase}${typeQueryValue}?${this._apiKey}&session_id=${this._guestSessionId}&query=${query}&page=${page}`
    /* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
    const res = await fetch(fullWay)
    if (!res.ok) {
      throw new Error(`Could not fetch ${typeQueryValue}` +
        `, received ${res.status}`)
    }

    return res.json()
  }

  posMaketRate = async (id, value) => {
    await fetch(`${this._apiBase}/movie/${id}/rating?${this._apiKey}&guest_session_id=${this._guestSessionId}`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      method: 'POST',
      body: JSON.stringify({ value }),
    });
  };

  getMovies = async (typeQuery, query, page ) => {
    const res = await this.getResource(typeQuery, query, page )
    return {
      movies: res.results.map(this._constructorMovie),
      totalResults: res.total_results
    }
  }

  getGenres = async () => {
    /* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
    const res = await fetch(`${this._apiBase}/genre/movie/list?${this._apiKey}`)
    const result = await res.json()
    return result.genres.map(this._constructorGenres)
  }

  _constructorGenres = (movie) => ({
        id: movie.id,
        genre: movie.name
      }
  )

  _constructorMovie = (movie) => {
    const imageBase = "https://www.themoviedb.org/t/p/w440_and_h660_face"
    return {
      id: movie.id,
      title: movie.title,
      date: movie.release_date,
      rate: movie.vote_average,
      overview: movie.overview,
      image: movie.poster_path ? `${imageBase}${movie.poster_path}` : dummyImage,
      genreIds: movie.genre_ids
    }
  }
}

