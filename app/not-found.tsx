import Link from "next/link"
import { FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-border text-muted-foreground">
        <FileQuestion className="h-9 w-9" />
      </div>
      <p className="mb-2 font-mono text-xs tracking-[0.2em] text-primary uppercase">
        Error 404
      </p>
      <h1 className="font-display mb-3 text-4xl leading-tight font-medium italic sm:text-5xl">
        Este expediente no está en el archivo.
      </h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        La página que buscas no existe o se movió de carpeta. Revisa la
        dirección o vuelve al analizador.
      </p>
      <Button asChild size="lg">
        <Link href="/">Volver al inicio</Link>
      </Button>
    </main>
  )
}
