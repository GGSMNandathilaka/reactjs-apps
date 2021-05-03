import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import Like from "./common/like";
import ListGroup from "./common/list-group";
import Paginator from "./common/paginator";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    currentPage: 1,
    limit: 4,
    currentGenre: "all_genres",
  };

  constructor() {
    super();
    // const movies = this.state.movies.map((m) => (m.liked = false));
    // this.setState({ movies });

    // push 'All Genres' option to loaded genres list
    this.state.genres.unshift({ _id: "all_genres", name: "All Genres" });
  }

  componentDidUpdate(prevProps, prevState) {}

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

  handleGenreSelected = (currentGenre) => {
    this.setState({ currentGenre });
  };

  render() {
    const { movies, currentPage, limit, currentGenre } = this.state;

    let filteredMovies = [];

    if (currentGenre === "all_genres") {
      filteredMovies = movies;
    } else {
      filteredMovies = movies.filter((m) => m.genre._id === currentGenre);
    }
    const displayedMovies = paginate(filteredMovies, currentPage, limit);

    if (this.state.movies && this.state.movies.length === 0)
      return <p>There are no movies in the database</p>;
    return (
      <main className="container">
        <div className="row">
          <div className="col-2">
            <ListGroup
              genres={this.state.genres}
              currentGenre={this.state.currentGenre}
              onGenreSelected={this.handleGenreSelected}
            />
          </div>
          <div className="col-10">
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
              <tbody>
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
              </tbody>
            </table>
            <Paginator
              itemsCount={filteredMovies.length}
              limit={this.state.limit}
              currentPage={this.state.currentPage}
              onPageClicked={this.handlePageClicked}
            />
          </div>
        </div>
      </main>
    );
  }

  handleDeleteMovies = (id) => {
    const movies = this.state.movies.filter((movie) => movie._id !== id);
    this.setState({ movies });
  };
}
export default Movies;
