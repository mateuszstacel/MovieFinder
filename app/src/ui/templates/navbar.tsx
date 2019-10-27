import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

interface INavBar{
    className?: string;
}

const Component: React.FunctionComponent<INavBar> = (props: INavBar) => {
return(
    <div className={props.className}>
        <Link to="/">
        <div className="Logo">          
        <img height="160" width="160" src ="/images/logo.jpg"/>
         
        </div>
        </Link>

    </div>
)
}



export const NavBar = styled(Component)`
color: white;
font: bold;
padding: 20px;
justify-content: center;
.LogoText {
    line-height: 160px;
}
.Logo {
font-size:2vw;
font-family: "Times New Roman";
}


`