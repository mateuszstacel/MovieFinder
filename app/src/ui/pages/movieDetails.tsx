import React, {useState, useEffect} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {NavBar} from '../templates/navbar'
import {PlayMovieComponent} from '../organism/youtubeModal'
import {CarouselComponent} from '../organism/movieCarousel'

type TParams = { id: string };



enum KindsOfMovies {
    drama = "with_genres=18&sort_by=vote_average.desc&vote_count.gte=10",
    best2010 = "/discover/movie?with_genres=12&primary_release_year=2010",
    withBradPitt = "/discover/movie?with_people=287,819&sort_by=vote_average.desc",
    lowRated = "/discover/movie?sort_by=popularity.asc"
}


export const MovieDetails: React.FunctionComponent<RouteComponentProps<TParams, any, any>> = ({ match }: RouteComponentProps<TParams>) => {
    
    const [imgSrc, setImgSrc] = useState("");
    const [movieKey, setMovieKey] = useState("");
    const [title, setTitle] = useState("");
    const [overview, setOverview] = useState("");
    const [tagline, setTagLine] = useState("");
    const [voteAverage, setVoteAvarage] = useState("");
    const [totalVotes, setTotalVotes] = useState("");
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
 
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=9f471da832491516e75802f839e2bae2`).then(res => {
            return res.json()
        }).then(response => {
            console.log(response)
            setImgSrc(response.poster_path);
            setTitle(response.title)
            setOverview(response.overview);
            setTagLine(response.tagline);
            setVoteAvarage(response.vote_average.toString());
            setTotalVotes(response.vote_count);
        })

        fetch(`https://api.themoviedb.org/3/movie/${match.params.id}/videos?api_key=9f471da832491516e75802f839e2bae2&language=en-US`)
        .then(res => {
            return res.json()
        }).then(response => {
            debugger;
            console.log(response)
            if(response.results.length > 0)
            {
                setMovieKey(response.results[0].key)
                setIsVideoVisible(true);
            }else{
                setShowVideo(false);
                setIsVideoVisible(false);
            }
                
           
         
        })
    })

        
useEffect(() => {
    if(movieKey != ""){
        setIsVideoVisible(true);
    }
}, [movieKey])

const HandleVideoClose = () => {
    setShowVideo(false);
}

const HandleVideoClick = () => {
    setShowVideo(true);
}
    return(<div >
<NavBar/>




<div className="MovieDetailsMainComponent">

       
                    {showVideo && <PlayMovieComponent movieKey={movieKey} onClose={HandleVideoClose}/>}
                <div className="MovieImage">
                <img width="300" height="300" src={`https://image.tmdb.org/t/p/w500/${imgSrc}`}/>
                </div>

                <div className="Description">
                    <label className="title has-text-white">{title}</label><br/>
                    <p><i className="far fa-star has-text-warning"></i> {voteAverage} of {totalVotes} voutes</p><br/> 
                    <label className="subtitle has-text-white">{tagline}</label><br/>
                  
                    <br/> <br/> <br/>
                    {overview}


                   
                </div>
                {isVideoVisible && <div className="PlayVideo"> <p className="title has-text-white" onClick={HandleVideoClick}>Watch thriller<br/><i className="fab fa-youtube"></i></p> </div>}
            </div>

            <CarouselComponent movieType={KindsOfMovies.best2010} title="Explore More" />
            <CarouselComponent movieType={KindsOfMovies.withBradPitt} />
            <CarouselComponent movieType={KindsOfMovies.drama} />
            <CarouselComponent movieType={KindsOfMovies.lowRated} />
            
              

        
            </div>)
}

