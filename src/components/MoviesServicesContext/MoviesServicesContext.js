import React from "react"

const {
  Provider: MoviesServicesContextProvider,
  Consumer: MoviesServicesContextConsumer
} = React.createContext()

export {
  MoviesServicesContextProvider,
  MoviesServicesContextConsumer
}