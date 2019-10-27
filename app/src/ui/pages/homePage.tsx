import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {MainComponent} from '../templates/MainComponent'
import {PopularMovies} from '../organism/popularMovies'
import {TopRatedMovies} from '../organism/topRatedMovie'
import {KidsMovies} from '../organism/kidsMovie'
import {ScienceFictionsMovies} from '../organism/scienceFictionMove'

interface IHomePage {
    className?: string;
}

const Component: React.FunctionComponent<IHomePage> = (props: IHomePage) => {

        return(       
        <div className={props.className}>
            <MainComponent/>
            <PopularMovies/>
            <KidsMovies/>
            <ScienceFictionsMovies/>
            <TopRatedMovies/>
        </div>
        )
    }


export const HomePage = styled(Component)`` 