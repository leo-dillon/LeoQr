"use client"
import Link from "next/link";
import QRCodeStyling, { CornerDotType, CornerSquareType, DotType, DrawType, ErrorCorrectionLevel, errorCorrectionLevels, ExtensionFunction, FileExtension, Mode, modes, Options, TypeNumber } from "qr-code-styling";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

export default function Home() {
  const DEFAULT_BASE64_IMAGE =
  "data:image/png;base64,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";

  const [options, setOptions] = useState<Options>({
    width: 300,
    height: 300,
    type: 'svg' as DrawType,
    data: 'https://portafolio-henna-phi.vercel.app/',
    image: DEFAULT_BASE64_IMAGE,
    margin: 10,
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 10,
      crossOrigin: 'anonymous',
    },
    dotsOptions: {
      color: '#000',
      type: 'rounded' as DotType
    },
    backgroundOptions: {
      color: '#686868',
    },
    cornersSquareOptions: {
      color: '#000',
      type: 'extra-rounded' as CornerSquareType,
    },
    cornersDotOptions: {
      color: '#000',
      type: 'dot' as CornerDotType,
    }
  });
  const [fileExt, setFileExt]   = useState<FileExtension>("svg");
  const [ imgSelect, setImgSelect ] = useState<string | null>(null)
  const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));
  const [ loading, setLoading ] = useState<boolean>(false)
  const refa = useRef<HTMLDivElement>(null);
  const inputFile = useRef<HTMLInputElement>(null)
  const timeRef = useRef<number | null>(null)
  useEffect(() => {
    if (refa.current) {
      qrCode.append(refa.current);
    }
  }, [qrCode, refa]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode.update(options);
    
  }, [qrCode, options]);


  const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const editForm = async ( e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    setLoading(true)
    if( timeRef.current ) clearTimeout(timeRef.current)
    timeRef.current = window.setTimeout( () => {  
      setLoading(false)
    }, 700)
    const newData = new FormData(e.currentTarget)

    const url         = newData.get('url') as string | null
    let   ancho       = newData.get('width') as number | null
    let   alto        = newData.get('heigth') as number | null
    let   margen      = newData.get('margin') as number | null 
    const imagenContenedor = newData.get('image') as File
    const imagen = ( imgSelect == null && imagenContenedor.size < 3) ? DEFAULT_BASE64_IMAGE : ( imagenContenedor.size < 3 ) ? "" : await fileToBase64(imagenContenedor) 
    let   tamañoIMG   = newData.get('img_size') as number | null
    let   margenIMG   = newData.get('img_margen') as number | null
    let color_a   = newData.get('color_a') as string | null
    let color_b   = newData.get('color_b') as string | null
    let color_c   = newData.get('color_c') as string | null
    let color_d   = newData.get('color_d') as string | null

    if( ancho == null || ancho > 400 || ancho < 100 ) ancho = 300
    if( alto == null || alto > 400 || alto < 100 ) alto = 300
    if( margen == null || margen > 50 || margen < 0 ) margen = 20
    if( tamañoIMG == null || tamañoIMG < 0 || tamañoIMG > 100 ) tamañoIMG = 40 
    if( margenIMG == null || margenIMG < 0 || margenIMG > 40 ) margenIMG = 10 
    if( color_a == null ) color_a = "#000"
    if( color_b == null ) color_b = "#686868"
    if( color_c == null ) color_c = "#000"
    if( color_d == null ) color_d = "#000"
    
    setOptions(options => ({
      ...options,
      width:  ( ancho == null   ) ? 300 : ancho,
      height: ( alto == null    ) ? 300 : alto,
      data:   ( url == null     ) ? "http://localhost:3000/" : url,
      margin: ( margen == null  ) ? 10 : margen,
      image:  imagen,
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

    }));
  }
  const clearImg = () => {
    setOptions( options => ({
      ...options,
      image: ""
    }))
    if( inputFile.current ){
      inputFile.current.value = ""
    }
  }

  const inputFileTarget = () => {
    document.getElementById("image")?.click()
  }

  const onExtensionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFileExt(event.target.value as FileExtension  );
  };

  const onDownloadClick = () => {
    if (!qrCode) return;
    qrCode.download({
      extension: fileExt
    });
  };

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
      <div className="w-full flex flex-col justify-center items-auto md:flex-row md:justify-center gap-4">
        <form 
          id="QR"
          onChange={ (e) => editForm(e) } 
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
              <input className="px-4 py-1 bg-stone-200 rounded-lg text-stone-900 opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 duration-300" min={0} max={400} defaultValue={300} name="width" id="width" type="number"/>
            </div>
            {/*  Editar Alto  */}
            <div className="grow flex flex-col gap-1 group">
              <label htmlFor="heigth" className="opacity-50 text-sm group-hover:opacity-100 group-focus-within:opacity-100 duration-300"> Alto ( px )</label>
              <input className="px-4 py-1 bg-stone-200 rounded-lg text-stone-900 opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 duration-300" min={0} max={400} defaultValue={300} name="heigth" id="heigth" type="number"/>
            </div>
            {/*  Editar Margen  */}
            <div className="grow flex flex-col gap-1 group">
              <label htmlFor="margin" className="opacity-50 text-sm group-hover:opacity-100 group-focus-within:opacity-100 duration-300"> Margen ( px )</label>
              <input className="px-4 py-1 bg-stone-200 rounded-lg text-stone-900 opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 duration-300" min={0} max={50} defaultValue={10} name="margin" id="margin" type="number"/>
            </div>
          </div>
          {/*  Editar Imagen  */}
          <div className="relative my-2 sm:my-0 grow flex flex-col gap-1 group">
            <label htmlFor="image" className="opacity-50 text-sm group-hover:opacity-100 group-focus-within:opacity-100 duration-300"> Imagen </label>
            <input className="hidden" name="image" id="image" type="file" accept="image/png, image/jpeg, image/jpg, image/svg+xml"
              ref={inputFile}
              onChange={e =>  setImgSelect(e.target.value)} 
            />
          
            <button 
              type="button" 
              className={`${imgSelect == "" ? "hidden": "block"} absolute -top-1 sm:top-0 right-0 px-2 border border-slate-500 rounded-full text-sm sm:text-[12px] cursor-pointer hover:scale-110`} 
              onClick={() => { setImgSelect(""); clearImg()  }}
              title="Quitar imagen"
            > 
              Quitar imagen
            </button>
            
            <span className="block w-full overflow-x-hidden px-4 py-1 bg-stone-200 rounded-lg text-stone-900 opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 duration-300"
              onClick={() => inputFileTarget()  }
            > 
              { imgSelect == null || imgSelect.length < 1  ? "Seleccione una imagen" : imgSelect }
            </span> 
          </div>
          {
            imgSelect != "" && <div>
              <span className="opacity-90 text-sm duration-300"> Editar imagen </span>
              <div className="flex justify-between gap-5">
                {/*  Editar tamaño Imagen  */}
                <div className="grow flex flex-col gap-1 group">
                  <label htmlFor="img_size" className="opacity-50 text-sm group-hover:opacity-100 group-focus-within:opacity-100 duration-300"> Tamaño </label>
                  <input className="px-4 py-1 bg-stone-200 rounded-lg text-stone-900 opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 duration-300" min={0} max={100} defaultValue={40} name="img_size" id="img_size" type="number"/>
                </div>
                {/*  Editar margen Imagen  */}
                <div className="grow flex flex-col gap-1 group">
                  <label htmlFor="img_margen" className="opacity-50 text-sm group-hover:opacity-100 group-focus-within:opacity-100 duration-300"> Margen </label>
                  <input className="px-4 py-1 bg-stone-200 rounded-lg text-stone-900 opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 duration-300" min={0} max={40} defaultValue={10} name="img_margen" id="img_margen" type="number"/>
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
                <input className="w-full min-h-8 px-4 py-1 bg-stone-200 rounded-lg text-stone-900 opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 duration-300" name="color_a" id="color_a" type="color" defaultValue={"#000"}/>
              </div>
              <div className="grow flex-1 flex flex-col gap-1 group">
                <label htmlFor="color_b" className="opacity-50 text-sm group-hover:opacity-100 group-focus-within:opacity-100 duration-300"> Fondo </label>
                <input className="w-full min-h-8 px-4 py-1 bg-stone-200 rounded-lg text-stone-900 opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 duration-300" name="color_b" id="color_b" type="color" defaultValue={"#686868"}/>
              </div>
              <div className="grow flex-1 flex flex-col gap-1 group">
                <label htmlFor="color_c" className="opacity-50 text-sm text-nowrap group-hover:opacity-100 group-focus-within:opacity-100 duration-300"> Interior </label>
                <input className="w-full min-h-8 px-4 py-1 bg-stone-200 rounded-lg text-stone-900 opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 duration-300" name="color_c" id="color_c" type="color" defaultValue={"#000"}/>
              </div>
              <div className="grow flex-1 flex flex-col gap-1 group">
                <label htmlFor="color_d" className="opacity-50 text-sm text-nowrap group-hover:opacity-100 group-focus-within:opacity-100 duration-300"> Exterior</label>
                <input className="w-full min-h-8 px-4 py-1 bg-stone-200 rounded-lg text-stone-900 opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 duration-300" name="color_d" id="color_d" type="color" defaultValue={"#000"}/>
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

        <div
          className="
            grow max-w-[90%] md:max-w-[450px]
            flex items-center justify-center bg-indigo-300/25
            relative mx-auto md:mx-2 px-8 py-6
            rounded-xl
            aparecer-2
            z-1
          "
        >
          <div ref={refa} id="QR_contain" className={`${loading ? "hidden" : ""}`}></div>
          <div className={`bg-indigo-500/50 w-[300px] h-[300px] animate-pulse z-10 ${loading ? "" : "hidden"}`}></div>  
        </div>
      </div>
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