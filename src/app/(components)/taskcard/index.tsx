// TaskCard.tsx
import { Task } from '@/utils/types'
import { useSortable } from '@dnd-kit/sortable'
import { DeleteIcon } from 'lucide-react'
import { CSS } from '@dnd-kit/utilities'
import React, { useState } from 'react'

type Props = {
  task: Task
  deleteTask: (id: string | number, obj?: Record<string, boolean> | null, colid?: string) => void
  updateTask: (id: string, content: string) => void
}

const TaskCard = ({ task, deleteTask }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: "task", task }
  })

  const style = { transform: CSS.Transform.toString(transform), transition }

  if (isDragging) return <div ref={setNodeRef} style={style} className="bg-gray-200 p-2.5 h-[100px] flex items-center border-2 border-gray-300 rounded-lg opacity-50">dragging...</div>

  return (
    <div
     onClick={() => deleteTask(task.id, task.obj, String(task.columnId))}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      className='bg-gray-200 p-2.5 h-[100px] flex items-center rounded-lg relative'
    >
      <p className='flex-1 overflow-auto'>{task.content}</p>

        <button
          onClick={() => deleteTask(task.id, task.obj, String(task.columnId))}
          className='absolute right-2 top-1/2 -translate-y-1/2 p-5 bg-gray-400'
        >
          <DeleteIcon />
        </button>

    </div>
  )
}

export default TaskCard
