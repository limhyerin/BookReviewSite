import React from 'react';
import { DropdownProvider, useDropdown } from './DropdownContext';
import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';

const StyledButton = styled.button`
  width: 100px;
  height: 30px;
  background-color: transparent;
  border: 1px solid #222;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  p {
    width: 100%;
  }
  .arrow_icon {
    position: absolute;
    right: 5px;
  }
`;

const StyledDropdownMenu = styled.ul`
  width: 100px;
  position: absolute;
  background-color: #222;
  text-align: center;
  border: 1px solid #222;
  color: #fff;
  li {
    padding: 5px;
    border-bottom: 1px solid #222;
  }
`;
const DropdownButton = () => {
  const { selectedItem, toggleDropdown } = useDropdown();

  return (
    <StyledButton onClick={toggleDropdown}>
      <p>{selectedItem ? selectedItem : '카테고리'}</p>
      <IoIosArrowDown className="arrow_icon" />
    </StyledButton>
  );
};

const DropdownMenu = ({ items, setSelectedItem }) => {
  const { selectedItem, toggleDropdown, selectItem, isOpen } = useDropdown();
  if (!isOpen) {
    return;
  }

  return (
    <StyledDropdownMenu style={{}}>
      {items.map((item) => (
        <li
          style={{}}
          onClick={() => {
            selectItem(item);
            toggleDropdown(false);
            setSelectedItem(item);
          }}
          key={item}
        >
          {item === selectedItem ? item : item}
        </li>
      ))}
    </StyledDropdownMenu>
  );
};

const Dropdown = ({ items, setSelectedItem }) => {
  return (
    <DropdownProvider>
      <div>
        <DropdownButton />
        <DropdownMenu items={items} setSelectedItem={setSelectedItem} />
      </div>
    </DropdownProvider>
  );
};

export default Dropdown;
