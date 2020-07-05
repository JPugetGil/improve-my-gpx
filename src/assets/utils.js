class Utils {
    getCurrentLanguage(i18n) {
        let currentLanguage;
        const language = i18n.language;
        if (language.includes('-')) {
            currentLanguage = language.split('-')[0];
        } else {
            currentLanguage = language;
        }

        return currentLanguage;
    }
}

export default new Utils();
