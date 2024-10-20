import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '@/components/ui/button'

import { setFilter, clearCompleted } from '@/store/slices/todoSlice'
import { RootState } from '@/store/store'

import { Filter } from '@/types'

const TodoFilter: React.FC = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state: RootState) => state.todo.filter)
  const filterTypes: Filter[] = ['all', 'active', 'completed']

  const handleSetFilter = useCallback(
    (filter: Filter) => {
      dispatch(setFilter(filter))
    },
    [dispatch]
  )

  const handleClearCompleted = useCallback(() => {
    dispatch(clearCompleted())
  }, [dispatch])

  return (
    <div className="flex gap-1 justify-between w-full">
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
      <div>
        <Button onClick={handleClearCompleted}>Clear Completed</Button>
      </div>
    </div>
  )
}

export default TodoFilter
