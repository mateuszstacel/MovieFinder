import React from "react";
import { InputComponent } from "./ui/atoms/input";
import { Spinner } from "./ui/atoms/spinner";
import { CarouselComponent } from "../src/ui/organism/movieCarousel";
import { PlayMovieComponent } from "../src/ui/organism/youtubeModal";
import { MainComponent } from "./ui/templates/MainComponent";
import { Movies } from "../src/ui/templates/movies";
import { NavBar } from "../src/ui/templates/navbar";
import { Title } from "./ui/templates/title";
import { TvShows } from "../src/ui/templates/tvShows";
import { HomePage } from "../src/ui/pages/homePage";
import { MovieDetails } from "../src/ui/pages/movieDetails";
import { TvShowDetails } from "../src/ui/pages/tvShowDetails";
import { render } from "@testing-library/react";

interface IComponentUnitTests<T = any> {
  [key: string]: T;
}

const allComponents: IComponentUnitTests = {
  InputComponent,
  Spinner,
  CarouselComponent,
  PlayMovieComponent,
  MainComponent,
  Movies,
  NavBar,
  Title,
  TvShows,
  HomePage,
  MovieDetails,
  TvShowDetails
};

/**
 * Runs a basic test for each component
 */
Object.keys(allComponents).forEach(componentName => {
  describe(`<${componentName} />`, () => {
    it(`renders ${componentName} without crashing`, () => {
      const Component: any = allComponents[componentName];
    });
  });
});
