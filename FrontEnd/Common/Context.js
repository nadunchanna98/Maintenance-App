import React, { createContext, useState } from 'react';

// Create a new context
export const Context = createContext();

// Create a provider component
export const Provider = ({ children }) => {

  const [data, setData] = useState([]);

  // Define any other functions or state variables you need

  // Wrap the children components with the context provider
  return (
    <Context.Provider
      value={{
        data,
        setData,
        // Pass any other functions or state variables to the value object
      }}
    >
      {children}
    </Context.Provider>
  );
};
