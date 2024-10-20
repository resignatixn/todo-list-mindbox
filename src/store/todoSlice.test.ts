import todosReducer, {
  addTodo,
  toggleTodo,
  removeTodo,
  setFilter,
  clearCompleted,
} from './todoSlice'

import { Filter } from '@/types'

describe('todosSlice', () => {
  const initialState = {
    todos: [],
    filter: 'all' as Filter,
  }

  it('should return the initial state', () => {
    expect(todosReducer(undefined, { type: '' })).toEqual(initialState)
  })

  it('should handle addTodo', () => {
    const newTodoText = 'Learn Redux Toolkit'
    const action = addTodo(newTodoText)
    const state = todosReducer(initialState, action)

    expect(state.todos).toHaveLength(1)
    expect(state.todos[0].text).toEqual(newTodoText)
    expect(state.todos[0].completed).toBe(false)
  })

  it('should handle toggleTodo', () => {
    const initialStateWithTodos = {
      todos: [{ id: 1, text: 'Learn Redux Toolkit', completed: false }],
      filter: 'all' as Filter,
    }
    const action = toggleTodo(1)
    const state = todosReducer(initialStateWithTodos, action)

    expect(state.todos[0].completed).toBe(true)
  })

  it('should handle removeTodo', () => {
    const initialStateWithTodos = {
      todos: [{ id: 1, text: 'Learn Redux Toolkit', completed: false }],
      filter: 'all' as Filter,
    }
    const action = removeTodo(1)
    const state = todosReducer(initialStateWithTodos, action)

    expect(state.todos).toHaveLength(0)
  })

  it('should handle setFilter', () => {
    const action = setFilter('completed' as Filter)
    const state = todosReducer(initialState, action)

    expect(state.filter).toEqual('completed')
  })

  it('should handle clearCompleted', () => {
    const initialStateWithTodos = {
      todos: [
        { id: 1, text: 'Learn Redux Toolkit', completed: false },
        { id: 2, text: 'Write tests', completed: true },
      ],
      filter: 'all' as Filter,
    }
    const action = clearCompleted()
    const state = todosReducer(initialStateWithTodos, action)

    expect(state.todos).toHaveLength(1)
    expect(state.todos[0].text).toEqual('Learn Redux Toolkit')
  })
})
