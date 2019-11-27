import React, { useState, useEffect, useLayoutEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface IKidsMovies {
  id: number;
  title: string;
  poster_path: string;
}

interface IResponseKidsMovies {
  page: number;
  total_results: number;
  total_pages: number;
  results: IKidsMovies[];
}

interface IKidsdMoviesProps {
  className?: string;
  movieType?: string;
  tvType?: string;
  title?: string;
  type: string;
}

interface ITopKidsMoviesState {
  data: IKidsMovies[];
}
class PopularMoviesComponent extends React.Component<
  IKidsdMoviesProps,
  ITopKidsMoviesState
> {
  constructor(props: any) {
    super(props);
    // Don't call this.setState() here!
    this.state = { data: [] };
  }

  componentDidMount() {
    this.GetMovies();
  }

  GetMovies() {
    switch (this.props.type) {
      case "tvShow":
        fetch(
          `https://api.themoviedb.org/3/tv/${this.props.tvType}?api_key=9f471da832491516e75802f839e2bae2&language=en-US&page=1`
        )
          .then(res => {
            return res.json();
          })
          .then((response: IResponseKidsMovies) => {
            this.setState({ data: this.shuffle(response.results) });
            return;
          });
        return;
      case "movie":
        fetch(
          `https://api.themoviedb.org/3/discover/movie?${this.props.movieType}&api_key=9f471da832491516e75802f839e2bae2`
        )
          .then(res => {
            return res.json();
          })
          .then((response: IResponseKidsMovies) => {
            this.setState({ data: this.shuffle(response.results) });
            return;
          });
        return;
    }
  }

  shuffle(array: any[]) {
    let currentIndex: any = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  render() {
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 3
      }
    };

    const HandleClick = () => {
      this.setState({ ...this.state, data: this.shuffle(this.state.data) });
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    };

    const handleRouting = (itemId: number, posterPath: string) => {
      switch (this.props.type) {
        case "tvShow":
          return (
            <Link to={`/tv-shows-library/tv-show/${itemId}`}>
              <img
                key={itemId}
                src={`https://image.tmdb.org/t/p/w500${posterPath}`}
              />
            </Link>
          );
        case "movie":
          return (
            <Link to={`/movies-library/movie/${itemId}`}>
              <img
                key={itemId}
                src={`https://image.tmdb.org/t/p/w500${posterPath}`}
              />
            </Link>
          );
      }
    };

    return (
      <div className={this.props.className}>
        <label className="Label">{this.props.title}</label>
        <Carousel
          responsive={responsive}
          swipeable={false}
          draggable={false}
          infinite={true}
          centerMode={true}
        >
          {this.state.data.map((item: IKidsMovies) => {
            return item.poster_path != undefined ? (
              <div onClick={HandleClick} key={item.id} className="Movie">
                {handleRouting(item.id, item.poster_path)}
              </div>
            ) : (
              ""
            );
          })}
        </Carousel>
      </div>
    );
  }
}

export const CarouselComponent = styled(PopularMoviesComponent)`
  font-family: "Times New Roman";
  background: black;

  .Label {
    font-size: 3vw;
    margin-left: 40px;
    color: white;
    font: bold;

    @media screen and (min-device-width: 300px) and (max-device-width: 845px) {
      font-size: 7vw;
      color: white;
      margin-left: 10px;
    }
  }
  .Movie {
    width: 250px;

    @media screen and (min-device-width: 300px) and (max-device-width: 845px) {
      width: 120px;
    }
  }
`;
