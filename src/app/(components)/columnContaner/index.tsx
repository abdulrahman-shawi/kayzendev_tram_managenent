'use client'
import { Column, Id, Task } from '@/utils/types'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { Delete } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { CSS } from '@dnd-kit/utilities';
import TaskCard from '../taskcard'
import PlusIcon from '../plusIcon.tsx'


type Props = 
{
    column: Column
    deleteColumn : (id:Id) => void
    updateColumn:(id:Id , title:string) => void
    deleteTask:(id:Id) => void
    createTask:(columnId:Id) => void
    updateTask:(id:Id , content:string) => void
    task: Task[]
}

const ColumnContaner = (props: Props) => {
    const { column , task , updateTask, deleteTask , createTask , deleteColumn , updateColumn } = props
    const [editModel , setEditModel] = useState(false)
    const taskId = useMemo(() => task.map((col) => col.id) , [task])
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: column.id,
        data:{
            type: column.id,  // الاسم الخاص بالعمود
            column
        },
        disabled: editModel
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    if(isDragging){
        return <div
            ref={setNodeRef}
            style={style}
            className='bg-gray-100 w-[350px] h-[570px] max-h-[570px] rounded-2xl opacity-60 border-2 border-gray-600 flex flex-col'>
        </div>
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className='bg-gray-100 w-[350px] h-[570px] max-h-[570px] rounded-2xl flex flex-col'>
            {/* column title */}
            <div
                {...attributes}
                {...listeners}
                onClick={() => setEditModel(true)}
                className="bg-gray-200 text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="flex justify-center items-center text-sm px-2 py-1">{task.length}</div>
                    {!editModel && column.title}
                    {editModel && <input
                        value={column.title}
                        onChange={(e) => updateColumn(column.id , e.target.value)}
                        className='bg-gray-50 border border-gray-200 rounded-lg'
                        autoFocus onBlur={() => {setEditModel(false)}} onKeyDown={e => {
                            if(e.key !=="Enter"){
                                setEditModel(false)
                            }
                        }} />}
                </div>
                <div className="cursor-pointer" onClick={() => deleteColumn(column.id)}><Delete /></div>
            </div>

            {/* column task container */}
            <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
                <SortableContext items={taskId}>
                    {task.map(( t, i) => (
                        <TaskCard updateTask={updateTask} key={`${t.id}-${i}`} task={t} deleteTask={deleteTask} />
                    ))}
                </SortableContext>
            </div>

            {/* footer - Add Task */}
            <div className="flex gap-3 items-center rounded border border-gray-200 hover:bg-gray-300 p-3 cursor-pointer justify-center"
                onClick={() => createTask(column.id)}
            >
                <PlusIcon /> Add Task
            </div>
        </div>
    )
}

export default ColumnContaner
