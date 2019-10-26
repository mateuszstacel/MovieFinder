import React from 'react'
import styled from 'styled-components'

interface IComponent {
className?: string
}

const Component: React.FunctionComponent<IComponent> = (props: IComponent) => {
    return(
        <div className={props.className}>
        <div className="control has-icons-left">
        <input className="input is-large" type="text" placeholder="search movie"/>
        <span className="icon is-left">
        <i className="fas fa-search"></i>
        </span>
</div>

</div>
    )

}


export const InputComponent = styled(Component)`
.control {
    margin-left: 25%;
}

.input{
width: 70%;
}
`