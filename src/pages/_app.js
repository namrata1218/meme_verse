import Footer from '@/Components/Footer/Footer';
import '../style/globals.css';
import Navbar from "@/Components/Navbar/Navbar";
import { createContext, useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from "framer-motion";

export const ThemeContext = createContext(null);

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div id={theme} className="bg-white dark:bg-gray-900 min-h-screen">
        <Navbar />

        
        <div className="p-4 flex justify-end">
          <motion.div
            whileTap={{ scale: 0.9 }} 
            animate={{ rotate: theme === "light" ? 90 : 0 }} 
            transition={{ duration: 0.3, ease: "easeInOut" }} 
            className="cursor-pointer"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <motion.div whileHover={{ scale: 1.2 }}>
                <Moon className="text-white" />
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.2 }}>
                <Sun className="text-yellow-500" />
              </motion.div>
            )}
          </motion.div>
        </div>

        <Component {...pageProps} />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}
