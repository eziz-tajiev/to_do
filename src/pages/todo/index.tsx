import { Button, Card, Checkbox, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { LanguageSwitcher } from '@/widgets/LanguageSwitcher'
import { ThemeToggle } from '@/widgets/ThemeToggle'
import { LocalStorage } from '@/shared/lib/LocalStorage'

export const TodoPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleLogout = () => {
    LocalStorage.delete('accessToken')
    LocalStorage.delete('refreshToken')
    navigate('/login')
  }

  return (
    <div className="flex justify-center pt-20 px-4">
      <div className="absolute right-4 top-4 flex items-center gap-2">
        <ThemeToggle />
        <LanguageSwitcher />
        <Button danger onClick={handleLogout}>
          {t('todo.logout')}
        </Button>
      </div>
      <Card className="w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          {t('todo.title')}
        </h1>

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
              <div className="flex flex-col gap-1 sm:flex-row">
                <Button size="small" className="w-24">
                  {t('todo.edit')}
                </Button>
                <Button danger size="small" className="w-24">
                  {t('todo.delete')}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  )
}
