import React from "react";
import styled from "styled-components";

interface IComponent {
  classNameName?: string;
}

const Component: React.FunctionComponent<IComponent> = (props: IComponent) => {
  return <div className={props.classNameName}></div>;
};

export const SearchViewComponent = styled(Component)``;
