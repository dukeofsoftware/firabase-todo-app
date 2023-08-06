'use client'

import { FC, useEffect } from 'react'
import { AuthType, authSchema } from '@/lib/validators/authSchema'
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
import { Input } from "@/components/ui/input"
import { loginUser, registerUser } from '@/lib/firebase';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/hooks/useUser';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
interface pageProps { }

const Page: FC<pageProps> = ({ }) => {
    const router = useRouter()
    const user = useUserStore(state => state.user)
    const form = useForm<AuthType>({
        resolver: valibotResolver(authSchema),

    })
    useEffect(() => {
        if (user) router.push("/dashboard")
    }, [user])

    const onSubmit = async (data: AuthType) => {
        try {
            
             await loginUser(data.email, data.password)
            toast({
                title: "Success",
                description: "You are logged in successfully",
            })
            router.push("/dashboard")
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
    return <div className='flex justify-center h-[95vh]'>
        <Card>
            <CardHeader>
                <CardTitle>
                    Login
                </CardTitle>

            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mail</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn@gmail.com" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Type your email here
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="*****" type='password' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Type your password here
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
}

export default Page