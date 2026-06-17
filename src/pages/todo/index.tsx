import { Button, Checkbox, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/widgets/LanguageSwitcher'

export const TodoPage = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto w-full max-w-lg">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">{t('todo.title')}</h1>
          <LanguageSwitcher />
        </div>

        <div className="mb-6 flex gap-2">
          <Input placeholder={t('todo.placeholder')} size="large" />
          <Button type="primary" size="large" className="w-24 shrink-0">
            {t('todo.add')}
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-lg bg-white px-4 py-3 shadow-sm">
            <Checkbox>
              <span className="text-gray-700">Sample task 1</span>
            </Checkbox>
            <Button danger size="small">
              {t('todo.delete')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
