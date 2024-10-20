import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/store/store'

const TodoCount: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todo.todos)
  const remainingTodosCount = todos.filter((todo) => !todo.completed).length

  return (
    <>
      {remainingTodosCount > 0 && (
        <p className="mt-4">
          {remainingTodosCount} {remainingTodosCount === 1 ? 'task' : 'tasks'}{' '}
          left
        </p>
      )}
    </>
  )
}

export default TodoCount
