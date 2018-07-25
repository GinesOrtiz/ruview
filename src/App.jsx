import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import history from "./store/history";

import Header from "./components/common/Header.jsx";
import Home from "./components/home/Home";
import Series from "./components/home/Series";
import Movies from "./components/home/Movies";
import Serie from "./components/serie/Serie";
import Movie from "./components/movie/Movie";
import Video from "./components/video/Video";

const App = () => (
  <Router history={history}>
    <div className="main">
      <Header />
      <div className="main-content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/series" component={Series} />
          <Route exact path="/movies" component={Movies} />
          <Route exact path="/series/:id" component={Serie} />
          <Route exact path="/movies/:id" component={Movie} />
          <Route exact path="/video/:id" component={Video} />
          <Route exact path="/movie/:id" component={Video} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
