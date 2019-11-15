import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MainComponent } from "../templates/MainComponent";
import { CarouselComponent } from "../organism/movieCarousel";

interface IHomePage {
  className?: string;
}

interface IResponseVideoData {
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
interface IResponseVideo {
  results: IResponseVideoData[];
}

interface IResponseTVShowData {
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
interface IResponseTVShow {
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
  kids = "certification_country=US&certification.lte=G&sort_by=popularity",
  popular = "sort_by=popularity.desc",
  comedies = "with_genres=35&with_cast=23659&sort_by=revenue.desc",
  topRated = "certification_country=US&certification=R&sort_by=vote_average.desc"
}

enum MoviesTitles {
  kids = "Kids",
  popular = "Pupular",
  topRated = "Top Rated",
  comedies = " Science Fiction"
}

const Component: React.FunctionComponent<IHomePage> = (props: IHomePage) => {
  const [inputText, setInputText] = useState("");
  const [currentActive, setCurrentActive] = useState("movie");
  const [movieData, setMovieData] = useState(DefaultMovieData);
  const [tvShowData, setTvShowData] = useState(DefaultTVShowData);

  const HandleInputChange = () => {
    return (value: string) => {
      setInputText(value);
    };
  };

  const HandleEnterPress = () => {
    alert(inputText);
    switch (currentActive) {
      case "movie":
        HandleMovieSearch(inputText);
        return;
      case "tvShow":
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
        return res.json();
      })
      .then((response: IResponseVideo) => {
        debugger;
        console.log(response);
        setMovieData(
          response.results.map((dataRow: IResponseVideoData) => dataRow)
        );
        return;
      });
  };

  const HandleTVShowSearch = (queryString: string) => {
    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=9f471da832491516e75802f839e2bae2&query=${queryString}`
    )
      .then(res => {
        return res.json();
      })
      .then((response: IResponseTVShow) => {
        debugger;
        console.log(response);
        setTvShowData(
          response.results.map((dataRow: IResponseTVShowData) => dataRow)
        );
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
      <p>{currentActive}</p>
      <p className="has-text-white">{inputText}</p>
      <CarouselComponent
        title={MoviesTitles.popular}
        movieType={KindsOfMovies.popular}
      />
      <CarouselComponent
        title={MoviesTitles.kids}
        movieType={KindsOfMovies.kids}
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
  );
};

export const HomePage = styled(Component)``;
