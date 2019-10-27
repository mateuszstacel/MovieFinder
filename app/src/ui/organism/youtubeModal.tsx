import React from 'react'

interface IPlayMovieComponent {
    movieKey: string;
    onClose: () => void;
}
export const PlayMovieComponent: React.FunctionComponent<IPlayMovieComponent> = (props: IPlayMovieComponent) => {

    return(   

                 <div className="modal is-active">
    <div className="modal-background"></div>

    <div className="modal-card">
    <button onClick={props.onClose} className="modal-close is-large" aria-label="close"></button>
      <section className=" viedoModal">
      <iframe className="YoutubeVideo"
                       src={`https://www.youtube.com/embed/${props.movieKey}`}>
                  </iframe>}
      </section>
    </div>
  </div>





  )
}