import { supa_login, supa_logout, supa_register, supa_session } from "@/lib/auth/auth"
import { responsesType } from "@/types/responseType"
import { registerType, userPublicData } from "@/types/userTypes"
import { useState } from "react"

export const useRegister = () => {
    const [ loading, setLoading ] = useState<boolean>(false)

    const registerUser = async ({ email, user, password }: registerType) => {
        setLoading( true )
        try {
            const { success, data, error } = await supa_register({ email, user, password })
            if( success ) {
                return {
                    success: true,
                    data: data,
                    error: null
                }
            } else {
                return {
                    success: false,
                    data: null,
                    error: error
                }
            }
        } catch (error: unknown) {
            if( error instanceof Error ){
                return {
                    success: false,
                    data: null,
                    error: error.message
                }
            }
            return {
                    success: false,
                    data: null,
                    error: "Error desconocido"
                }
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }
    }

    return { loading, registerUser }
}

export const useLogin = () => {
    const [ loading, setLoading ] = useState<boolean>(false) 

    const loginUser = async (email: string, password: string ) => {
        setLoading( true )
        try {
            const { success, data, error }: responsesType<userPublicData> = await supa_login({email, password})
            if( success ) {
                return {
                    success: true as const,
                    data: data,
                    error: null
                }
            }
            return {
                success: false as const,
                data: null,
                error: error
            }
        } catch (error) {
            if( error instanceof Error ){
                return {
                    success: false as const,
                    data: null,
                    error: error.message
                }
            }
            return {
                success: false as const,
                data: null,
                error: "Error desconocido"
            }
        } finally {
            setLoading( false )
        }
    }

    return { loading, loginUser }
}

export const useSession = () => {
    const [ loading, setLoading ] = useState<boolean>(false)
    const sessionUser = async () => {
        setLoading(true)
        try {
            const { success, data, error }:responsesType<userPublicData> = await supa_session()
            if( success ){
                return {
                    success: true as const,
                    data: data,
                    error: null
                }
            }   
            return {
                success: false as const,
                data: null,
                error: error
            }

        } catch (error) {
            if( error instanceof Error ){
                return {
                    success: false as const,
                    data: null,
                    error: error.message
                }
            }
            return {
                success: false as const,
                data: null,
                error: "Error inesperado"
            }
            
        } finally {
            setLoading(false)
        }
    }
    return { loading, sessionUser }
}

export const useLogout = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const logoutUser = async () => {
        setLoading(true)
        try {
            const { success, data, error } = await supa_logout()
            if( success ){
                return {
                    success: true,
                    data: data,
                    error: null
                }
            }
            return {
                success: false,
                data: null,
                error: error
            }
        } catch (error) {
            if( error instanceof Error ){
                return {
                    success: false,
                    data: null,
                    error: error.message
                }
            }
            return {
                    success: false,
                    data: null,
                    error: "Error desconocido"
                }
        } finally {
            setLoading(false)
        }
    }

    return { loading, logoutUser }
}