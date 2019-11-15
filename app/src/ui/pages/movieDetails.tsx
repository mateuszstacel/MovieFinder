import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { NavBar } from "../templates/navbar";
import { PlayMovieComponent } from "../organism/youtubeModal";
import { CarouselComponent } from "../organism/movieCarousel";

interface IMovieVideo {
  key: string;
}

interface IMovieVideoResponse {
  results: IMovieVideo[];
}

interface IMovie {
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

export const MovieDetails: React.FunctionComponent<RouteComponentProps<
  TParams,
  any,
  any
>> = ({ match }: RouteComponentProps<TParams>) => {
  const [movieKey, setMovieKey] = useState("");
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=9f471da832491516e75802f839e2bae2`
    )
      .then(res => {
        return res.json();
      })
      .then((response: IMovie) => {
        debugger;
        console.log(response);
        setData(response);
        return;
      });

    fetch(
      `https://api.themoviedb.org/3/movie/${match.params.id}/videos?api_key=9f471da832491516e75802f839e2bae2&language=en-US`
    )
      .then(res => {
        debugger;
        return res.json();
      })
      .then((response: IMovieVideoResponse) => {
        if (response.results.length > 0) {
          setMovieKey(response.results[0].key);
          setIsVideoVisible(true);
          return;
        } else {
          setShowVideo(false);
          setIsVideoVisible(false);
          return;
        }
      });
  });

  useEffect(() => {
    if (movieKey != "") {
      setIsVideoVisible(true);
    }
  }, [movieKey]);

  const HandleVideoClose = () => {
    setShowVideo(false);
  };

  const HandleVideoClick = () => {
    setShowVideo(true);
  };
  return (
    <div>
      <NavBar />

      <div className="MovieDetailsMainComponent">
        {showVideo && (
          <PlayMovieComponent movieKey={movieKey} onClose={HandleVideoClose} />
        )}
        <div className="MovieImage">
          <img
            width="300"
            height="300"
            src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
          />
        </div>

        <div className="Description">
          <label className="title has-text-white">{data.title}</label>
          <br />
          <p>
            <i className="far fa-star has-text-warning"></i>{" "}
            {data.vote_average.toString()} of {data.vote_count.toString()}{" "}
            voutes
          </p>
          <br />
          <label className="subtitle has-text-white">{data.tagline}</label>
          <br />
          <br /> <br /> <br />
          {data.overview}
        </div>
        {isVideoVisible && (
          <div className="PlayVideo">
            {" "}
            <p className="title has-text-white" onClick={HandleVideoClick}>
              Watch thriller
              <br />
              <i className="fab fa-youtube"></i>
            </p>{" "}
          </div>
        )}
      </div>

      <CarouselComponent
        movieType={KindsOfMovies.best2010}
        title="Explore More"
      />
      <CarouselComponent movieType={KindsOfMovies.withBradPitt} />
      <CarouselComponent movieType={KindsOfMovies.drama} />
      <CarouselComponent movieType={KindsOfMovies.lowRated} />
    </div>
  );
};
