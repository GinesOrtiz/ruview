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
import OuttvHome from "./components/outtv/Home";
import OuttvSerie from "./components/outtv/Serie";
import OuttvVideo from "./components/outtv/Video";
import RakutenHome from "./components/rakuten/Home";
import RakutenMovie from "./components/rakuten/Movie";
import RakutenSerie from "./components/rakuten/Serie";

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
          <Route exact path="/outtv" component={OuttvHome} />
          <Route exact path="/outtv/serie/:id" component={OuttvSerie} />
          <Route exact path="/outtv/video/:id" component={OuttvVideo} />
          <Route exact path="/outtv/:tab" component={OuttvHome} />
          <Route exact path="/rakuten/" component={RakutenHome} />
          <Route exact path="/rakuten/movie/:id" component={RakutenMovie} />
          <Route exact path="/rakuten/serie/:id" component={RakutenSerie} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
