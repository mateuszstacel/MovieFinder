import React, { useState } from 'react'
import styled from 'styled-components'
import Background from '../../../public/images/mainBackground.jpg' 
import {NavBar} from './navbar'
import {InputComponent} from '../atoms/input'
import {Title} from '../templates/title'
import {Movies} from '../organism/popularMovies'
interface IMainComponent {
    className?: string
}


const Component: React.FunctionComponent<IMainComponent> = (props: IMainComponent) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const Handle = () => {
        setIsLoaded(true);
    }
    return(
        <div className={props.className}>
            <NavBar/>
            <br/>
            <Title />
           <InputComponent/>      
           <small className="control helper has-text-white ">Action, Advertisement, Adventure, Comedy, Crime, Drama, Fantasy, History, Horror</small>          
        </div>
    )
}

export const MainComponent = styled(Component)`
width: 100%;
height: 500px;
background-image: url("https://i.pinimg.com/originals/0c/1b/54/0c1b541757e16d7c32736c0ec00d416f.jpg");
background-size: 100%;
background-repeat: no-repeat;

.Tittle {
    text-align: center;
    font-size:3vw;
    color: white;
}
.Logo {
font-size:2vw;
font-family: "Times New Roman"
}

.control {
    margin-left: 25%;
}

.input{
width: 70%;
}

`