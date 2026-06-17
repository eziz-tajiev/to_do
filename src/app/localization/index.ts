import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { LocalStorage } from '@/shared/lib/LocalStorage'

import tk from './tk.json'
import ru from './ru.json'
import en from './en.json'

i18n.use(initReactI18next).init({
  resources: {
    tk: {
      translation: tk,
    },
    ru: {
      translation: ru,
    },
    en: {
      translation: en,
    },
  },
  lng: (await LocalStorage.get('locale')) || 'tk',
  fallbackLng: (await LocalStorage.get('locale')) || 'tk',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
