import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

import { toggleTodo, removeTodo } from '@/store/slices/todoSlice'

import { Todo } from '@/types'

interface TodoItemProps {
  todo: Todo
}

const TodoItem: React.FC<TodoItemProps> = React.memo(({ todo }) => {
  const dispatch = useDispatch()

  const handleToggle = useCallback(() => {
    dispatch(toggleTodo(todo.id))
  }, [dispatch, todo.id])

  const handleRemove = useCallback(() => {
    dispatch(removeTodo(todo.id))
  }, [dispatch, todo.id])

  return (
    <li className="flex justify-between items-center p-2 border-b">
      <Label
        htmlFor={`${todo.id}`}
        className="flex w-full flex-grow cursor-pointer"
      >
        <Checkbox
          id={`${todo.id}`}
          checked={todo.completed}
          onCheckedChange={handleToggle}
        />
        <span
          className={`ml-2 ${
            todo.completed ? 'line-through' : ''
          } whitespace-normal`}
        >
          {todo.text}
        </span>
      </Label>
      <Button variant={'destructive'} onClick={handleRemove}>
        Remove
      </Button>
    </li>
  )
})

export default TodoItem
