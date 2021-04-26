import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  render() {
    return <main className="container">{this.getMovieContent()}</main>;
  }

  getMovieContent() {
    if (this.state.movies && this.state.movies.length === 0)
      return <p>There are no movies in the database</p>;

    return (
      <React.Fragment>
        <p>Showing {this.state.movies.length} movies in the database</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
            </tr>
          </thead>
          <tbody>{this.getBodyItems()}</tbody>
        </table>
      </React.Fragment>
    );
  }

  getBodyItems() {
    const { movies } = this.state;
    if (movies && movies.length > 0) {
      return (
        <React.Fragment>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <button
                  onClick={() => this.handleDeleteMovies(movie._id)}
                  className="btn btn-danger btn-secondary"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </React.Fragment>
      );
    }
  }

  handleDeleteMovies = (id) => {
    const movies = this.state.movies.filter((movie) => movie._id !== id);
    this.setState({ movies });
  };
}
export default Movies;
