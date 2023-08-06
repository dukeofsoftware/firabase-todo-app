import { FC } from 'react'
import { Draggable } from 'react-beautiful-dnd';

interface TaskCardProps {
    item: {
        title: string
        id: string

    }
    index: number
}

const TaskCard: FC<TaskCardProps> = ({ item, index }) => {
    return <>
        <Draggable key={item.title} draggableId={item.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className='flex flex-col justify-center items-start px-4 min-h-[106px] rounded-md  border-2 border-slate-700'>
                        <p>{item.title}</p>

                    </div>
                </div>
            )}
        </Draggable>
    </>
}

export default TaskCard