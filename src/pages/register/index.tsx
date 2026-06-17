import { Button, Card, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ThemeToggle } from '@/widgets/ThemeToggle'
import { LanguageSwitcher } from '@/widgets/LanguageSwitcher'

export const RegisterPage = () => {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="absolute right-4 top-4 flex items-center gap-2">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
      <Card className="w-full max-w-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-gray-100">
          {t('register.title')}
        </h1>
        <div className="flex flex-col gap-3">
          <Input size="large" placeholder={t('register.username')} />
          <Input size="large" placeholder={t('register.email')} />
          <Input size="large" placeholder={t('register.firstName')} />
          <Input size="large" placeholder={t('register.lastName')} />
          <Input.Password size="large" placeholder={t('register.password')} />
          <Button type="primary" size="large" block>
            {t('register.submit')}
          </Button>
          <div className="text-center text-sm">
            {t('register.hasAccount')}{' '}
            <Link to="/login">{t('register.signIn')}</Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
