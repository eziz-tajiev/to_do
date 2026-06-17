import { Routes, Route } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import { useSelector } from 'react-redux'
import type { RootState } from './shared/store'
import { TodoPage } from '@/pages/todo'
import { LoginPage } from '@/pages/login'

function App() {
  const isDark = useSelector((state: RootState) => state.theme.isDark)

  return (
    <ConfigProvider theme={{ algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </ConfigProvider>
  )
}

export default App
