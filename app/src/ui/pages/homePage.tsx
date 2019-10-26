import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {MainComponent} from '../templates/MainComponent'
import {Movies} from '../organism/popularMovies'

interface IHomePage {
    className?: string;
}

const Component: React.FunctionComponent<IHomePage> = (props: IHomePage) => {

        return(       
        <div className={props.className}>
            <MainComponent/>
            <Movies/>
        </div>
        )
    }


export const HomePage = styled(Component)`` 