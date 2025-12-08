'use client'
import { useUser } from "@/context/userContex"

export default function User(){
  const { userData } = useUser() 
  return (
      <div className="w-full flex flex-col gap-4">
        <section className="w-full box-border pt-12 max-w-9/10 mx-auto flex flex-col items-center">
          <div className="w-full flex justify-center relative">
            <h3 className="text-center my-16 uppercase lg:text-start text-4xl md:text-8xl text-balance font-bold text-stone-300">
              { userData?.user }
            </h3>
            <span className="aparecer-1 my-16 absolute uppercase text-center lg:text-start text-4xl md:text-8xl text-balance font-bold blur-2xl text-indigo-300 animate-pulse">
              { userData?.user }
            </span>
          </div>
          <h2 className="text-6xl font-bold text-stone-400"> 
            Bienvenido usuario 
          </h2>
          <small className="inline-block mt-2 text-stone-500 text-lg hover:text-stone-200 duration-200"> 
            Dentro de está sección podrás encontrar todos tus QRs y sus estadisticas
          </small>
          <div>

          </div>
        </section>
      </div>
    
  )
}

