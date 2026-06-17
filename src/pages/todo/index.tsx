import { Button, Card, Checkbox, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/widgets/LanguageSwitcher'
import { ThemeToggle } from '@/widgets/ThemeToggle'

export const TodoPage = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto w-full max-w-lg">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('todo.title')}</h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-2 sm:flex-row">
          <Input placeholder={t('todo.placeholder')} size="large" />
          <Button type="primary" size="large" className="sm:w-24 sm:shrink-0">
            {t('todo.add')}
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <Card size="small">
            <div className="flex items-center justify-between">
              <Checkbox>Sample task 1</Checkbox>
              <Button danger size="small">
                {t('todo.delete')}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
