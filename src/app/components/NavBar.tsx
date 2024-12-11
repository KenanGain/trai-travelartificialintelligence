import React from 'react'
import { ThemeButton } from './ThemButton'
import { GithubIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function NavBar() {
  return (
    <div className='w-full h-full flex justify-between items-center px-5 pt-2'>
        <div className='text-xl'>TRAI</div>
        <div className='flex gap-2'>
            <div><ThemeButton /></div>
            <div>
                <Link href={"https://github.com/KenanGain"}>
                <Button variant="outline" size="icon"><GithubIcon /></Button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default NavBar