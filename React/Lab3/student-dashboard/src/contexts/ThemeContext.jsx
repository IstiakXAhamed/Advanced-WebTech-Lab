import { createContext, useState, useEffect, useContext } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
   const [theme, setTheme] = useState(() => {
     let saved = localStorage.getItem('theme');
     return saved || 'dark'
   });

   useEffect(() => {
     if(theme === 'dark') {
       document.documentElement.classList.add('dark');
     } else {
       document.documentElement.classList.remove('dark');
     }
     localStorage.setItem('theme', theme);
   }, [theme])

   const toggleTheme = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
   }

   return (
     <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
     </ThemeContext.Provider>
   )
}

export const useTheme = () => useContext(ThemeContext)
