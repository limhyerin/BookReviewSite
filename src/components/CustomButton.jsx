import React from 'react';
import styled from 'styled-components';

const StyledButtonWrap = styled.div`
  button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
    padding: ${(props) => (props.size === 'large' ? '1.0rem 5.5rem' : '0.5rem 1rem')};
    font-family: 'Noto Sans KR', sans-serif;
    font-size: ${(props) => (props.size === 'large' ? props.theme.fontSize.xl2 : props.theme.fontSize.base)};
    font-weight: 400;
    text-align: center;
    text-decoration: none;
    border: none;
    display: inline-block;
    width: auto;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    cursor: pointer;
    transition: 0.5s;
    color: ${(props) => (props.color === 'main' ? 'black' : 'white')};
    cursor: pointer;
    background-color: ${(props) => (props.color === 'main' ? props.theme.colors.main : props.theme.colors.mainBlack)};
    border-radius: ${(props) => (props.radius === 'circle' ? '9999px' : '5px')};
  }

  button:active,
  button:hover,
  button:focus {
    // background: red;
    outline: 0;
  }
`;
const CustomButton = ({ onClick, color, radius, text, size }) => {
  return (
    <StyledButtonWrap onClick={onClick} color={color} radius={radius} size={size}>
      <button>{text}</button>
    </StyledButtonWrap>
  );
};

export default CustomButton;
