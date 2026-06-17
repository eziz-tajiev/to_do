import { Routes, Route } from 'react-router-dom'
import TodoPage from './pages/todo/ui'

function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoPage />} />
    </Routes>
  )
}

export default App
