"use client"
import { Qr } from "@/components/qr/Qr";
import Link from "next/link";

export default function Home() {
  return (
  <div className="w-full flex flex-col gap-4">
    
    <section className="min-h-screen w-full max-w-9/10 mx-auto flex flex-col lg:flex-row justify-center items-center gap-12">
      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="w-full max-w-[700px] flex justify-center lg:justify-start relative my-3">
            <h2 className="text-center uppercase lg:text-start text-4xl md:text-8xl text-balance font-bold text-stone-300">
              Impulsa tu marca con un QR
            </h2>
            <span className="aparecer-1 absolute uppercase left-0 top-0 text-center lg:text-start text-4xl md:text-8xl text-balance font-bold blur-2xl text-indigo-300">
              Impulsa tu marca con un QR
            </span>
          </div>
          <h3 className="text-center md:text-start text-xl opacity-40"> Genera tu QR de una forma <strong>rápida</strong> y <strong>sencilla</strong> </h3>
          <Link href={'/#QR'} className="w-fit mt-2 py-2 md:py-4 px-6 bg-indigo-900 rounded-md cursor-pointer text-xl md:text-2xl hover:rounded-xl duration-100">
            Genera tu QR
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <picture className="aparecer-4 w-full max-w-[300px] sm:max-w-[400px] xl:max-w-[600px] bg-zinc-300/10 hover:bg-zinc-300/20 duration-250 rounded-4xl">
          <img src="/qr_ART.png" alt="Ilustración de un QR"/>
        </picture>
      </div>
    </section>

    <section className="w-full max-w-9/10 mx-auto py-12 mb-20 flex flex-col lg:flex-row justify-center items-center rounded-2xl gap-12 border-y bg-zinc-300/1 border-indigo-700/50 hover:border-indigo-700/90 duration-300">
        <div className="w-full max-w-9/10 mx-auto p-8 flex flex-col lg:flex-row justify-center items-center rounded-2xl gap-12 border-y bg-zinc-300/10 border-indigo-700/40 hover:border-indigo-700/90 duration-300">
          <div className="flex flex-col gap-5 lg:gap-10 mt-8">

            <h4 className="text-center text-3xl lg:text-6xl text-pretty text-stone-200 uppercase">
              ¿ Por qué tener un QR ?
            </h4>

            <p className="max-w-9/10 sm:max-w-7/10 text-center mx-auto text-stone-400 text-lg md:text-xl">
              Los códigos QR se han convertido en una herramienta clave para conectar tu marca con tu público de forma rápida, moderna y efectiva.
            </p>


            <div className="mt-6 flex flex-wrap justify-center items-center gap-3 lg:gap-12">

              <div className="relative aparecer-1 w-full lg:max-w-[300px] pl-12 pr-5 py-3 flex flex-col gap-3 rounded-2xl border border-slate-900 bg-indigo-300/25 hover:scale-[1.02] duration-300 group">
                <span className="absolute top-2 lg:group-hover:top-4 left-2 text-3xl lg:text-6xl text-stone-300 opacity-20 group-hover:opacity-30 duration-150">1</span>
                <div className="flex items-center gap-3">
                  <p className="text-lg md:text-xl text-stone-300 group-hover:text-stone-200 duration-150">
                    Acceso inmediato a la información
                  </p>
                </div>
              </div>

              <div className="relative aparecer-2 w-full lg:max-w-[300px] pl-12 pr-5 py-3 flex flex-col gap-3 rounded-2xl border border-slate-900 bg-indigo-300/25 hover:scale-[1.02] duration-300 group">
                <span className="absolute top-2 lg:group-hover:top-4 left-2 text-3xl lg:text-6xl text-stone-300 opacity-20 group-hover:opacity-30 duration-150">2</span>
                <div className="flex items-center gap-3">
                  <p className="text-lg md:text-xl text-stone-300 group-hover:text-stone-200 duration-150">
                    Conecta el mundo físico con el digital
                  </p>
                </div>
              </div>

              <div className="relative aparecer-3 w-full lg:max-w-[300px] pl-12 pr-5 py-3 flex flex-col gap-3 rounded-2xl border border-slate-900 bg-indigo-300/25 hover:scale-[1.02] duration-300 group">
                <span className="absolute top-2 lg:group-hover:top-4 left-2 text-3xl lg:text-6xl text-stone-300 opacity-20 group-hover:opacity-30 duration-150">3</span>
                <div className="flex items-center gap-3">
                  <p className="text-lg md:text-xl text-stone-300 group-hover:text-stone-200 duration-150">
                    Aumentan las conversiones de marketing
                  </p>
                </div>
              </div>

              <div className="relative aparecer-4 w-full lg:max-w-[300px] pl-12 pr-5 py-3 flex flex-col gap-3 rounded-2xl border border-slate-900 bg-indigo-300/25 hover:scale-[1.02] duration-300 group">
                <span className="absolute top-2 lg:group-hover:top-4 left-2 text-3xl lg:text-6xl text-stone-300 opacity-20 group-hover:opacity-30 duration-150">4</span>
                <div className="flex items-center gap-3">
                  <p className="text-lg md:text-xl text-stone-300 group-hover:text-stone-200 duration-150">
                    Permiten rastrear estadísticas
                  </p>
                </div>
              </div>

              <div className="relative aparecer-5 w-full lg:max-w-[300px] pl-12 pr-5 py-3 flex flex-col gap-3 rounded-2xl border border-slate-900 bg-indigo-300/25 hover:scale-[1.02] duration-300 group">
                <span className="absolute top-2 lg:group-hover:top-4 left-2 text-3xl lg:text-6xl text-stone-300 opacity-20 group-hover:opacity-30 duration-150">5</span>
                <div className="flex items-center gap-3">
                  <p className="text-lg md:text-xl text-stone-300 group-hover:text-stone-200 duration-150">
                    Aumentan la confianza y profesionalismo
                  </p>
                </div>
              </div>

              <div className="relative aparecer-6 w-full lg:max-w-[300px] pl-12 pr-5 py-3 flex flex-col gap-3 rounded-2xl border border-slate-900 bg-indigo-300/25 hover:scale-[1.02] duration-300 group">
                <span className="absolute top-2 lg:group-hover:top-4 left-2 text-3xl lg:text-6xl text-stone-300 opacity-20 group-hover:opacity-30 duration-150">6</span>
                <div className="flex items-center gap-3">
                  <p className="text-lg md:text-xl text-stone-300 group-hover:text-stone-200 duration-150">
                    Podés actualizar la info sin reimprimir
                  </p>
                </div>
              </div>

            </div>


          </div>
        </div>
    </section>

    <section className="w-full max-w-[1400px] my-24 sm:my-12 mx-auto flex flex-col justify-center items-center">
      <Qr />
      <span className="mt-12 text-center text-2xl text-stone-500 opacity-50"> 
        Mira las estadisticas de tus QR 
        <Link 
          href={"/register"} 
          className="inline-block ml-2 text-stone-200 underline hover:brightness-130 duration-150"
        > 
          registradote aquí🔗
        </Link> 
      </span>
    </section>
  </div>
  );
}