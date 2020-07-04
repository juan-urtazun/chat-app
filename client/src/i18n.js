import i18n from "i18next";
import { initReactI18next } from "react-i18next";
let lng = "en";
try {
  lng = navigator.languages.find((l) => l.toLowerCase() === "es") ? "es" : "en";
} catch (error) {}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          join: "Join",
          "Sing In": "Sing In",
          "Name": "name",
          "Room name": "Room name" ,
          "Type a message": "Type a message...",
          "Send": "Send"
        },
      },
      es: {
        translation: {
          join: "Unirse",
          "Sing In": "Ingresar",
          "Name": "Nombre",
          "Room name": "Nombre de la sala",
          "Type a message": "Escriba un mesaje...",
          "Send": "Enviar"
        },
      },
    },
    lng,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
