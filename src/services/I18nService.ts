import i18n from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { i18nEn } from "@/i18n/en";
import { i18nZh } from "@/i18n/zh";

export class I18nService {
    static async loadSettings(): Promise<void> {
        i18n
            .use(I18nextBrowserLanguageDetector)
            .use(initReactI18next)
            .init({
                initImmediate: false,
                lng: window.localStorage.getItem("language") ?? "zh",
                fallbackLng: "zh",
                debug: false,
                interpolation: {
                    escapeValue: false,
                },
                ns: ["common"],
				defaultNS: "common",
				resources: {},
            });

        i18n.addResourceBundle("en", "common", i18nEn);
		i18n.addResourceBundle("zh", "common", i18nZh);
    }
}