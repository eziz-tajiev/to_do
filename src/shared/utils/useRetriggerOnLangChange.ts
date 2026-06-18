import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { FieldValues, UseFormTrigger } from 'react-hook-form'

export const useRetriggerOnLangChange = <T extends FieldValues>(
  trigger: UseFormTrigger<T>,
  errors: Partial<Record<string, unknown>>,
) => {
  const { t } = useTranslation()

  useEffect(() => {
    if (Object.keys(errors).length > 0) trigger()
  }, [t, trigger, errors])
}
