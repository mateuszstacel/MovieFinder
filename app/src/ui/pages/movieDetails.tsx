import React from 'react'
import {RouteComponentProps} from 'react-router-dom'

type TParams = { id: string };


export const MovieDetails = ({ match }: RouteComponentProps<TParams> ) => {
const debug = () => {
    debugger;
    console.log();
}

    return(<div>
  {match.params.id}
        <h1>hello </h1>
    </div>)
}