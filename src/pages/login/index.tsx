import { Alert, Button, Card, Input } from 'antd'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useRetriggerOnLangChange } from '@/shared/utils/useRetriggerOnLangChange'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '@/features/auth/api'
import { ThemeToggle } from '@/widgets/ThemeToggle'
import { LanguageSwitcher } from '@/widgets/LanguageSwitcher'

type FormValues = {
  username: string
  password: string
}

export const LoginPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormValues>()

  useRetriggerOnLangChange(trigger, errors)

  const onSubmit = async (values: FormValues) => {
    setServerError(null)
    try {
      await login(values).unwrap()
      navigate('/')
    } catch {
      setServerError(t('login.error'))
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="absolute right-4 top-4 flex items-center gap-2">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
      <Card className="w-full max-w-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-gray-100">
          {t('login.title')}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {serverError && <Alert type="error" message={serverError} showIcon />}
          <div>
            <Controller
              name="username"
              control={control}
              rules={{ required: t('validation.required') }}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  placeholder={t('login.username')}
                  status={errors.username ? 'error' : ''}
                />
              )}
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div>
            <Controller
              name="password"
              control={control}
              rules={{ required: t('validation.required') }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  placeholder={t('login.password')}
                  status={errors.password ? 'error' : ''}
                />
              )}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button type="primary" size="large" block loading={isLoading} htmlType="submit">
            {t('login.submit')}
          </Button>
          <div className="text-center text-sm">
            {t('login.noAccount')} <Link to="/register">{t('login.signUp')}</Link>
          </div>
        </form>
      </Card>
    </div>
  )
}
