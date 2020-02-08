import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {en} from "./assets/lang/en";
import {fr} from "./assets/lang/fr";
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';

// the translations
const resources = {
    en: {
        translation: en
    },
    fr: {
        translation: fr
    },
};

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false
        }
    });

export default i18n;
