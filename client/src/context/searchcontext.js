import { createContext, useContext } from "react";
import { useState } from "react";
const Searchcontext = createContext();

const Searchprovider = ({ children }) => {
  const [x, setx] = useState({
    results: [],
    keywords: "",
  });
  return (
    <Searchcontext.Provider value={[x, setx]}>
      {children}
    </Searchcontext.Provider>
  );
};
const useSearch = () => useContext(Searchcontext);
export { Searchprovider, useSearch };
