import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import hi from './locales/hi.json';
import pt from './locales/pt.json';
import ru from './locales/ru.json';
import zh from './locales/zh.json';

export const languages = [
  { code: 'en' },
  { code: 'ru' },
  { code: 'es' },
  { code: 'zh' },
  { code: 'hi' },
  { code: 'fr' },
  { code: 'pt' }
] as const;

export type Language = (typeof languages)[number]['code'];
export type TranslationKey = keyof typeof en;
type TranslationMap = Record<TranslationKey, string>;

export const defaultLanguage: Language = 'en';

export const translations: Record<Language, TranslationMap> = {
  en,
  ru,
  es,
  zh,
  hi,
  fr,
  pt
};

export function isLanguage(value: string | null): value is Language {
  return languages.some((language) => language.code === value);
}

export function translate(language: Language, key: TranslationKey) {
  return translations[language][key] ?? translations[defaultLanguage][key];
}
