"use client"

import { ChangeEvent, FormEvent, useRef, useState } from "react"
import QRCodeStyling, { CornerDotType, CornerSquareType, DotType, FileExtension, Options } from "qr-code-styling";
import { normalizeQR } from "@/utils/normalizeQR";
import { optimizeImage } from "@/utils/optimazeImage";
import { responsesType } from "@/types/responseType";

type QR_Form_Type = {
    saveTemporalImage: (img: File) => Promise<responsesType<string>>
    setOptions: (options: Options) => void,
    options: Options,
    login: boolean
}


export const QRForm = ({ setOptions, options, login, saveTemporalImage }: QR_Form_Type) => {

    const refForm = useRef<HTMLFormElement>(null)

    const [fileExt, setFileExt]   = useState<FileExtension>("svg");
    const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));

    const [ conImagen, setConImagen ] = useState<boolean>(true)
    const [ imagenActual, setImagenActual ] = useState<string | undefined>(undefined)
    const [ imagenGuardada, setImagenGuardad ] = useState<string | undefined>(undefined)

    const normalizarImagen = async (img: File) => {
        if( conImagen ){
            if( imagenGuardada == undefined && img.name.length < 1){
                return process.env.NEXT_PUBLIC_LOGO
            }else if( imagenActual == img.name ){
                return imagenGuardada
            } else {
                setImagenActual(img.name)
                const imagenOptimizada  = await optimizeImage(img)
                const { success, data }  = await saveTemporalImage(imagenOptimizada)
                if( success ){
                    setImagenGuardad(data)
                    return data
                }
            }
        } else {
            return undefined
        }
    }
    const editForm = async ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault()
        const newData = new FormData(e.currentTarget)
        const imagenContenedor  = newData.get('image') as File
        const imagenFinal = await normalizarImagen(imagenContenedor)
        const {
            imagen,
            url,
            ancho,
            alto,
            margen,
            tamañoIMG,
            margenIMG,
            color_a,
            color_b,
            color_c,
            color_d,
        } = await normalizeQR( newData, imagenFinal )
        
        setOptions({
            ...options,
            width:  ( ancho == null   ) ? 300 : ancho,
            height: ( alto == null    ) ? 300 : alto,
            data:   ( url == null     ) ? "https://portafolio-henna-phi.vercel.app/" : url,
            margin: ( margen == null  ) ? 10 : margen,
            image:  imagen || undefined,
            imageOptions: {
            hideBackgroundDots: true,
            imageSize: ( tamañoIMG < 11 ) ? 0.1 : tamañoIMG / 100 ,
            margin: margenIMG,
            crossOrigin: 'anonymous',
            },
            dotsOptions: {
            color: color_a,
            type: 'rounded' as DotType
            },
            backgroundOptions: {
            color: color_b,
            },
            cornersSquareOptions: {
            color: color_c,
            type: 'extra-rounded' as CornerSquareType,
            },
            cornersDotOptions: {
            color: color_d,
            type: 'dot' as CornerDotType,
            }
        })
    }

    const onDownloadClick = () => {
        if (!qrCode) return;
        qrCode.download({
            extension: fileExt
        });
    };

    const safeQR = () => {
        console.log(qrCode._options);
    }

    const onExtensionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setFileExt(event.target.value as FileExtension  );
    };

    const toggleConImagen = ( val: boolean ) => {
        if( val ){
            setConImagen(true)
        }else{
            setOptions({
                ...options,
                image:""
            })
            setConImagen(false)
            setImagenActual(undefined)
        }
    }

    return (
        <form
            id="QR"
            onChange={(e) => editForm(e)}
            ref={refForm}
            className="aparecer-3 relative mx-auto md:mx-0 w-full max-w-85/100 md:max-w-[550px] min-w-[320px grow px-8 py-8 
          bg-zinc-300/10 hover:bg-zinc-300/20 duration-250 rounded-xl flex flex-col gap-3 z-3
          "
        >
            <div>
                <h2 className="w-fit text-4xl font-bold text-stone-200 border-b"> Genera tu QR </h2>
                <small className="opacity-40 text-stone-200"> Crea tus QR en pocos segundos </small>
            </div>
            {/*  Editar URL  */}
            <div className="flex flex-col gap-1 group">
                <label htmlFor="url" className="opacity-50 text-sm group-hover:opacity-100 group-focus-within:opacity-100 duration-300"> Ingresa la URL </label>
                <textarea name="url" id="url" defaultValue={options.data}
                    className="resize-none line-clamp-2 px-4 py-1 bg-stone-200 rounded-lg text-stone-900 opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 duration-300
        h-8 sm:h-auto
        "
                />
            </div>
            <div className="flex flex-row flex-wrap justify-between gap-2">
                {/*  Editar Ancho  */}
                <div className="grow flex flex-col gap-1 group">
                    <label htmlFor="width" className="opacity-50 text-sm group-hover:opacity-100 group-focus-within:opacity-100 duration-300"> Ancho ( px )</label>
                    <input className="px-4 py-1 bg-stone-200 rounded-lg text-stone-900 opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 duration-300" min={0} max={400} defaultValue={300} name="width" id="width" type="number" />
                </div>
                {/*  Editar Alto  */}
                <div className="grow flex flex-col gap-1 group">
                    <label htmlFor="heigth" className="opacity-50 text-sm group-hover:opacity-100 group-focus-within:opacity-100 duration-300"> Alto ( px )</label>
                    <input className="px-4 py-1 bg-stone-200 rounded-lg text-stone-900 opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 duration-300" min={0} max={400} defaultValue={300} name="heigth" id="heigth" type="number" />
                </div>
                {/*  Editar Margen  */}
                <div className="grow flex flex-col gap-1 group">
                    <label htmlFor="margin" className="opacity-50 text-sm group-hover:opacity-100 group-focus-within:opacity-100 duration-300"> Margen ( px )</label>
                    <input className="px-4 py-1 bg-stone-200 rounded-lg text-stone-900 opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 duration-300" min={0} max={50} defaultValue={10} name="margin" id="margin" type="number" />
                </div>
            </div>
            {/*  Editar Imagen  */}
            <div className="relative my-2 sm:my-0 grow flex flex-col gap-1 group">
                <label htmlFor="image" className="opacity-50 text-sm group-hover:opacity-100 group-focus-within:opacity-100 duration-300"> Imagen </label>
                <input className="hidden" name="image" id="image" type="file" accept="image/png, image/jpeg, image/jpg, image/svg+xml" onClick={() => toggleConImagen(true) }/>

                <button
                    type="button"
                    className={`${ conImagen ? "block" : "hidden"} absolute -top-1 sm:top-0 right-0 px-2 border border-slate-500 rounded-full text-sm sm:text-[12px] cursor-pointer hover:scale-110`}
                    onClick={() => { toggleConImagen(false) }}
                    title="Quitar imagen"
                >
                    Quitar imagen
                </button>

                <span className="block w-full overflow-x-hidden px-4 py-1 bg-stone-200 rounded-lg text-stone-900 opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 duration-300"
                    onClick={() => document.getElementById("image")?.click()}
                >
                    {imagenActual == undefined ? "Seleccione una imagen" : imagenActual}
                </span>
            </div>
            {
                conImagen && <div>
                    <span className="opacity-90 text-sm duration-300"> Editar imagen </span>
                    <div className="flex justify-between gap-5">
                        {/*  Editar tamaño Imagen  */}
                        <div className="grow flex flex-col gap-1 group">
                            <label htmlFor="img_size" className="opacity-50 text-sm group-hover:opacity-100 group-focus-within:opacity-100 duration-300"> Tamaño </label>
                            <input className="px-4 py-1 bg-stone-200 rounded-lg text-stone-900 opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 duration-300" min={0} max={100} defaultValue={40} name="img_size" id="img_size" type="number" />
                        </div>
                        {/*  Editar margen Imagen  */}
                        <div className="grow flex flex-col gap-1 group">
                            <label htmlFor="img_margen" className="opacity-50 text-sm group-hover:opacity-100 group-focus-within:opacity-100 duration-300"> Margen </label>
                            <input className="px-4 py-1 bg-stone-200 rounded-lg text-stone-900 opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 duration-300" min={0} max={40} defaultValue={10} name="img_margen" id="img_margen" type="number" />
                        </div>
                    </div>
                </div>
            }
            {/*  Editar Color  */}
            <div>
                <span className="opacity-90 text-sm duration-300"> Editar color </span>
                <div className="flex flex-wrap justify-between gap-5">
                    <div className="grow flex-1 flex flex-col gap-1 group">
                        <label htmlFor="color_a" className="opacity-50 text-sm group-hover:opacity-100 group-focus-within:opacity-100 duration-300"> Patron </label>
                        <input className="w-full min-h-8 px-4 py-1 bg-stone-200 rounded-lg text-stone-900 opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 duration-300" name="color_a" id="color_a" type="color" defaultValue={"#000"} />
                    </div>
                    <div className="grow flex-1 flex flex-col gap-1 group">
                        <label htmlFor="color_b" className="opacity-50 text-sm group-hover:opacity-100 group-focus-within:opacity-100 duration-300"> Fondo </label>
                        <input className="w-full min-h-8 px-4 py-1 bg-stone-200 rounded-lg text-stone-900 opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 duration-300" name="color_b" id="color_b" type="color" defaultValue={"#686868"} />
                    </div>
                    <div className="grow flex-1 flex flex-col gap-1 group">
                        <label htmlFor="color_c" className="opacity-50 text-sm text-nowrap group-hover:opacity-100 group-focus-within:opacity-100 duration-300"> Interior </label>
                        <input className="w-full min-h-8 px-4 py-1 bg-stone-200 rounded-lg text-stone-900 opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 duration-300" name="color_c" id="color_c" type="color" defaultValue={"#000"} />
                    </div>
                    <div className="grow flex-1 flex flex-col gap-1 group">
                        <label htmlFor="color_d" className="opacity-50 text-sm text-nowrap group-hover:opacity-100 group-focus-within:opacity-100 duration-300"> Exterior</label>
                        <input className="w-full min-h-8 px-4 py-1 bg-stone-200 rounded-lg text-stone-900 opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 duration-300" name="color_d" id="color_d" type="color" defaultValue={"#000"} />
                    </div>
                </div>
            </div>
            <div className="flex mt-3 justify-between gap-5">
                <button
                    type="button"
                    onClick={onDownloadClick}
                    className="w-full py-2 bg-indigo-900 border border-stone-600 rounded-md cursor-pointer text-2xl group hover:rounded-xl hover:bg-indigo-800 duration-100"
                >
                    <span className="opacity-100 group-hover:opacity-100 duration-100"> Descargar </span>
                </button>
                {
                    login ? <button
                        type="button"
                        onClick={safeQR}
                        className="w-full py-2 bg-indigo-900 border border-stone-600 rounded-md cursor-pointer text-2xl group hover:rounded-xl hover:bg-indigo-800 duration-100"
                    >
                        <span className="opacity-100 group-hover:opacity-100 duration-100"> Guardar QR </span>
                    </button> : ""
                }
                <select onChange={onExtensionChange} value={fileExt}
                    className="w-32 px-3 py-2 bg-indigo-900 border border-stone-600 cursor-pointer opacity-90 rounded-lg hover:rounded-xl hover:opacity-100 hover:bg-indigo-800"
                >
                    <option value="svg">SVG</option>
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                    <option value="webp">WEBP</option>
                </select>
            </div>
        </form>
    )
}

