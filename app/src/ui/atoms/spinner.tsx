import React from "react";
import styled from "styled-components";

interface ISpinnerProps {
  className?: string;
  label: string;
}

const SpinnerComponent: React.FunctionComponent<ISpinnerProps> = (
  props: ISpinnerProps
) => {
  return (
    <div className={props.className}>
      <span />
      <label>{props.label}</label>
    </div>
  );
};

export const Spinner = styled(SpinnerComponent)`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  span:after {
    animation: spinAround 500ms infinite linear;
    border: 2px solid #dbdbdb;
    border-radius: 290486px;
    border-right-color: transparent;
    border-top-color: transparent;
    content: "";
    display: block;
    height: 5em;
    position: relative;
    width: 5em;
    left: calc(50% - (5em / 2));
    top: calc(50% - (5em / 2));
  }
  label {
    margin: 12px;
  }
`;
