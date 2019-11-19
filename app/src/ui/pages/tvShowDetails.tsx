import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { NavBar } from "../templates/navbar";
import { PlayMovieComponent } from "../organism/youtubeModal";
import { CarouselComponent } from "../organism/movieCarousel";

interface ITVShow {
  key: string;
}

interface ITvShowResponse {
  results: ITvShow[];
}

interface ITvShow {
  poster_path: string;
  name: string;
  overview: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
}

let defaultData: ITvShow = {
  poster_path: "",
  name: "",
  overview: "",
  tagline: "",
  vote_average: 0,
  vote_count: 0
};

type TParams = { id: string };

enum KindsOfTVShows {
  drama = "",
  best2010 = "",
  withBradPitt = "",
  lowRated = ""
}

export const TvShowDetails: React.FunctionComponent<RouteComponentProps<
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
      `https://api.themoviedb.org/3/tv/${match.params.id}?api_key=9f471da832491516e75802f839e2bae2`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((response: ITvShow) => {
        setData(response);
        return;
      });

    fetch(
      `https://api.themoviedb.org/3/tv/${match.params.id}/videos?api_key=9f471da832491516e75802f839e2bae2&language=en-US`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((response: any) => {
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
          <label className="title has-text-white">{data.name}</label>
          <br />
          <p>
            {data.vote_average.toString()}
            <i className="far fa-star has-text-warning"></i> of
            {data.vote_count.toString()} <span> </span>
            voutes
          </p>
          <br />

          {data.overview}
        </div>
        {isVideoVisible && (
          <div className="PlayVideo">
            <p className="title has-text-white" onClick={HandleVideoClick}>
              Watch thriller
              <br />
              <i className="fab fa-youtube"></i>
            </p>{" "}
          </div>
        )}
      </div>

      <CarouselComponent
        movieType={KindsOfTVShows.best2010}
        title="Explore More"
      />
      <CarouselComponent movieType={KindsOfTVShows.withBradPitt} />
      <CarouselComponent movieType={KindsOfTVShows.drama} />
      <CarouselComponent movieType={KindsOfTVShows.lowRated} />
    </div>
  );
};
