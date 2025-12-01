"use client"
export default function login () {
  const submit= (e: React.FormEvent) => {
    e.preventDefault()
    console.log('S');
    
  }
  return (
    <section className="
      w-full max-w-[1000px] mx-auto
      flex items-center justify-center
    ">
      <div className="bg-slate-950">
        <h2> Bienvenido </h2>
        <small> Inicia sesión para ver las estadisticas de tus QR. </small>
        <form onSubmit={ (e) => submit(e) } method="post">

        </form>
      </div>
    </section>
  )
}

