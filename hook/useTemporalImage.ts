import { supa_temporalImage } from "@/lib/store/temporalImage"
import { useState } from "react"

export const useTemporalImage = () => {
    const [ loading, setLoading ] = useState<boolean>(false)
    
    const saveTemporalImage = async (img: File) => {
        setLoading(true)
        try {
            const { success, data, error } = await supa_temporalImage(img)
            if( success ){
                return {
                    success: true as const,
                    data: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data}`,
                    error: null
                }
            }
            return {
                success: false as const,
                data: null,
                error: error
            }
        } catch (error) {
            if( error instanceof Error ) {
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
            setLoading(false)
        }
    } 

    return { loading, saveTemporalImage }
}