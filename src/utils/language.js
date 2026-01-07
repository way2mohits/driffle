import { translation } from "../translation";

export const getInitialLanguage = () => {
  const savedLang = localStorage.getItem("language");
  if (savedLang) return savedLang;

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("es")) return "es";

  return "en";
};

const convertKeyToSnakeCase = (key)=>{
  return key.toLowerCase().split(' ').join('_').split("'").join("")
}

export const getTranslatedLanguage = (key) => {
  const selectedLanguage = localStorage.getItem('language') || 'en';
  const translationKeys = translation[selectedLanguage];

  if (!translationKeys) return key;

  const snakeKey = convertKeyToSnakeCase(key);
  return translationKeys[snakeKey] || key;
};
