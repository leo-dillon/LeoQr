"use client";

import { useEffect, useRef, useState } from "react"
import Ldillon from "../icons/Ldillon"
import Link from "next/link";

export const Logo = () => {
  const [ open, setOpen ] = useState( false )
  const refDropNav = useRef<HTMLDivElement>(null)

  const toggleOpen = () => {
    setOpen( (prev) => !prev )
  }

  useEffect( () => {

    const haddleClick = (e: MouseEvent) => {
      if( refDropNav.current && !refDropNav.current.contains(e.target as Node) ){
        document.removeEventListener('mousedown', haddleClick )
        setOpen(false)
      }
    }
    
    if( open ){
      document.addEventListener('mousedown', haddleClick)
    }

    return () => document.addEventListener('mousedown', haddleClick )

  }, [open])

  return (
    <div className="relative flex gap-2 cursor-pointer opacity-90 hover:opacity-100 duration-75" onClick={toggleOpen}>
        <Ldillon />
        <h1 className="text-xl" >LDillon / QR</h1>
        <nav id="navLink" className={ `${ open ? "absolute aparecer": "hidden" } 
          bg-slate-950 top-full left-2 flex flex-col gap-2 mt-2 border rounded border-stone-300/30` 
        }
        ref={refDropNav}
        >
          <Link 
            href={'https://portafolio-henna-phi.vercel.app/'} 
            target="_target" 
            className={`text-nowrap aparecer-1 text-center px-3 py-1 underline hover:bg-slate-900/80 duration-100`}
          > 
            Portafolio 
          </Link>
          <Link 
            href={'https://mail.google.com/mail/?view=cm&fs=1&to=jeannotegui@gmail.com&su=Hola%20Leonardo!'} 
            target="_target"
            className={`text-nowrap aparecer-1 text-center px-3 py-1 underline hover:bg-slate-900/80 duration-100`}
          > 
            Contactame
          </Link>
        </nav>
    </div>
  )
}

