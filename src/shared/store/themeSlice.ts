import { createSlice } from '@reduxjs/toolkit'
import { LocalStorage } from '@/shared/lib/LocalStorage'

const isDark = LocalStorage.get('theme') === 'dark'
document.documentElement.classList.toggle('dark', isDark)

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDark,
  },
  reducers: {
    toggleTheme(state, action: { payload: boolean }) {
      state.isDark = action.payload
      LocalStorage.set('theme', action.payload ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', action.payload)
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
