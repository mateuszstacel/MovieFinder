import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { NavBar } from "../templates/navbar";
import { PlayMovieComponent } from "../organism/youtubeModal";
import { CarouselComponent } from "../organism/movieCarousel";
import styled from "styled-components";
import { MovieOverview } from "../organism/movieOverwiev";
interface IMovieVideo {
  key: string;
}

interface IMovieVideoResponse {
  results: IMovieVideo[];
}

export interface IMovie {
  poster_path: string;
  title: string;
  overview: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
}

let defaultData: IMovie = {
  poster_path: "",
  title: "",
  overview: "",
  tagline: "",
  vote_average: 0,
  vote_count: 0
};

type TParams = { id: string };

enum KindsOfMovies {
  drama = "with_genres=18&sort_by=vote_average.desc&vote_count.gte=10",
  best2010 = "/discover/movie?with_people=108916,7467&sort_by=popularity.desc",
  withBradPitt = "/discover/movie?with_people=287,819&sort_by=vote_average.desc",
  lowRated = "/discover/movie?sort_by=popularity.asc"
}

interface IComponent {
  className?: string;
}

export const Component: React.FunctionComponent<RouteComponentProps<
  TParams,
  any,
  any
>> = ({ match }: RouteComponentProps<TParams>, props: IComponent) => {
  const [movieKey, setMovieKey] = useState("");
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=9f471da832491516e75802f839e2bae2`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((response: IMovie) => {
        setData(response);
        return;
      });

    fetch(
      `https://api.themoviedb.org/3/movie/${match.params.id}/videos?api_key=9f471da832491516e75802f839e2bae2&language=en-US`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((response: IMovieVideoResponse) => {
        if (response != undefined) {
          if (response.results.length > 0) {
            setMovieKey(response.results[0].key);
            setIsVideoVisible(true);
            return;
          } else {
            setShowVideo(false);
            setIsVideoVisible(false);
            return;
          }
        }
      });
  }, [match.params.id]);

  const HandleVideoClose = () => {
    setShowVideo(false);
  };

  const HandleVideoClick = () => {
    setShowVideo(true);
  };
  return (
    <div className={props.className}>
      <NavBar />
      <MovieOverview
        showVideo={showVideo}
        movieKey={movieKey}
        isVideoVisible={isVideoVisible}
        data={data}
        onVideoClick={HandleVideoClick}
        OnVideoClose={HandleVideoClose}
      />

      <CarouselComponent
        movieType={KindsOfMovies.best2010}
        title="More Movies"
        type="movie"
      />
      <CarouselComponent movieType={KindsOfMovies.drama} type="movie" />
      <CarouselComponent movieType={KindsOfMovies.lowRated} type="movie" />
      <CarouselComponent movieType={KindsOfMovies.withBradPitt} type="movie" />
    </div>
  );
};

export const MovieDetails = styled(Component)`
  .MovieDetailsMainComponent {
    background: black;
    padding: 50px;
    display: flex;

    @media screen and (min-device-width: 300px) and (max-device-width: 845px) {
      padding: 10px;
    }
  }
`;
