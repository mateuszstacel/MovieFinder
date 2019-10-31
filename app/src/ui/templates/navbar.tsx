import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface INavBar {
  className?: string;
  onCategoryChange?: () => void;
  onMovieActive?: boolean;
  onTvShowActive?: boolean;
}

const Component: React.FunctionComponent<INavBar> = (props: INavBar) => {
  return (
    <div className={props.className}>
      <div className="columns">
        <Link to="/">
          <div className="Logo">
            <img height="160" width="160" src="/images/logo.jpg" />
          </div>
        </Link>

        <div className="marginClass">
          <Link to="/">
            <p
              onClick={props.onCategoryChange}
              className={`SidebarOption ${
                props.onMovieActive ? "underLine" : ""
              }`}
            >
              Movies
            </p>
          </Link>
        </div>

        <div className="marginClass">
          <Link to="/">
            <p
              onClick={props.onCategoryChange}
              className={`SidebarOption ${
                props.onTvShowActive ? "underLine" : ""
              }`}
            >
              TV Shows
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const NavBar = styled(Component)`
  color: white;
  font: bold;
  padding: 20px;
  justify-content: center;
  .LogoText {
    line-height: 160px;
  }

  .Logo {
    font-size: 2vw;
    font-family: "Times New Roman";
  }

  .SidebarOption {
    color: white;
    font-size: 1.5vw;
  }
  .marginClass {
    margin-left: 5%;
  }

  .underLine {
    border-bottom: 3px solid white;
    padding-bottom: 5px;
  }
`;
