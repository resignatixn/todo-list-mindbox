import React from 'react'
import { useDispatch } from 'react-redux'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

import { toggleTodo, removeTodo } from '@/store/todoSlice'

import { Todo } from '@/types'

interface TodoItemProps {
  todo: Todo
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch()

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id))
  }

  const handleRemove = () => {
    dispatch(removeTodo(todo.id))
  }

  return (
    <div className="flex justify-between items-center p-2 border-b">
      <div className="">
        <Checkbox
          id={`${todo.id}`}
          checked={todo.completed}
          onCheckedChange={handleToggle}
        />
        <Label
          htmlFor={`${todo.id}`}
          className={`ml-2 ${todo.completed ? 'line-through' : ''}`}
        >
          {todo.text}
        </Label>
      </div>
      <Button variant={'destructive'} onClick={handleRemove}>
        Remove
      </Button>
    </div>
  )
}

export default TodoItem
