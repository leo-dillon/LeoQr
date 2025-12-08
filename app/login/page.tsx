"use client"

import EyeIcon from "@/components/icons/Eye";
import EyeCloseIcon from "@/components/icons/EyeClose";
import { useToast } from "@/context/modalContext";
import { useUser } from "@/context/userContex";
import { useLogin } from "@/hook/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

type userType = {
  name: string | null,
  password: string | null
}

export default function Login () {
  const [ errorFrom, setErrorForm ] = useState<userType | null>(null)
  const [ see, setSee ] = useState<boolean>(true)

  const emailRef = useRef<HTMLInputElement>(null)
  const { loading, loginUser } = useLogin()
  const { newToast } = useToast()
  const { saveUserData } = useUser()
  const router = useRouter()

  const seePassword = () => {
    setSee((prev) => !prev) 
  } 

  useEffect(() => {
    const register_email = localStorage.getItem('register_email')
    if (register_email != null && emailRef.current) {
      emailRef.current.value = register_email
    }
  }, [])

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const user = formData.get('email') as string | null
    const formPassword = formData.get('password') as string | null

    if(user == null || formPassword == null ){
      setErrorForm({
        name: "Debe introducir su usuario",
        password: "Dene introducir una contraseña"
      })  
      newToast('error', "Error al introducir tus datos")
      return
    }
    const errorUser = () => {
      if(user.length < 3){
        return "El usuario debe tener más de 3 caracteres"
      }
      if(user.length > 30){
        return "El usuario debe tener menos de 30 caracteres"
      }
      return null
    }
    const errorPassword = () => {
      if(formPassword.length < 3){
        return "La contraseña debe tener más de 3 caracteres"
      }
      if(formPassword.length > 30){
        return "La contraseña debe tener menos de 30 caracteres"
      }
      return null
    }
    const errors = {
      name: errorUser(),
      password: errorPassword()
    };
    setErrorForm(errors);
    if (!errors.name && !errors.password) {
      const { success, data } = await loginUser( user, formPassword )

      if( success ) {
        newToast('success', "Bienvenido usuario")
        saveUserData(data)
        router.push('/user')
      } else {
        newToast('error', "Error al querer iniciar sesión")
      }
    } else {
      newToast('error', "Error en los datos cargados")
    }
  }
  return (
    <section className="
      w-full max-w-[1400px] mx-auto flex flex-col
    ">
      <div className="aparecer-5 grow max-w-[90%] mx-auto sm:max-w-[600px] bg-zinc-950 flex flex-col px-4 sm:px-12 py-6 rounded-2xl group 
        shadow-[0px_0px_300px_40px] hover:shadow-[0px_0px_300px_20px] shadow-indigo-300/30 duration-200 border border-stone-700
      ">
        <div className="space-y-2 mb-6">
          <h2 className="text-3xl text-center text-stone-100 font-bold opacity-90 group-hover:opacity-100 duration-200"> Inicia sesión </h2>
          <small className="inline-block text-lg text-center text-stone-400 opacity-70"> Inicia sesión para ver las estadísticas de tus QR. </small>
        </div>
        <div className="flex sm:flex-col gap-3">
          <div className="w-full">
            <form onSubmit={ (e) => submit(e) } method="post" 
              className="w-full flex flex-col gap-3"
            >
              {/*  Editar User  */}
              <div className="w-full flex flex-col group/input">
                <label htmlFor="email" className="text-lg text-stone-400 group-hover/input:-translate-y-0.5 group-focus-within/input:text-stone-200 duration-200  "> Email </label>
                <input className="w-full px-2 py-1 bg-stone-300 rounded-md text-stone-800" name="email" id="email"  type="text" ref={emailRef} required placeholder="ejemplo@gmail.com"/>
                <small className="text-red-400 text-sm">{ errorFrom?.name }</small>
              </div>
              {/*  Editar Password  */}
              <div className="w-full flex flex-col group/input">
                <label htmlFor="password" className="text-lg text-stone-400 group-hover/input:-translate-y-0.5 group-focus-within/input:text-stone-200 duration-200 "> Contraseña </label>
                <div className="relative">
                  <input className="w-full px-2 py-1 bg-stone-300 rounded-md text-stone-800" name="password" id="password"  type={see ? "password" : "text"} required />
                  {
                    see
                      ? <EyeIcon className="absolute right-2 top-1 text-stone-950 cursor-pointer hover:scale-115 duration-150" onClick={seePassword}/>
                      : <EyeCloseIcon className="absolute right-2 top-1 text-stone-950 cursor-pointer hover:scale-115 duration-150" onClick={seePassword}/>
                  }
                </div>
                <small className="text-red-400 text-sm">{ errorFrom?.password }</small>
              </div>
              <button type="submit" className="w-full mt-2 py-2 bg-indigo-500/50 rounded-md cursor-pointer text-xl group hover:rounded-xl duration-100 disabled:opacity-25 disabled:cursor-progress"
                disabled={loading ? true : false}
              >
                Inicia sesión
              </button>
            </form>
            <Link href={"/register"} className="inline-block mt-2 text-stone-400 text-lg hover:text-stone-200 duration-200"> ¿No estás registrado? </Link>
          </div>
        </div>
      </div>
      <picture></picture>
    </section>
  )
}

