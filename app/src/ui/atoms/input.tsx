import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { onInputChange } from "../../helper/event";

interface IComponent {
  className?: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const Component: React.FunctionComponent<IComponent> = (props: IComponent) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    props.onChange(inputValue);
  }, [inputValue]);

  const HandleEnterPress = (event: any) => {
    if (event.keyCode === 13) {
      console.log(event);
    }
  };

  return (
    <div className={props.className}>
      <div className="control has-icons-left">
        <input
          onChange={onInputChange(setInputValue)}
          onKeyUp={HandleEnterPress}
          className="input is-large"
          type="text"
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

  .input {
    width: 70%;
  }
`;
