import React, { useLayoutEffect, useState } from "react";
import "bulma/css/bulma.css";
import { HomePage } from "./ui/pages/homePage";
import { MovieDetails } from "../src/ui/pages/movieDetails";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { TvShowDetails } from "../src/ui/pages/tvShowDetails";
const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/movies-library/movie/:id" component={MovieDetails} />
          <Route
            path="/tv-shows-library/tv-show/:id"
            component={TvShowDetails}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
