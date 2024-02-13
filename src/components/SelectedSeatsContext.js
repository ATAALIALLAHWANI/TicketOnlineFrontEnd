import React, { createContext, useContext, useState } from 'react';

const SelectedSeatsContext = createContext();

export const SelectedSeatsProvider = ({ children }) => {
  const [selectedSeats, setSelection] = useState(null);

  const setSeatsSelection = (selected) => {
    setSelection(selected);
  };

  return (
    <SelectedSeatsContext.Provider value={{ selectedSeats, setSeatsSelection }}>
      {children}
    </SelectedSeatsContext.Provider>
  );
};

export const useUserSeat = () => {
  const context = useContext(SelectedSeatsContext);

  if (!context) {
    throw new Error('useUserSeat must be used within a SelectedSeatsProvider');
  }

  return context;
};
