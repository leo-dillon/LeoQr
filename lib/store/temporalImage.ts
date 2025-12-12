import { supabase } from "../supabase"

export const supa_temporalImage = async (img: File) => {
    try {
        const { data: userData, error: userError } = await supabase.auth.getSession()
        if( userError ){
            return {
                success: false as const,
                data: null,
                error: userError.message
            }
        }
        if( userData.session == null ){
            return {
                success: false as const,
                data: null,
                error: "Error con las credenciales del usuario. Intente de nuevo más tarde"
            }
        }
        const userId = userData.session.user.id

        const { data, error } = await supabase.storage
            .from("img-temp")
            .upload(`user/${userId  }${Date.now()}.webp`, img, {
                upsert: true
            })
        if( error ){
            return {
                success: false as const,
                data: null,
                error: error.message
            }
        }
        return {
            success: true as const,
            data: data.fullPath,
            error: null
        }
    } catch (error) {
        if(error instanceof Error){
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