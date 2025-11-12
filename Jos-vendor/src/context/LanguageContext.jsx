import React, { createContext, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  return (
    <LanguageContext.Provider value={{}}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
