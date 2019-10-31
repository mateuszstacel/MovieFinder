import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MainComponent } from "../templates/MainComponent";
import { CarouselComponent } from "../organism/movieCarousel";

interface IHomePage {
  className?: string;
}

enum KindsOfMovies {
  kids = "certification_country=US&certification.lte=G&sort_by=popularity.desc",
  popular = "sort_by=popularity.desc",
  comedies = "with_genres=35&with_cast=23659&sort_by=revenue.desc",
  topRated = "certification_country=US&certification=R&sort_by=vote_average.desc"
}

enum MoviesTitles {
  kids = "Kids",
  popular = "Pupular",
  topRated = "Top Rated",
  comedies = " Science Fiction"
}

const Component: React.FunctionComponent<IHomePage> = (props: IHomePage) => {
  const [inputText, setInputText] = useState("");

  const HandleInputChange = () => {
    return (value: string) => {
      setInputText(value);
    };
  };

  return (
    <div className={props.className}>
      <MainComponent onInputChange={HandleInputChange} />
      <p className="has-text-white">{inputText}</p>
      <CarouselComponent
        title={MoviesTitles.popular}
        movieType={KindsOfMovies.popular}
      />
      <CarouselComponent
        title={MoviesTitles.kids}
        movieType={KindsOfMovies.kids}
      />
      <CarouselComponent
        title={MoviesTitles.topRated}
        movieType={KindsOfMovies.topRated}
      />
      <CarouselComponent
        title={MoviesTitles.comedies}
        movieType={KindsOfMovies.comedies}
      />
    </div>
  );
};

export const HomePage = styled(Component)``;
