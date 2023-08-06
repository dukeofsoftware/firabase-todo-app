'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { FC } from 'react'
import { Button, buttonVariants } from './ui/button'
import { logOutUser } from '@/lib/firebase'
import { toast } from './ui/use-toast'
import { useUserStore } from '@/hooks/useUser'
import { useRouter } from 'next/navigation'

interface NavbarProps { }

const Navbar: FC<NavbarProps> = ({ }) => {
    const user = useUserStore(state => state.user)
    const router = useRouter()
    const setUser = useUserStore(state => state.setUser)
    const signOut = async () => {
        try {
            await logOutUser()
            setUser(null)
            toast({
                title: "Sucess",
                description: "You are logged out successfully",
            })
            router.push("/login")
        } catch (error: any) {
            toast({
                title: "Error",
                description: error,
                variant: "destructive"
            })
        }
    }


    return <header className='w-full container py-4 flex justify-between '>
        <h1 className='text-sky-500 text-3xl font-bold '>
            TODO-APP
        </h1>
        {user && <nav>
            <Link href={"/dashboard"} className={cn(buttonVariants({
                variant: "link"

            }))}>
                Dashboard
            </Link>
            <Button
                onClick={signOut}
                className={cn(buttonVariants())}>
                Sign Out
            </Button>
        </nav>}
    </header>
}

export default Navbar