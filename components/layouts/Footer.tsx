import Ldillon from "../icons/Ldillon"

export const Footer = () => {
    return (
        <footer className="w-full h-20 mt-8
            flex justify-center items-center gap-4 md:gap-12
            text-stone-300 
            dark:text-stone-200 
            z-10
        ">  
            <Ldillon />
            <p className="text-sm">
                &copy; 2025 Portafolio Personal Leonardo Dillon.
            </p>
        </footer>
    )
}