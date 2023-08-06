import { create } from 'zustand';
import { persist } from 'zustand/middleware'
import { todoType } from '@/lib/validators/TodoSchema';

type storeTodoType = todoType & {
    id: string

}
type useTodoStore = {
    todos: storeTodoType[];
    setTodos: (todo: storeTodoType[]) => void;
}


export const useTodosStore = create<useTodoStore>()(persist(
    /* start */
    (set, get) => ({
        todos: [],
        setTodos: (todos: storeTodoType[]) => set({ todos })
    })
    /* end */
    , { name: "todo-strotage" }));