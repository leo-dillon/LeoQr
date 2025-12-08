  "use client"

import Link from "next/link"
import { Logo } from "../Logo/Logo"
import { useEffect, useState } from "react"
import UserIcon from "../icons/User"
import { usePathname } from "next/navigation"
import HomeIcon from "../icons/Home"
import UserLoginIcon from "../icons/UserLoginIcon"
import { useUser } from "@/context/userContex"
import { useLogout, useSession } from "@/hook/useAuth"
import { useToast } from "@/context/modalContext"
import { useRouter } from "next/navigation"
import LogoutIcon from "../icons/Logout"

export const Header = () => {

  const [ path, setPath ] = useState<string>( usePathname() )
  const { userData, saveUserData } = useUser()
  const { loading, sessionUser } = useSession()
  const { loading: loadingLogout, logoutUser } = useLogout()
  const { newToast } = useToast()
  const router = useRouter()


  const changePath = ( text: string ) => {
    setPath( text )
  }

  const logout = async () => {
    const { success } = await logoutUser()
    if( success ){
      newToast('success', "Sesión cerrada. Vuelva pronto")
      saveUserData(null)
      router.push('/')      
      return
    }
    newToast('error', "Error al cerrar sesión. \n Intentelo denuevo más tarde")
  }

  useEffect(() => {
    const session = async () => {
      const { success, data } = await sessionUser()
      if( success ){
        saveUserData(data)
      }
    }
    session()
  }, [])

  return (
    <header className="
      py-4 px-4
      flex flex-row justify-between items-center
      bg-zinc-900
      z-10
    ">
      <Logo />
      <div className="flex flex-row gap-2" >
        <Link href={'/'} className={`opacity-70 hover:opacity-100 hover:scale-110 duration-100 `} onClick={ () => changePath('') } title="Ir al Home" >
          <HomeIcon />
        </Link>
        {
          loading 
            ? <p className="aparecer-2">Cargando ... </p>
            : userData 
              ? <>
                <Link 
                  href={'/user'} 
                  className={`opacity-70 hover:opacity-100 hover:scale-110 duration-100  ${ path == "/user" && "hidden"}`} 
                  onClick={ () => changePath('/user') } 
                  title="Ir a tu perfil"
                >
                  <UserLoginIcon />
                </Link>
                <button 
                  className={`opacity-70 hover:opacity-100 hover:scale-110 duration-100 cursor-pointer disabled:animate-bounce`} 
                  onClick={ () => logout() } 
                  disabled={ loadingLogout }
                  title="Cerrar sesión"
                >
                  <LogoutIcon />
                </button>
              </>
              : <Link href={'/login'} className={`opacity-70 hover:opacity-100 hover:scale-110 duration-100  ${ path == "/login" && "hidden"}`} onClick={ () => changePath('/login') } title="Ir al login">
                  <UserIcon />
                </Link>
        }
      </div>
    </header>
  )
}