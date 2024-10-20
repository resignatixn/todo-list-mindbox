import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Filter, Todo } from '@/types'

interface TodosState {
  todos: Todo[]
  filter: Filter
}

const initialState: TodosState = {
  todos: [],
  filter: 'all',
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      }
      state.todos.push(newTodo)
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed)
    },
  },
})

export const { addTodo, toggleTodo, removeTodo, setFilter, clearCompleted } =
  todosSlice.actions
export default todosSlice.reducer
