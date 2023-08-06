'use client'

import { CreateTodo } from '@/components/CreateTodo'
import TaskCard from '@/components/TaskCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import { useTodosStore } from '@/hooks/useTodoStore'
import { useUserStore } from '@/hooks/useUser'
import { auth, emailVerification, updateTodoFirebase } from '@/lib/firebase'
import { onValue } from 'firebase/database'
import { useRouter } from 'next/navigation'
import { FC, useMemo } from 'react'
import {
    DragDropContext,
    Droppable,

} from "react-beautiful-dnd"

interface pageProps { }

const page: FC<pageProps> = ({ }) => {
    const todos = useTodosStore(state => state.todos)
    const columns = useMemo(() => ({
        "not-started": {
            name: "Not Started",
            items: todos.filter(todo => todo.status === "not-started")
        },
        "in-progress": {
            name: "In Progress",
            items: todos.filter(todo => todo.status === "in-progress")
        },
        "completed": {
            name: "Completed",
            items: todos.filter(todo => todo.status === "completed")
        }

    }), [todos])
    const user = useUserStore(state => state.user)
    const router = useRouter()
    if (!user) {
        router.push("/login")
    }

    const handleVerification = async () => {
        try {
            await emailVerification()
            toast({
                title: "Success",
                description: `Verification email sent to  ${user?.email}}`,
            })
            return
        } catch (error: any) {
            toast({
                title: "Error",
                description: error,
                variant: "destructive"
            })
            return
        }
    }
    const onDragEnd = async (result: any) => {
        try {

            await updateTodoFirebase(result.destination.droppableId, result.draggableId)
            
        } catch (error: any) {
            toast({
                title: "Error",
                description: error,
                variant: "destructive"
            })

        }

    }
    if (!user) return null
    if (!user.emailVerified) return (
        <div className='h-[95vh] flex flex-col items-center justify-center gap-3'>
            <h2 className='text-red-500 text-2xl font-bold text-center'> Please verify your email </h2>
            <Button onClick={handleVerification}>
                Send Code
            </Button>

        </div>
    )

    return <div className='flex justify-center items-center flex-col container gap-2'>
        <div className='w-full'><CreateTodo /></div>

        <DragDropContext
            onDragEnd={onDragEnd}
        >  <div className='flex justify-center gap-2 w-full'>
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <Droppable key={columnId} droppableId={columnId}>
                            {(provided, snapshot) => (
                                <Card className='grow w-full'

                                >
                                    <CardHeader>
                                        <CardTitle>
                                            {column.name}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent ref={provided.innerRef}
                                        {...provided.droppableProps}>

                                    </CardContent>
                                    {column.items.map((item, index) => (
                                        <TaskCard key={item.title} item={item} index={index}

                                        />

                                    ))}

                                    {provided.placeholder}
                                </Card>
                            )}
                        </Droppable>
                    );
                })}                        </div>

        </DragDropContext>
    </div>
}

export default page
