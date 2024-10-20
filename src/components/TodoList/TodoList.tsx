import React from 'react'
import { useSelector } from 'react-redux'

import TodoItem from '@/components/TodoItem'
import TodoForm from '@/components/TodoForm'
import TodoFilter from '@/components/TodoFilter'
import TodoCount from '@/components/TodoCount'

import { RootState } from '@/store/store'

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todo.todos)
  const filter = useSelector((state: RootState) => state.todo.filter)

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <>
      <TodoForm />
      <ul>
        {filteredTodos.length === 0 ? (
          <p>No tasks</p>
        ) : (
          filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </ul>
      <div className="mt-4">
        <TodoFilter />
      </div>
      <TodoCount />
    </>
  )
}

export default TodoList
