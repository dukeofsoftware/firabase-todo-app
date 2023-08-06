'use client'

import { FC, useEffect } from 'react'
import { buttonVariants } from "@/components/ui/button"

import { useUserStore } from '@/hooks/useUser';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
interface pageProps { }

const Page: FC<pageProps> = ({ }) => {
  const router = useRouter()
  const user = useUserStore(state => state.user)

  useEffect(() => {
    if (user) router.push("/dashboard")
  }, [user])


  return <div className='flex flex-col gap-3 justify-center items-center h-[95vh]'>
    <h1 className='text-sky-500 text-4xl text-center font-bold'>
      TODO-APP
    </h1>
    <div className="flex gap-2 justify-center">
      <Link href={"/login"} className={cn(buttonVariants())}>
        Login
      </Link>
      <Link href={"/register"} className={cn(buttonVariants({ variant: "ghost" }))}>
        Sign Up
      </Link>
    </div>
  </div>
}

export default Page