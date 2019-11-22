import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { onInputChange } from "../../helper/event";

interface IComponent {
  className?: string;
  placeholder: string;
  onChange: (value: string) => void;
  inputValue: string;
}

const Component: React.FunctionComponent<IComponent> = (props: IComponent) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    props.onChange(inputValue);
  }, [inputValue]);

  return (
    <div className={props.className}>
      <div className="control has-icons-left">
        <input
          onChange={onInputChange(setInputValue)}
          className="input is-medium"
          type="text"
          value={props.inputValue}
          placeholder={props.placeholder}
        />
        <span className="icon is-left">
          <i className="fas fa-search"></i>
        </span>
      </div>
    </div>
  );
};

export const InputComponent = styled(Component)`
  .control {
    margin-left: 25%;
  }

  .is-medium {
    @media screen and (min-device-width: 300px) and (max-device-width: 845px) {
      margin-left: -5%;
    }
  }

  .icon {
    @media screen and (min-device-width: 300px) and (max-device-width: 845px) {
      margin-left: -5%;
    }
  }

  .has-icons-left {
    @media screen and (min-device-width: 360px) and (max-device-width: 845px) {
      width: 100%;
    }
  }

  .input {
    width: 70%;
  }
`;
