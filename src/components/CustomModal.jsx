import React from 'react';
import styled from 'styled-components';
import { MdOutlineCancel } from 'react-icons/md';

const StyledModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 1000;
`;
const StyledModalWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800;
  max-width: 100%;
  max-height: 90%;
  overflow-y: auto;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.colors.mainGray};
  text-align: right;
  cursor: pointer;
`;

const CustomModal = ({ isOpen, closeModal, children }) => {
  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <StyledModalContainer>
        <StyledModalWrap>
          <MdOutlineCancel color="#333" size="30px" onClick={closeModal} />
          <div>{children}</div>
        </StyledModalWrap>
      </StyledModalContainer>
    </div>
  );
};

export default CustomModal;
