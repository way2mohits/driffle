import { useState } from "react";
import "./App.css";
import { LanguageContext } from "./Context/LanguageContext";
import { getInitialLanguage } from "./utils/language";
import { HomeScreen } from "./components/homeScreen/HomeScreen";

function App() {
  const [currentLanguage, setCurrentLanguage] = useState(getInitialLanguage());
  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem("language", lang);
  };
  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      <div className="App">
        <HomeScreen />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
