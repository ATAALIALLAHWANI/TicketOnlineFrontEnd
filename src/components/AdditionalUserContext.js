import { createContext, useContext, useState } from 'react';

const AdditionalUserContext = createContext();

export const AdditionalUserProvider = ({ children }) => {
  const [additionalUserData, setAdditionalUserData] = useState(null);

  const setAdditionalUser = (data) => {
    setAdditionalUserData(data);
  };

  return (
    <AdditionalUserContext.Provider value={{ additionalUserData, setAdditionalUser }}>
      {children}
    </AdditionalUserContext.Provider>
  );
};

export const useAdditionalUser = () => {
  return useContext(AdditionalUserContext);
};