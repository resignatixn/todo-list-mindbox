import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TodoItem from '@/components/TodoItem/TodoItem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { RootState } from '@/store/store'
import { addTodo, setFilter, clearCompleted } from '@/store/todoSlice'

import { Filter, Todo } from '@/types'

const TodoList: React.FC = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.todo.todos)
  const filter = useSelector((state: RootState) => state.todo.filter)
  const [newTodo, setNewTodo] = useState('')

  const filterTypes: Filter[] = ['all', 'active', 'completed']

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo))
      setNewTodo('')
    }
  }

  const handleSetFilter = useCallback(
    (filter: Filter) => {
      dispatch(setFilter(filter))
    },
    [dispatch]
  )

  const handleClearCompleted = useCallback(() => {
    dispatch(clearCompleted())
  }, [dispatch])

  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const remainingTodosCount = todos.filter((todo) => !todo.completed).length

  return (
    <div>
      <form onSubmit={handleAddTodo} className="flex mb-4">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
        />
        <Button type="submit">Add</Button>
      </form>
      <div>
        {filteredTodos.length === 0 ? (
          <p>No tasks</p>
        ) : (
          filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex gap-1">
          {filterTypes.map((filterType) => (
            <Button
              key={filterType}
              onClick={() => handleSetFilter(filterType)}
              variant={filter === filterType ? 'outline' : 'default'}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Button>
          ))}
        </div>
        <Button onClick={handleClearCompleted}>Clear Completed</Button>
      </div>
      {remainingTodosCount > 0 && (
        <p className="mt-4">
          {remainingTodosCount} {remainingTodosCount === 1 ? 'task' : 'tasks'}{' '}
          left
        </p>
      )}
    </div>
  )
}

export default TodoList
