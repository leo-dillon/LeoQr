  "use client"

import Link from "next/link"
import { Logo } from "../Logo/Logo"
import { useRef, useState } from "react"
import UserIcon from "../icons/User"
import { useParams, usePathname } from "next/navigation"
import HomeIcon from "../icons/Home"

export const Header = () => {

  const [ path, setPath ] = useState<string>( usePathname() )

  const changePath = ( text: string ) => {
    setPath( text )
  }

  

  return (
    <header className="
      py-4 px-4
      flex flex-row justify-between items-center
    ">
      <Logo />
      <div className="flex flex-row gap-2" >
        <Link href={'/'} className={`opacity-70 hover:opacity-100 hover:scale-110 duration-100 `} onClick={ () => changePath('') } title="Ir al Home" >
          <HomeIcon />
        </Link>
        <Link href={'/login'} className={`opacity-70 hover:opacity-100 hover:scale-110 duration-100  ${ path == "/login" && "hidden"}`} onClick={ () => changePath('/login') } title="Ir al login">
          <UserIcon />
        </Link>
      </div>
    </header>
  )
}