import React, { createContext, useContext, useState } from 'react';

const DropdownContext = createContext();

export const useDropdown = () => useContext(DropdownContext);

export const DropdownProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectItem = (item) => {
    setSelectedItem(item);
  };
  return (
    <DropdownContext.Provider value={{ isOpen, selectedItem, toggleDropdown, selectItem }}>
      {children}
    </DropdownContext.Provider>
  );
};
