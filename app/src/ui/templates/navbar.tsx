import React from 'react'
import styled from 'styled-components'
import Logo from '../../../public/images/logo.jpg'

interface INavBar{
    className?: string;
}

const Component: React.FunctionComponent<INavBar> = (props: INavBar) => {
return(
    <div className={props.className}>
        <div className="Logo">          
            <p>Movie Library <i className="fas fa-video"></i></p>
        </div>


    </div>
)
}



export const NavBar = styled(Component)`
color: white;
font: bold;
padding: 20px;
justify-content: center;


`