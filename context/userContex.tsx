"use client"
import { supabase } from "@/lib/supabase"
import { userPublicData } from "@/types/userTypes"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type userContextType = {
    saveUserData: (data: userPublicData | null) => void
    userData: userPublicData | null
}

const userContext = createContext<userContextType | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [ userData, setUserData ] = useState<userPublicData | null>(null)

  const saveUserData = (data: userPublicData | null) => {
    if(data){
      sessionStorage.setItem('user', JSON.stringify(data))
      setUserData(data)
    }else {
      sessionStorage.removeItem('user')
      setUserData(null)
    }
  }

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        const data: userPublicData = {
          user: session.user.user_metadata.user,
          email: session.user.email,
          JWT: session.access_token
        }
        saveUserData(data)
      } else {
        saveUserData(null)
      }
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  return (
      <userContext.Provider value={{ saveUserData, userData }}>
          { children }
      </userContext.Provider>
  )
}

export const useUser = () => {
    const U = useContext(userContext)
    if(!U){
        throw new Error("Error al crear useUser")
    }
    return U
}