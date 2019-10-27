import React, { useState, useEffect, useLayoutEffect } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styled from 'styled-components'

interface IPopularMovies {
    id: number,
    title: string,
    poster_path: string
}

interface IResponsePopularMovies {
    page: number,
    total_results: number,
    total_pages: number,
    results: IPopularMovies[]
}

interface IPopularMoviesProps {
    className?: string;
}

interface IIPopularMoviesState {
    data: IPopularMovies[]
}
 class PopularMoviesComponent extends React.Component<IPopularMoviesProps, IIPopularMoviesState> {

    constructor(props: any) {
        super(props);
        // Don't call this.setState() here!
        this.state = { data: [] };
    }

    componentDidMount() {
        this.GetMovies();
    }

   GetMovies() {
        fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9f471da832491516e75802f839e2bae2")
        .then(res => {
            debugger;
            return res.json()
        }).then((response: IResponsePopularMovies) =>{
           this.setState({data: response.results})
        })
    }

render () {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      };


    return(
        <div className={this.props.className}>
            <label className="Label">Martii</label>
<Carousel responsive={responsive}
 swipeable={false}
 draggable={false}
 infinite={true}>
        {this.state.data.map( (item: IPopularMovies) => {
            return <div className="Movie">
                      <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}/>              
                 </div>
        })}
</Carousel>
</div>
    )
}
}

export const PopularMovies = styled(PopularMoviesComponent)`
font-family: "Times New Roman";
background: black;

.Label {
    font-size: 3vw;
    margin-left: 40px;
    color: white;
    font: bold;
}
.Movie {
    width: 350px;
  
}
`