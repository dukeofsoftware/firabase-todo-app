'use client'

import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { todoSchema, todoType } from '@/lib/validators/TodoSchema';
import { createTodoFirebase } from '@/lib/firebase';
import { toast } from './ui/use-toast';

export function CreateTodo() {
    const form = useForm<todoType>({
        resolver: valibotResolver(todoSchema),
        defaultValues: {
            status: "not-started"
        }
    })


    const onSubmit = async (data: todoType) => {
        try {
            const createdTodo = await createTodoFirebase(data.title, data.status)
            if (createdTodo) {
                toast({
                    title: "Todo created successfully",

                })
            }

            form.reset()
            return
        } catch (error: any) {
            toast({
                title: "Error",
                description: error,
                variant: "destructive"
            })
            throw new Error("CreateTodo.tsx" + error)
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create Todo</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Todo</DialogTitle>
                    <DialogDescription>
                        Create a new todo by filling out the form below.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form id='create-todo' onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="wash the dishes" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter a title for your todo.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Status for your todo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="not-started">Not Started</SelectItem>
                                                <SelectItem value="on-going">On Going</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <Button type="submit" form="create-todo">Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
