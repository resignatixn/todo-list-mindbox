import React, { useState } from 'react'
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

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo))
      setNewTodo('')
    }
  }

  const handleSetFilter = (filter: Filter) => dispatch(setFilter(filter))
  const handleClearCompleted = () => dispatch(clearCompleted())

  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <div>
      <form onSubmit={handleAddTodo} className="flex mb-4">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Добавьте новую задачу..."
        />
        <Button type="submit">Add</Button>
      </form>
      <div>
        {filteredTodos.length === 0 ? (
          <p>Нет задач</p>
        ) : (
          filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex gap-1">
          <Button onClick={() => handleSetFilter('all')}>All</Button>
          <Button onClick={() => handleSetFilter('active')}>Active</Button>
          <Button onClick={() => handleSetFilter('completed')}>
            Completed
          </Button>
        </div>
        <Button onClick={handleClearCompleted}>Clear Completed</Button>
      </div>
    </div>
  )
}

export default TodoList
