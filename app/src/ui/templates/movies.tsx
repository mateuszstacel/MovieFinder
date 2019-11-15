import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface IComponent {
  className?: string;
  data: any;
}

const Component: React.FunctionComponent<IComponent> = (props: IComponent) => {
  let imageNotFound: string = `http://www.kumargeneratorhouse.com/images/420X512/image-not-found2.png`;
  return (
    <div className={`${props.className} main`}>
      {props.data.map((item: any) => {
        return (
          <div className="ImageContainer" key={item.id}>
            <Link to={`/movies-library/movie/${item.id}`}>
              <img
                className="image"
                key={item.id}
                alt={item.title}
                src={
                  item.poster_path != undefined
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : imageNotFound
                }
              />
            </Link>
          </div>
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
    width: 250px;
    display: flex;
    background: black;
    margin: 20px;
  }
  .main {
    margin: 20px;
  }
`;
