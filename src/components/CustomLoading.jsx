import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import styled from 'styled-components';

const StyledCustomLoading = styled.div`
  .animate-spin {
    animation: spin 1s linear infinite;
    font-size: ${(props) => props.theme.fontSize.xl5};
    color: #999;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const CustomLoading = () => {
  return (
    <StyledCustomLoading>
      <AiOutlineLoading3Quarters className="animate-spin" />
    </StyledCustomLoading>
  );
};

export default CustomLoading;
