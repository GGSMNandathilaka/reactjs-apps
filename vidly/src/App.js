import "./App.css";
import { Switch, Route, Redirect } from "react-router";
import NavBar from "./components/common/navBar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import PageNotFound from "./components/common/pageNotFound";
import MovieDetail from "./components/movieDetail";

function App() {
  return (
    <main className="container">
      <NavBar />
      <Switch>
        <Route path="/movies/:id" component={MovieDetail}></Route>
        <Route path="/movies" component={Movies}></Route>
        <Route path="/customers" component={Customers}></Route>
        <Route path="/rentals" component={Rentals}></Route>
        <Route path="/page-not-found" component={PageNotFound}></Route>
        <Route path="/" exact component={Movies}></Route>
        <Redirect to="/page-not-found"></Redirect>
      </Switch>
    </main>
  );
}

export default App;
