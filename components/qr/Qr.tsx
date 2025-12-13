'use client'
import { useToast } from "@/context/modalContext";
import { useTemporalImage } from "@/hook/useTemporalImage";
import { normalizeQR } from "@/utils/normalizeQR";
import { optimizeImage } from "@/utils/optimazeImage";
import QRCodeStyling, { CornerDotType, CornerSquareType, DotType, DrawType, FileExtension, Options } from "qr-code-styling";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { QRForm } from "../form/QRForm";

export const Qr = ({ login=false }) => {
  const [options, setOptions] = useState<Options>({
    width: 300,
    height: 300,
    type: 'svg' as DrawType,
    data: 'https://portafolio-henna-phi.vercel.app/',
    image: process.env.NEXT_PUBLIC_LOGO,
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
  const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));
  const refa = useRef<HTMLDivElement>(null);
  const { loading } = useTemporalImage()
  
  useEffect(() => {
    if (refa.current) {
      qrCode.append(refa.current);
    }
  }, [qrCode, refa]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode.update(options);
    
  }, [qrCode, options]);
  


  return (
    <div className="w-full flex flex-col justify-center items-auto md:flex-row md:justify-center gap-4">
        <QRForm setOptions={setOptions} options={options} login={login} />
        <div
          className={`
            grow max-w-[90%] md:max-w-[450px]
            flex items-center justify-center bg-indigo-300/25
            relative mx-auto md:mx-2 px-8 py-6
            rounded-xl ${loading ? "animate-bounce" : "" }
            aparecer-2
            z-1`}
        >
          <div ref={refa} id="QR_contain" className={`${loading ? "hidden" : ""}`}></div>
          <div className={`bg-indigo-500/50 w-[300px] h-[300px] animate-pulse z-10 ${loading ? "" : "hidden"}`}></div>  
        </div>
      </div>
  )
}

