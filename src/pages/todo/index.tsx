import { Button, Card, Checkbox, Input, Spin } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import type { Todo } from '@/features/todos/api'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { LanguageSwitcher } from '@/widgets/LanguageSwitcher'
import { ThemeToggle } from '@/widgets/ThemeToggle'
import { LocalStorage } from '@/shared/lib/LocalStorage'
import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from '@/features/todos/api'

export const TodoPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [createTodo, { isLoading }] = useCreateTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo, { isLoading: isDeleting, originalArgs: deletingId }] = useDeleteTodoMutation()
  const { data, isFetching } = useGetTodosQuery({ search: debouncedSearch })

  const handleLogout = () => {
    LocalStorage.delete('accessToken')
    LocalStorage.delete('refreshToken')
    navigate('/login')
  }

  const handleAdd = () => {
    if (!title.trim()) return
    createTodo({ title, description: '', completed: false })
    setTitle('')
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

        <div className="mb-4">
          <Input
            placeholder={t('todo.search')}
            size="large"
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
        </div>

        <div className="mb-6 flex flex-col gap-2 sm:flex-row">
          <Input
            placeholder={t('todo.placeholder')}
            size="large"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onPressEnter={handleAdd}
          />
          <Button
            type="primary"
            size="large"
            className="sm:w-28 sm:shrink-0"
            loading={isLoading}
            onClick={handleAdd}
          >
            {t('todo.add')}
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          {isFetching && (
            <div className="flex justify-center py-4">
              <Spin />
            </div>
          )}
          {!isFetching &&
            data?.results.map((todo) => (
              <Card size="small" key={todo.id}>
                <div className="flex items-center justify-between gap-2">
                  {editingTodo?.id === todo.id ? (
                    <Input
                      size="small"
                      value={editingTodo.title}
                      onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                      onPressEnter={() => {
                        updateTodo({ id: todo.id, title: editingTodo.title })
                        setEditingTodo(null)
                      }}
                      autoFocus
                    />
                  ) : (
                    <Checkbox
                      checked={todo.completed}
                      onChange={(e) => updateTodo({ id: todo.id, completed: e.target.checked })}
                    >
                      <span className={todo.completed ? 'line-through text-gray-400' : ''}>
                        {todo.title}
                      </span>
                    </Checkbox>
                  )}
                  <div className="flex flex-col gap-1 sm:flex-row shrink-0">
                    {editingTodo?.id === todo.id ? (
                      <Button
                        size="small"
                        className="w-24"
                        type="primary"
                        onClick={() => {
                          updateTodo({ id: todo.id, title: editingTodo.title })
                          setEditingTodo(null)
                        }}
                      >
                        {t('todo.save')}
                      </Button>
                    ) : (
                      <Button size="small" className="w-24" onClick={() => setEditingTodo(todo)}>
                        {t('todo.edit')}
                      </Button>
                    )}
                    <Button
                      danger
                      size="small"
                      className="w-24"
                      loading={isDeleting && deletingId === todo.id}
                      onClick={() => deleteTodo(todo.id)}
                    >
                      {t('todo.delete')}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          {!isFetching && data?.results.length === 0 && (
            <p className="text-center text-gray-400">
              {search ? t('todo.notFound') : t('todo.empty')}
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}
