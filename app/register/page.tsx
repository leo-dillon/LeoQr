"use client"

import EyeIcon from "@/components/icons/Eye";
import EyeCloseIcon from "@/components/icons/EyeClose";
import { useToast } from "@/context/modalContext";
import { useRegister } from "@/hook/useAuth";
import { registerUserType } from "@/types/userTypes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Register () {
  const [ errorFrom, setErrorForm ] = useState<registerUserType | null>(null)
  const [ see, setSee ] = useState<boolean>(true)
  const [ see2, setSee2 ] = useState<boolean>(true)
  
  const { loading, registerUser } = useRegister()
  const { newToast } = useToast()
  const router = useRouter()

  const seePassword = () => {
    setSee((prev) => !prev) 
  } 
  const seePassword2 = () => {
    setSee2((prev) => !prev) 
  }

  const submit= async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const user = formData.get('name') as string | null
    const email = formData.get('email') as string | null
    const formPassword = formData.get('password') as string | null
    const formPassword2 = formData.get('password2') as string | null

    if(email == null || user == null || formPassword == null || formPassword2 == null ){
      setErrorForm({
        email:    "Debe instroducir un email",
        name:     "Debe introducir su usuario",
        password: "DeBe introducir una contraseña",
        password2:"Debe validar su contraseña"
      })  
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
    const errorEmail = () => {
      if(email.length < 3){
        return "El Email debe tener más de 3 caracteres"
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
      if(formPassword != formPassword2){
        return "Las contraseñas no coinciden"
      }
      return null
    }
    const errorPassword2 = () => {
      if(formPassword2.length < 3){
        return "La contraseña debe tener más de 3 caracteres"
      }
      if(formPassword2.length > 30){
        return "La contraseña debe tener menos de 30 caracteres"
      }
      if(formPassword != formPassword2){
        return "Las contraseñas no coinciden"
      }
      return null
    }
    const errors: registerUserType = {
      email: errorEmail(),
      name: errorUser(),
      password: errorPassword(),
      password2: errorPassword2()
    };
    setErrorForm(errors);
    if (!errors.email && !errors.name && !errors.password && !errors.password2) {
      const dataUser = await registerUser({ email: email, user: user, password: formPassword })
      if (dataUser.success) {
        newToast("success", "Registrado con éxito")
        localStorage.setItem('register_email', dataUser.data || "")
        router.push('/login')
      } else {
        newToast("error", "Este email ya está en uso")
      }
      
    } else {
      newToast("error", "Error en los datos ingresados")
    }
  }
  return (
    <section className="
      w-full max-w-[1400px] mx-auto flex flex-col
    ">
      <div className="aparecer-5 grow max-w-[90%] mx-auto sm:max-w-[600px] bg-zinc-950 duration-200 flex flex-col px-4 sm:px-12 py-6 rounded-2xl group 
        shadow-[0px_0px_300px_40px] hover:shadow-[0px_0px_300px_20px] shadow-indigo-300/20 border border-stone-700
      ">
        <div className="space-y-2 mb-6">
          <h2 className="text-3xl text-center text-stone-100 font-bold opacity-90 group-hover:opacity-100 duration-200"> Registrate </h2>
          <small className="inline-block text-lg text-center text-balance text-stone-300 opacity-70"> Registrate para ver las estadísticas de tus QR. </small>
        </div>
        <div className="flex sm:flex-col gap-3">
          <div className="w-full">
            <form onSubmit={ (e) => submit(e) } method="post" 
              className="w-full flex flex-col gap-3"
            >
              {/*  Editar Email  */}
              <div className="w-full flex flex-col group/input">
                <label htmlFor="email" className="text-lg text-stone-400  group-hover/input:-translate-y-0.5 group-focus-within/input:text-stone-200 duration-200"> Email </label>
                <input className="w-full px-2 py-1 bg-stone-300 rounded-md text-stone-800" name="email" id="email" type="email" required placeholder="ejemplo@gmail.com"/>
                <small className="text-red-400 text-sm">{ errorFrom?.email}</small>
              </div>
              {/*  Editar User  */}
              <div className="w-full flex flex-col group/input">
                <label htmlFor="name" className="text-lg text-stone-400 group-hover/input:-translate-y-0.5 group-focus-within/input:text-stone-200 duration-200"> Usuario </label>
                <input className="w-full px-2 py-1 bg-stone-300 rounded-md text-stone-800" name="name" id="name" type="text" required placeholder="ejemplo Dillon"/>
                <small className="text-red-400 text-sm">{ errorFrom?.name }</small>
              </div>
              {/*  Editar Password  */}
              <div className="w-full flex flex-col group/input">
                <label htmlFor="password" className="text-lg text-stone-400 group-hover/input:-translate-y-0.5 group-focus-within/input:text-stone-200 duration-200"> Contraseña </label>
                <div className="relative">
                  <input className="w-full px-2 py-1 bg-stone-300 rounded-md text-stone-800" name="password" id="password" type={see ? "password" : "text"} required/>
                  {
                    see
                      ? <EyeIcon className="absolute right-2 top-1 text-stone-950 cursor-pointer hover:scale-115 duration-150" onClick={seePassword}/>
                      : <EyeCloseIcon className="absolute right-2 top-1 text-stone-950 cursor-pointer hover:scale-115 duration-150" onClick={seePassword}/>
                  }
                </div>
                <small className="text-red-400 text-sm">{ errorFrom?.password }</small>
              </div>
              {/*  Editar Password 2  */}
              <div className="w-full flex flex-col group/input">
                <label htmlFor="password2" className="text-lg text-stone-400 group-hover/input:-translate-y-0.5 group-focus-within/input:text-stone-200 duration-200"> Repite la contraseña </label>
                <div className="relative">
                  <input className="w-full px-2 py-1 bg-stone-300 rounded-md text-stone-800" name="password2" id="password2" type={see2 ? "password" : "text"} required/>
                  {
                    see2
                      ? <EyeIcon className="absolute right-2 top-1 text-stone-950 cursor-pointer hover:scale-115 duration-150" onClick={seePassword2}/>
                      : <EyeCloseIcon className="absolute right-2 top-1 text-stone-950 cursor-pointer hover:scale-115 duration-150" onClick={seePassword2}/>
                  }
                </div>
                <small className="text-red-400 text-sm">{ errorFrom?.password2 }</small>
              </div>
              <button 
                type="submit" 
                className="w-full mt-2 py-2 bg-indigo-500/50 rounded-md cursor-pointer text-xl group hover:rounded-xl duration-100 disabled:opacity-25 disabled:cursor-progress"
                disabled={ loading }
              >
                { loading ? "Enviando los datos" : "Inicia sesión" }
              </button>
            </form>
            <Link href={"/login"} className="inline-block mt-2 text-stone-400 text-lg hover:text-stone-200 duration-200"> ¿Ya tienes un usuario? </Link>
          </div>
        </div>
      </div>
      <picture></picture>
    </section>
  )
}

