import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IResponseTVShowData } from "../pages/homePage";
interface IComponent {
  className?: string;
  data: IResponseTVShowData[];
}

const Component: React.FunctionComponent<IComponent> = (props: IComponent) => {
  return (
    <div className={`${props.className} main`}>
      {props.data.map((item: IResponseTVShowData) => {
        return item.poster_path != undefined ? (
          <div className="ImageContainer" key={item.id}>
            <Link to={`/tv-shows-library/tv-show/${item.id}`}>
              <img
                className="image"
                key={item.id}
                alt={item.title}
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              />
            </Link>
          </div>
        ) : (
          ""
        );
      })}
    </div>
  );
};

export const TvShows = styled(Component)`
  background: black;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;

  .ImageContainer {
    width: 250px;
    display: flex;
    background: black;
    margin: 20px;
    @media screen and (min-device-width: 300px) and (max-device-width: 845px) {
      width: 80px;
      margin: 20px;
  }
  .main {
    margin: 20px;
  }
`;
