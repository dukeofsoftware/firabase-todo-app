'use client'

import { FC } from 'react'
import {ThemeProvider} from "next-themes"
import { Toaster } from "@/components/ui/toaster"

interface ProvidersProps {
    children: React.ReactNode
}

const Providers: FC<ProvidersProps> = ({children}) => {
  return <>
    <ThemeProvider  enableSystem attribute='class'>
    {children}
    <Toaster />

    </ThemeProvider>
  </>
}

export default Providers