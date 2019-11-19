import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MainComponent } from "../templates/MainComponent";
import { CarouselComponent } from "../organism/movieCarousel";
import { Spinner } from "../atoms/spinner";
import { Movies } from "../templates/movies";
import { TvShows } from "../templates/tvShows";
interface IHomePage {
  className?: string;
}

export interface IResponseVideoData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface IResponseVideo {
  results: IResponseVideoData[];
}

export interface IResponseTVShowData {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  overview: string;
  original_language: string;
  original_name: string;
  pupularity: number;
  title: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}
export interface IResponseTVShow {
  results: IResponseTVShowData[];
}

let DefaultMovieData: IResponseVideoData[] = [
  {
    adult: false,
    backdrop_path: "",
    genre_ids: [],
    id: 0,
    original_language: "",
    original_title: "",
    overview: "",
    popularity: 0,
    poster_path: "",
    release_date: "",
    title: "",
    video: false,
    vote_average: 0,
    vote_count: 0
  }
];

let DefaultTVShowData: IResponseTVShowData[] = [
  {
    backdrop_path: "",
    first_air_date: "",
    genre_ids: [],
    id: 0,
    name: "",
    origin_country: [],
    overview: "",
    original_language: "",
    original_name: "",
    pupularity: 0,
    title: "",
    poster_path: "",
    vote_average: 0,
    vote_count: 0
  }
];
enum KindsOfMovies {
  mostWatched = "certification_country=US&certification.lte=G&sort_by=popularity",
  popular = "sort_by=popularity.desc",
  comedies = "with_genres=35&with_cast=23659&sort_by=revenue.desc",
  topRated = "certification_country=US&certification=R&sort_by=vote_average.desc"
}

enum MoviesTitles {
  mostWatched = "Most Watched",
  popular = "Pupular",
  topRated = "Top Rated",
  comedies = " Science Fiction"
}

const Component: React.FunctionComponent<IHomePage> = (props: IHomePage) => {
  const [inputText, setInputText] = useState("");
  const [currentActive, setCurrentActive] = useState("movie");
  const [movieData, setMovieData] = useState(DefaultMovieData);
  const [tvShowData, setTvShowData] = useState(DefaultTVShowData);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestedMovies, setShowSuggestedMovies] = useState(true);
  const [showMovies, setShowMovies] = useState(false);
  const [showTvShows, setShowTvShows] = useState(false);

  const HandleInputChange = () => {
    return (value: string) => {
      setInputText(value);
    };
  };

  const HandleEnterPress = () => {
    switch (currentActive) {
      case "movie":
        setIsLoading(true);
        setShowSuggestedMovies(false);
        HandleMovieSearch(inputText);
        return;
      case "tvShow":
        setIsLoading(true);
        setShowSuggestedMovies(false);
        HandleTVShowSearch(inputText);
        return;
    }
  };

  const HandleCategoryChange = () => {
    return (type: string) => {
      setCurrentActive(type);
    };
  };

  const HandleMovieSearch = (queryString: string) => {
    fetch(
      ` https://api.themoviedb.org/3/search/movie?api_key=9f471da832491516e75802f839e2bae2&query=${queryString}`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((response: IResponseVideo) => {
        setMovieData(
          response.results.map((dataRow: IResponseVideoData) => dataRow)
        );
        setIsLoading(false);
        setShowTvShows(false);
        setShowMovies(true);
        return;
      });
  };

  const HandleTVShowSearch = (queryString: string) => {
    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=9f471da832491516e75802f839e2bae2&query=${queryString}`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((response: IResponseTVShow) => {
        setTvShowData(
          response.results.map((dataRow: IResponseTVShowData) => dataRow)
        );
        setIsLoading(false);
        setShowMovies(false);
        setShowTvShows(true);

        return;
      });
  };

  return (
    <div className={props.className}>
      <MainComponent
        onEnterPress={HandleEnterPress}
        onInputChange={HandleInputChange}
        currentSearch={HandleCategoryChange()}
      />
      {isLoading && <Spinner label={`loading ${currentActive}'s ...`} />}

      {showSuggestedMovies && (
        <div>
          <CarouselComponent
            title={MoviesTitles.popular}
            movieType={KindsOfMovies.popular}
          />
          <CarouselComponent
            title={MoviesTitles.mostWatched}
            movieType={KindsOfMovies.mostWatched}
          />
          <CarouselComponent
            title={MoviesTitles.topRated}
            movieType={KindsOfMovies.topRated}
          />
          <CarouselComponent
            title={MoviesTitles.comedies}
            movieType={KindsOfMovies.comedies}
          />
        </div>
      )}

      {showMovies && <Movies data={movieData} />}
      {showTvShows && <TvShows data={tvShowData} />}
    </div>
  );
};

export const HomePage = styled(Component)``;
