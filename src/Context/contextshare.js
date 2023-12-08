import React, { createContext, useState } from 'react';

export const AddProjectResponseContext = createContext();

function ContextShare({ children }) {
    const [addProjectResponse, setAddProjectResponse] = useState({});
  
    return (
      <AddProjectResponseContext.Provider value={{ addProjectResponse, setAddProjectResponse }}>
        {children}
      </AddProjectResponseContext.Provider>
    );
  }
  
  export default ContextShare;