import React from 'react';
import styled from 'styled-components';

const CustomSidebar = ({ items, setItem, selectedItem }) => {
  return (
    <StyledSidebar style={{ flex: 1 }}>
      <StyledSidebarUl>
        {items.map((item, index) => (
          <StyledSidebarLi
            key={index}
            onClick={() => {
              setItem(item);
            }}
            $isSelected={item === selectedItem}
          >
            {item}
          </StyledSidebarLi>
        ))}
      </StyledSidebarUl>
    </StyledSidebar>
  );
};

export default CustomSidebar;

const StyledSidebar = styled.div`
  position: sticky;
  top: 100px;
  height: 700px;
  background-color: #fff;
  color: ${(props) => props.theme.colors.mainBlack};
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: ${(props) => props.theme.fontSize.base};
  padding: 30px;
  text-align: center;
  cursor: pointer;
  > ul {
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const StyledSidebarUl = styled.ul`
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

const StyledSidebarLi = styled.li`
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.$isSelected ? (props) => props.theme.colors.main : '')};
`;
