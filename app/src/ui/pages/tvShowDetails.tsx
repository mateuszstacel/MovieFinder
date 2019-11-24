import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { NavBar } from "../templates/navbar";
import { TvShowOverview } from "../organism/tvShowOverview";
import { CarouselComponent } from "../organism/movieCarousel";

interface ITVShow {
  key: string;
}

interface ITvShowResponse {
  results: ITvShow[];
}

export interface ITvShow {
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
  popular = "popular",
  topRated = "top_rated"
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
  }, [match.params.id]);

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
      <TvShowOverview
        data={data}
        isVideoVisible={isVideoVisible}
        OnVideoClose={HandleVideoClose}
        onVideoClick={HandleVideoClick}
        showVideo={showVideo}
        movieKey={movieKey}
      />
      <CarouselComponent
        tvType={KindsOfTVShows.popular}
        title="More TV Shows"
        type="tvShow"
      />
      <CarouselComponent type="tvShow" tvType={KindsOfTVShows.topRated} />
    </div>
  );
};
