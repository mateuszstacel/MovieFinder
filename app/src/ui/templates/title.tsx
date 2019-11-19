import React from "react";
import styled from "styled-components";

interface IComponent {
  className?: string;
}

export const Component: React.FunctionComponent<IComponent> = (
  props: IComponent
) => {
  return (
    <div className={props.className}>
      <div className="Tittle">
        <label className="TittleLabel">
          Your public library to find yours favorite movies.
        </label>
        <br />
        <label className="subtitle subtitleLabel">
          Discover over million videos shared by our generous community.
        </label>
      </div>
      <br />
    </div>
  );
};

export const Title = styled(Component)`
  .TittleLabel {
    @media screen and (min-device-width: 300px) and (max-device-width: 845px) {
      font-size: 5vw;
      margin-bottom: 25px;
    }
  }

  .subtitleLabel {
    @media screen and (min-device-width: 300px) and (max-device-width: 845px) {
      font-size: 3.5vw;
      color: white;
    }
  }
`;
