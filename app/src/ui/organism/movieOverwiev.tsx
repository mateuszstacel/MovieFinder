import React from "react";
import styled from "styled-components";
import { PlayMovieComponent } from "./youtubeModal";
import { IMovie } from "../pages/movieDetails";
interface IComponent {
  className?: string;
  showVideo: boolean;
  movieKey: string;
  OnVideoClose: () => void;
  isVideoVisible: boolean;
  onVideoClick: () => void;
  data: IMovie;
}

const Component: React.FunctionComponent<IComponent> = (props: IComponent) => {
  return (
    <div className={props.className}>
      {" "}
      <div className="MovieDetailsMainComponent">
        {props.showVideo && (
          <PlayMovieComponent
            movieKey={props.movieKey}
            onClose={props.OnVideoClose}
          />
        )}
        <div className="MovieImage">
          <img
            className="imageMovieDetails"
            src={`https://image.tmdb.org/t/p/w500/${props.data.poster_path}`}
          />
        </div>

        <div className="Description">
          <label className="titleMovie has-text-white">
            {props.data.title}
          </label>

          <p className="score">
            {props.data.vote_average.toString()}
            <i className="far fa-star has-text-warning"></i> from{" "}
            {props.data.vote_count.toString()}
            <span> </span>
            voutes
          </p>

          <label className="subtitleMovie has-text-white">
            {props.data.tagline}
          </label>
          <br />
          <div className="OverviewMovie">
            <p>{props.data.overview}</p>
          </div>
        </div>
        {props.isVideoVisible && (
          <div className="PlayVideo">
            {" "}
            <p
              className="MovieVideo has-text-white"
              onClick={props.onVideoClick}
            >
              Watch thriller
              <br />
              <i className="fab fa-youtube"></i>
            </p>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export const MovieOverview = styled(Component)`
  .MovieDetailsMainComponent {
    background: black;
    padding: 50px;
    display: flex;

    @media screen and (min-device-width: 300px) and (max-device-width: 845px) {
      padding: 10px;
    }
  }

  .MovieVideo {
    font-size: 40px;

    @media screen and (min-device-width: 300px) and (max-device-width: 845px) {
      font-size: 13px;
    }
  }

  .titleMovie {
    font-size: 40px;
    @media screen and (min-device-width: 300px) and (max-device-width: 845px) {
      font-size: 16px;
      font-weight: bold;
    }
  }

  .score {
    padding: 0 0 20px 0;
    @media screen and (min-device-width: 300px) and (max-device-width: 845px) {
      font-size: 10px;
      padding: 0 0 10px 0;
    }
  }

  .imageMovieDetails {
    width: 300px;
    height: 300px;
    @media screen and (min-device-width: 300px) and (max-device-width: 845px) {
      width: 200px;
      height: 200px;
    }
  }

  .Description {
    padding: 0 0 0 20px;
    color: white;
    width: 35%;

    @media screen and (min-device-width: 300px) and (max-device-width: 845px) {
      width: 100%;
      font-size: 13px;
    }
  }

  .subtitleMovie {
    @media screen and (min-device-width: 300px) and (max-device-width: 845px) {
      width: 100%;
      font-size: 10px;
      font-weight: bold;
      margin: 0 0 10px 0;
    }
  }

  .YoutubeVideo {
    width: 700px;
    height: 450px;
  }

  .MovieImage {
    margin-left: 30px;
  }

  .OverviewMovie {
    @media screen and (min-device-width: 300px) and (max-device-width: 845px) {
      font-size: 8px;
    }
  }

  .viedoModal {
    background: black;
  }

  .fa-youtube {
    font-size: 4vw;
  }
  .fa-youtube:hover {
    font-size: 5vw;
    cursor: pointer;
    color: red;
  }
  .PlayVideo {
    display: flex;
    flex: auto;
    justify-content: center;
    margin-top: 70px;
    text-align: center;

    @media screen and (min-device-width: 300px) and (max-device-width: 845px) {
    }
  }
`;