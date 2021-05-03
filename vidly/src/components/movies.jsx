import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import Like from "./common/like";
import Paginator from "./common/paginator";

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    limit: 4,
  };

  constructor() {
    super();
    // const movies = this.state.movies.map((m) => (m.liked = false));
    // this.setState({ movies });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps", prevProps);
    console.log("prevState", prevState);
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movie.liked;
    this.setState({ movies });
  };

  handlePageClicked = (currentPage) => {
    this.setState({ currentPage });
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
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{this.getBodyItems()}</tbody>
        </table>
        <Paginator
          itemsCount={this.state.movies.length}
          limit={this.state.limit}
          currentPage={this.state.currentPage}
          onPageClicked={this.handlePageClicked}
        />
      </React.Fragment>
    );
  }

  getBodyItems() {
    const { movies, currentPage, limit } = this.state;
    const displayedMovies = paginate(movies, currentPage, limit);

    if (displayedMovies && displayedMovies.length > 0) {
      return (
        <React.Fragment>
          {displayedMovies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like
                  liked={movie.liked}
                  onLike={() => this.handleLike(movie)}
                  movie={movie}
                />
              </td>
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
