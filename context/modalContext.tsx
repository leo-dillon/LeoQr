"use client"
import Ldillon from "@/components/icons/Ldillon";
import { createContext, ReactNode, useContext, useState } from "react";

type TypeToast = "success" | "error" | "info"
type Toast = {
    id:number, 
    type: TypeToast,
    message: string
}
type ToastContextType = {
    newToast: ( type: TypeToast, message: string ) => void 
} 

const ToastContext = createContext<ToastContextType | null>(null)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [ toast, setToast ] = useState<Toast[]>([])

    const newToast = (type: TypeToast, message: string ) => {
        const id = new Date().getTime()
        
        setToast( prev => [...prev, {id, type, message }] )

        setTimeout(() => {
            setToast( prev => prev.filter( t => t.id !== id )) 
        }, 3000);
    };


    return (
        <ToastContext.Provider value={{ newToast }}>
            { children }
            <div className="absolute top-4 left-4 z-100 flex flex-col-reverse gap-3">
                { toast.map(( data ) => {
                    return (
                        <div 
                            key={ data.id } 
                            className={` relative
                                w-full max-w-[300px] aparecer-4 rounded-xl pl-6 py-2 pr-10 bg-zinc-800 border group
                                ${ data.type == "error" ? "border-red-400" 
                                    : data.type == "success" ? "border-green-400"
                                    : "border-orange-400" 
                                }
                            `}
                        >
                            <p className="text-md"> { data.message } </p>
                            <Ldillon 
                                className={`absolute top-0 right-1 opacity-70 group-hover:opacity-100 duration-200 
                                    ${ data.type == "error" ? "text-red-400" 
                                    : data.type == "success" ? "text-green-400"
                                    : "text-orange-400" 
                                }`} 
                                width={"16px"}
                            />
                        </div>
                    )
                }) }
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const t =  useContext(ToastContext)
    if ( !t ){
        throw new Error("Error al crear useToast")
    } 
    return t
}