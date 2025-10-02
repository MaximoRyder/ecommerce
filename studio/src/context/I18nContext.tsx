'use client';

import React, { createContext, useContext, type ReactNode } from 'react';
import type { Locale, Messages } from '@/lib/messages';

interface I18nContextType {
  locale: Locale;
  messages: Messages;
  t: (key: string, values?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: Locale;
  messages: Messages;
}) {
  const t = (key: string, values?: Record<string, string | number>): string => {
    const keyParts = key.split('.');
    let result: any = messages;

    for (const part of keyParts) {
      if (result && typeof result === 'object' && part in result) {
        result = result[part];
      } else {
        // Return the key itself if not found, to make missing translations obvious
        return key;
      }
    }

    if (typeof result === 'string' && values) {
      // Basic interpolation
      return Object.entries(values).reduce(
        (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
        result
      );
    }

    if (typeof result === 'string') {
      return result;
    }

    // If the result is an object (e.g., a namespace), return the key
    return key;
  };

  return (
    <I18nContext.Provider value={{ locale, messages, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
