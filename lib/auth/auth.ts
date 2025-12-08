import { loginType, registerType } from "@/types/userTypes.js"
import { supabase } from "../supabase"
export const supa_register = async ({ user, email, password }: registerType) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    user: user
                }
            }
        })
        if( error == null ) {
            return {
                success: true,
                data: data.user?.email,
                error: null
            }
        } else {
            return {
                success: false,
                data: null,
                error: error.message
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
    } 
} 

export const supa_login = async ({ email, password }: loginType) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if(error){
            return {
                success: false as const,
                data: null,
                error: error.message
            }
        }
        const dataUser = {
            user: data.user.user_metadata.user,
            email: data.user.email,
            JWT: data.session.access_token
        }
        return {
            success: true as const,
            data: dataUser,
            error: null
        }
        
    } catch (error: unknown) {
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
    } 
}

export const supa_session = async () => {
    try {
        const { data, error } = await supabase.auth.getSession()
        if( error ){
            return {
                success: false as const,
                data: null,
                error: error.message
            }
        }
        if( data.session == null ){
            return {
                success: false as const,
                data: null,
                error: "Error desconocido"
            }
        }   
        const dataUser = {
            user: data.session.user.user_metadata.user,
            email: data.session.user.email,
            JWT: data.session.access_token
        }
        return {
            success: true as const,
            data: dataUser,
            error: null
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
        
    }
}

export const supa_logout = async () => {
    try {
        const { error } = await supabase.auth.signOut()
        if( error ){
            return {
                success: false,
                data: null,
                error: error.message
            }
        }
        return {
            success: true,
            data: "Sesion cerrada",
            error: null
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
    }
}