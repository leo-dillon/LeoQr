"use client"

import Link from "next/link";

export default function login () {
  const submit= (e: React.FormEvent) => {
    e.preventDefault()
    console.log('S');
    
  }
  return (
    <section className="
      w-full max-w-[1400px] mx-auto flex flex-col
    ">
      <div className="grow max-w-[600px] bg-zinc-900/60 flex flex-col px-12 py-6">
        <div className="space-y-2 mb-6">
          <h2 className="text-3xl text-stone-300 font-bold opacity-70 underline"> Iniciar sesión </h2>
          <small className="text-lg text-stone-500 opacity-70"> Inicia sesión para ver las estadisticas de tus QR. </small>
        </div>
        <div className="flex sm:flex-col gap-3">
          <div className="w-full">
            <form onSubmit={ (e) => submit(e) } method="post" 
              className="w-full flex flex-col gap-3"
            >
              {/*  Editar User  */}
              <div className="w-full flex flex-col gap-1 group">
                <label htmlFor="width" className="text-lg text-stone-400"> Usuario </label>
                <input className="w-full px-2 py-2 bg-zinc-800 rounded-xl" name="width" id="width" type="text"/>
              </div>
              {/*  Editar Password  */}
              <div className="w-full flex flex-col gap-1 group">
                <label htmlFor="heigth" className="text-lg text-stone-400"> Contraseña </label>
                <input className="w-full px-2 py-2 bg-zinc-800 rounded-xl" name="heigth" id="heigth" type="text"/>
              </div>
              <button type="submit" className="w-full mt-2 py-2 bg-blue-800 rounded-md cursor-pointer text-xl group hover:rounded-xl duration-100">
                Iniciar sesión
              </button>
            </form>
            <Link href={"/register"} className="inline-block mt-2 text-stone-500 text-lg"> ¿No estás registrado? </Link>
          </div>
        </div>
      </div>
      <picture></picture>
    </section>
  )
}

