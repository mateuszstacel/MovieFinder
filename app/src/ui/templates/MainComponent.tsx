import React, { useState } from "react";
import styled from "styled-components";
import Background from "../../../public/images/mainBackground.jpg";
import { NavBar } from "./navbar";
import { InputComponent } from "../atoms/input";
import { Title } from "../templates/title";
import { SearchViewComponent } from "../organism/searchResultModal";

interface IMainComponent {
  className?: string;
  onInputChange: () => (value: string) => void;
  onEnterPress: () => void;
  currentSearch: (type: string) => void;
}

const Component: React.FunctionComponent<IMainComponent> = (
  props: IMainComponent
) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMovieActive, setIsMovieActive] = useState(true);
  const [isTvShowActive, setIsTVShowActive] = useState(false);

  const HandleEnterPress = () => {
    props.onEnterPress();
  };

  const HandleCategoryChange = () => {
    if (isMovieActive) {
      setIsMovieActive(false);
      setIsTVShowActive(true);
      props.currentSearch("tvShow");
    } else {
      setIsMovieActive(true);
      setIsTVShowActive(false);
      props.currentSearch("movie");
    }
  };

  const HandleInput = () => {
    props.onInputChange();
  };

  return (
    <div className={props.className}>
      <SearchViewComponent />
      <NavBar
        onCategoryChange={HandleCategoryChange}
        onTvShowActive={isTvShowActive}
        onMovieActive={isMovieActive}
      />
      <br />
      <Title />
      <InputComponent
        onChange={props.onInputChange()}
        onEnter={HandleEnterPress}
        placeholder={isMovieActive ? "Search for Movie" : "Search for Tv Shows"}
      />
      <small className="control helper has-text-white ">
        Action, Advertisement, Adventure, Comedy and much more...
      </small>
    </div>
  );
};

export const MainComponent = styled(Component)`
  width: 100%;
  height: 500px;
  background-image: url("https://i.pinimg.com/originals/0c/1b/54/0c1b541757e16d7c32736c0ec00d416f.jpg");
  background-size: 100%;
  background-repeat: no-repeat;

  .Tittle {
    text-align: center;
    font-size: 3vw;
    color: white;
  }
  .Logo {
    font-size: 2vw;
    font-family: "Times New Roman";
  }

  .control {
    margin-left: 25%;
  }

  .input {
    width: 70%;
  }
`;
