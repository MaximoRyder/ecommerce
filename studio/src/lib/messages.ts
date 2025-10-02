import en from '@/messages/en.json';
import es from '@/messages/es.json';
import pt from '@/messages/pt.json';

export const locales = ['en', 'es', 'pt'] as const;
export type Locale = (typeof locales)[number];

const messages = {
  en,
  es,
  pt,
};

export type Messages = typeof en;

export function getMessagesForLocale(locale: Locale): Messages {
  return messages[locale];
}
