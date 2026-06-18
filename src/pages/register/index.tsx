import { Button, Card, Input } from 'antd'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useRetriggerOnLangChange } from '@/shared/utils/useRetriggerOnLangChange'
import { mapBackendError } from '@/shared/utils/mapBackendError'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '@/features/auth/api'
import { ThemeToggle } from '@/widgets/ThemeToggle'
import { LanguageSwitcher } from '@/widgets/LanguageSwitcher'

type FormValues = {
  username: string
  email: string
  first_name: string
  last_name: string
  password: string
}

export const RegisterPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [register, { isLoading }] = useRegisterMutation()
  const {
    control,
    handleSubmit,
    trigger,
    setError,
    formState: { errors },
  } = useForm<FormValues>()

  useRetriggerOnLangChange(trigger, errors)

  const onSubmit = async (values: FormValues) => {
    try {
      await register(values).unwrap()
      navigate('/login')
    } catch (err) {
      const data = (err as FetchBaseQueryError)?.data as Record<string, string[]> | undefined
      if (data) {
        for (const field of Object.keys(data) as (keyof FormValues)[]) {
          if (Array.isArray(data[field])) {
            const key = mapBackendError(data[field][0])
            setError(field, { message: key.startsWith('backendErrors.') ? t(key) : data[field][0] })
          }
        }
      }
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
          {t('register.title')}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div>
            <Controller
              name="username"
              control={control}
              rules={{ required: t('validation.required') }}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  placeholder={t('register.username')}
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
              name="email"
              control={control}
              rules={{
                required: t('validation.required'),
                pattern: { value: /^\S+@\S+\.\S+$/, message: t('validation.email') },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  placeholder={t('register.email')}
                  status={errors.email ? 'error' : ''}
                />
              )}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <Controller
              name="first_name"
              control={control}
              rules={{ required: t('validation.required') }}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  placeholder={t('register.firstName')}
                  status={errors.first_name ? 'error' : ''}
                />
              )}
            />
            {errors.first_name && (
              <p className="mt-1 text-xs text-red-500">{errors.first_name.message}</p>
            )}
          </div>
          <div>
            <Controller
              name="last_name"
              control={control}
              rules={{ required: t('validation.required') }}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  placeholder={t('register.lastName')}
                  status={errors.last_name ? 'error' : ''}
                />
              )}
            />
            {errors.last_name && (
              <p className="mt-1 text-xs text-red-500">{errors.last_name.message}</p>
            )}
          </div>
          <div>
            <Controller
              name="password"
              control={control}
              rules={{
                required: t('validation.required'),
                minLength: { value: 8, message: t('validation.minLength', { count: 8 }) },
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  placeholder={t('register.password')}
                  status={errors.password ? 'error' : ''}
                />
              )}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button type="primary" size="large" block loading={isLoading} htmlType="submit">
            {t('register.submit')}
          </Button>
          <div className="text-center text-sm">
            {t('register.hasAccount')} <Link to="/login">{t('register.signIn')}</Link>
          </div>
        </form>
      </Card>
    </div>
  )
}
