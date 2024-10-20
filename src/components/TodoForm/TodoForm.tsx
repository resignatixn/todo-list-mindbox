import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { addTodo } from '@/store/slices/todoSlice'

const TodoForm: React.FC = () => {
  const dispatch = useDispatch()
  const [newTodo, setNewTodo] = useState('')

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo))
      setNewTodo('')
    }
  }

  return (
    <form onSubmit={handleAddTodo} className="flex mb-4">
      <Input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="What needs to be done?"
      />
      <Button type="submit">Add</Button>
    </form>
  )
}

export default TodoForm
