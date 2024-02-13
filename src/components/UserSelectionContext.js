import React, { createContext, useContext, useState } from 'react';

const UserSelectionContext = createContext();

export const UserSelectionProvider = ({ children }) => {
    const [userSelection, setUserSelection] = useState(null);
  
    const setSelection = (selectedData) => {
      setUserSelection(selectedData);
    };
  
    return (
      <UserSelectionContext.Provider value={{ userSelection, setSelection }}>
        {children}
      </UserSelectionContext.Provider>
    );
  };

    export const useUserSelection = () => {
        const { userSelection, setSelection } = useContext(UserSelectionContext);
        return { userSelection, setSelection };
      };
      
  