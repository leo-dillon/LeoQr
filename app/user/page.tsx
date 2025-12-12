'use client'
import { Qr } from "@/components/qr/Qr"
import { useUser } from "@/context/userContex"
import { useRouter } from "next/navigation"
import { useState } from "react"

type userSection = 'home' | 'myQr' | 'createQR'

export default function User(){
  const { userData } = useUser() 
  const [ sectionActive, setSectionActive ] = useState<userSection>('home')
  const router = useRouter()
  const changeSection = (text: userSection, id: string = "") => {
    const idQuery = ( id.length > 0) ? id : ""
    setSectionActive(text)
    router.push(`/user${idQuery}?section=${text}`)
  }

  return (
      <div className="w-full flex flex-col gap-4">
        <section className="w-full box-border pt-12 max-w-9/10 mx-auto flex flex-col items-center">
          <div className="w-full flex justify-center relative">
            <h3 className="aparecer-1 text-center my-16 uppercase lg:text-start text-4xl md:text-8xl text-balance font-bold text-stone-300">
              { userData?.user }
            </h3>
            <span className="aparecer-1 my-16 absolute uppercase text-center lg:text-start text-4xl md:text-8xl text-balance font-bold blur-2xl text-indigo-300 animate-pulse">
              { userData?.user }
            </span>
          </div>
          <h2 className="text-6xl font-bold text-stone-400"> 
            Bienvenido usuario 
          </h2>
          <small className="aparecer-4 inline-block mt-2 text-stone-500 text-lg"> 
            Dentro de está sección podrás encontrar todos tus QRs y sus estadisticas
          </small>
          <div className="w-full mt-18 flex flex-col gap-2">
            <div className="flex gap-2 justify-start">
              <button 
                onClick={ () => changeSection('home')}
                className="w-fit mt-2 py-2 px-3 bg-indigo-900 rounded-md cursor-pointer text-md hover:rounded-xl duration-100"
              > 
                Tus Qrs 
              </button>
              <button 
                onClick={ () => changeSection('createQR', "#QR")}
                className="w-fit mt-2 py-2 px-3 bg-indigo-900 rounded-md cursor-pointer text-md hover:rounded-xl duration-100"
              > 
                Crea tu QR 
              </button>
            </div>
            <div className={`aparecer-2 w-full px-4 py-6 border border-indigo-900 rounded-2xl ${(sectionActive)=="home" ? "block" : "hidden"}`}>
              <p>Tus QR</p>
            </div>
            <div className={`aparecer-2 w-full py-2 px-4 pb-6 border border-indigo-900 rounded-2xl ${(sectionActive)=="createQR" ? "block" : "hidden"}`}>
              <p className="aparecer-4 inline-block mt-2 text-stone-500 text-lg"> 
                Crea tu proximo QR              
              </p>
              <Qr login={true}  />
            </div>
          </div>
        </section>
      </div>
    
  )
}

