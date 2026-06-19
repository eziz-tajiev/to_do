import { api } from '@/shared/api'

type CreateTodoRequest = {
  title: string
  description: string
  completed: boolean
}

export type Todo = {
  id: number
  title: string
  description: string
  completed: boolean
  created_at: string
}

type GetTodosParams = {
  limit?: number
  offset?: number
  ordering?: string
  search?: string
}

type GetTodosResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Todo[]
}

export const todosApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<GetTodosResponse, GetTodosParams | undefined>({
      query: (params = {}) => ({
        url: '/todos/',
        params,
      }),
      providesTags: ['Todos'] as const,
    }),
    createTodo: builder.mutation<Todo, CreateTodoRequest>({
      query: (body) => ({
        url: '/todos/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Todos'] as const,
    }),
    updateTodo: builder.mutation<Todo, { id: number; title?: string; completed?: boolean }>({
      query: ({ id, ...body }) => ({
        url: `/todos/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Todos'] as const,
    }),
    deleteTodo: builder.mutation<void, number>({
      query: (id) => ({
        url: `/todos/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos'] as const,
    }),
  }),
})

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi
