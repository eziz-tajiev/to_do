import { Select } from 'antd'
import { useTranslation } from 'react-i18next'
import { LocalStorage } from '@/shared/lib/LocalStorage'

const languages = [
  { value: 'tk', label: 'TK' },
  { value: 'ru', label: 'RU' },
  { value: 'en', label: 'EN' },
]

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const handleChange = (lang: string) => {
    i18n.changeLanguage(lang)
    LocalStorage.set('lang', lang)
  }

  return <Select value={i18n.language} onChange={handleChange} options={languages} size="small" />
}
