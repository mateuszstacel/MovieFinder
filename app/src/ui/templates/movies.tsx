import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IResponseVideo, IResponseVideoData } from "../pages/homePage";
interface IComponent {
  className?: string;
  data: IResponseVideoData[];
}

const Component: React.FunctionComponent<IComponent> = (props: IComponent) => {
  return (
    <div className={`${props.className} main`}>
      {props.data.map((item: IResponseVideoData) => {
        return item.poster_path != undefined ? (
          <div className="ImageContainer" key={item.id}>
            <Link to={`/movies-library/movie/${item.id}`}>
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

export const Movies = styled(Component)`
  background: black;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  .ImageContainer {
    width: 200px;
    display: flex;
    background: black;
    margin: 20px;

    @media screen and (min-device-width: 300px) and (max-device-width: 845px) {
      width: 80px;
      margin: 5px;
    }
  }
  .main {
    margin: 20px;
  }
`;
