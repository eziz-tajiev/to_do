import { Switch } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '@/shared/store/themeSlice'
import type { RootState } from '@/shared/store'

export const ThemeToggle = () => {
  const dispatch = useDispatch()
  const isDark = useSelector((state: RootState) => state.theme.isDark)

  return (
    <Switch
      checked={isDark}
      onChange={(checked) => dispatch(toggleTheme(checked))}
      checkedChildren={<MoonOutlined />}
      unCheckedChildren={<SunOutlined />}
    />
  )
}
