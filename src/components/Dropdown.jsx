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
`;
const DropdownButton = () => {
  const { selectedItem, toggleDropdown } = useDropdown();

  return (
    <StyledButton onClick={toggleDropdown}>
      <p>{selectedItem ? selectedItem : '카테고리'}</p>
      <IoIosArrowDown style={{ position: 'absolute', right: '10px' }} />
    </StyledButton>
  );
};

const DropdownMenu = ({ items, setSelectedItem }) => {
  const { selectedItem, toggleDropdown, selectItem, isOpen } = useDropdown();
  if (!isOpen) {
    return;
  }

  return (
    <ul
      style={{
        width: '100px',
        position: 'absolute',
        backgroundColor: '#222',
        textAlign: 'center',
        border: '1px solid #000',
        color: '#fff'
      }}
    >
      {items.map((item) => (
        <li
          style={{ padding: '5px', borderBottom: '1px solid #000' }}
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
    </ul>
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
