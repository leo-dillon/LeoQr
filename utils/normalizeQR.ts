export const normalizeQR = async ( dataImg: FormData, img: string | undefined) => {
    
    const url               = dataImg.get('url') as string | null
    let ancho               = dataImg.get('width') as number | null
    let alto                = dataImg.get('heigth') as number | null
    let margen              = dataImg.get('margin') as number | null 
    const img_supa          = img
    let tamañoIMG           = dataImg.get('img_size') as number | null
    let margenIMG           = dataImg.get('img_margen') as number | null
    let color_a             = dataImg.get('color_a') as string | null
    let color_b             = dataImg.get('color_b') as string | null
    let color_c             = dataImg.get('color_c') as string | null
    let color_d             = dataImg.get('color_d') as string | null

    if( ancho == null || ancho > 400 || ancho < 100 ) ancho = 300
    if( alto == null || alto > 400 || alto < 100 ) alto = 300
    if( margen == null || margen > 50 || margen < 0 ) margen = 20
    if( tamañoIMG == null || tamañoIMG < 0 || tamañoIMG > 100 ) tamañoIMG = 40 
    if( margenIMG == null || margenIMG < 0 || margenIMG > 40 ) margenIMG = 10 
    if( color_a == null ) color_a = "#000"
    if( color_b == null ) color_b = "#686868"
    if( color_c == null ) color_c = "#000"
    if( color_d == null ) color_d = "#000"

    return {
        url,
        imagen: img_supa,
        ancho,
        alto,
        margen,
        tamañoIMG,
        margenIMG,
        color_a,
        color_b,
        color_c,
        color_d,
    }
}