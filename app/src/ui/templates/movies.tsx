import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IResponseVideo, IResponseVideoData } from "../pages/homePage";
interface IComponent {
  className?: string;
  data: IResponseVideoData[];
}

const HandleNoResult = () => {
  return (
    <div className="ImageContainer">
      <img
        className="image"
        key="notFound"
        src="https://i.makeagif.com/media/11-04-2015/mfnzwt.gif"
      />
    </div>
  );
};

const Component: React.FunctionComponent<IComponent> = (props: IComponent) => {
  const HandleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className={`${props.className} main`}>
      {props.data.map((item: IResponseVideoData) => {
        return item.poster_path != undefined ? (
          <div onClick={HandleClick} className="ImageContainer" key={item.id}>
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
      {props.data.length == 0 && HandleNoResult()}
    </div>
  );
};

export const Movies = styled(Component)`
  background: black;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
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
