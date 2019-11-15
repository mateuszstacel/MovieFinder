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
  movieType: string;
  title?: string;
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
    fetch(
      `https://api.themoviedb.org/3/discover/movie?${this.props.movieType}&api_key=9f471da832491516e75802f839e2bae2`
    )
      .then(res => {
        debugger;
        return res.json();
      })
      .then((response: IResponseKidsMovies) => {
        this.setState({ data: this.shuffle(response.results) });
        return;
      });
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
        items: 1
      }
    };

    const HandleClick = () => {
      window.scrollTo(0, 0);
    };

    return (
      <div className={this.props.className}>
        <label className="Label">{this.props.title}</label>
        <Carousel
          responsive={responsive}
          swipeable={false}
          draggable={false}
          infinite={true}
        >
          {this.state.data.map((item: IKidsMovies) => {
            return item.poster_path != undefined ? (
              <div onClick={HandleClick} key={item.id} className="Movie">
                <Link to={`/movies-library/movie/${item.id}`}>
                  <img
                    key={item.id}
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  />
                </Link>
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
  }
  .Movie {
    width: 300px;
  }
`;
