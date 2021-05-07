import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/list-group";
import Paginator from "./common/paginator";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    currentPage: 1,
    limit: 4,
    currentGenre: "all_genres",
    movies: [],
    genres: [],
  };

  constructor() {
    super();
  }

  componentDidUpdate(prevProps, prevState) {}

  componentDidMount() {
    const genres = [{ _id: "all_genres", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
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

  handleGenreSelected = (currentGenre) => {
    this.setState({ currentGenre, currentPage: 1 });
  };

  render() {
    const { movies, currentPage, limit, currentGenre } = this.state;

    let filteredMovies =
      currentGenre && currentGenre !== "all_genres"
        ? movies.filter((m) => m.genre._id === currentGenre)
        : movies;

    const displayedMovies = paginate(filteredMovies, currentPage, limit);

    if (this.state.movies && this.state.movies.length === 0)
      return <p>There are no movies in the database</p>;
    return (
      <main className="container">
        <div className="row">
          <div className="col-3">
            <ListGroup
              genres={this.state.genres}
              currentGenre={this.state.currentGenre}
              onGenreSelected={this.handleGenreSelected}
            />
          </div>
          <div className="col">
            <p>Showing {filteredMovies.length} movies in the database</p>
            <MoviesTable
              movies={displayedMovies}
              onLike={this.handleLike}
              onDelete={this.handleDeleteMovies}
            />
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
