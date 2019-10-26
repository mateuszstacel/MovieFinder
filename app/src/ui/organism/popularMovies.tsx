import React, { useState, useEffect, useLayoutEffect } from 'react'

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

export class Movies extends React.Component<any, any> {

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

    return(
<ul>
        {this.state.data.map( (item: IPopularMovies) => {
            return <h1>{item.id}</h1>
        })}
</ul>
    )
}
}