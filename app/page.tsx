"use client"

import { useState } from "react"
import { CvDropzone } from "@/components/cv-dropzone"
import { AnalysisResult } from "@/components/analysis-result"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CvAnalysis } from "@/lib/groq"
import { Loader2, ScanSearch } from "lucide-react"

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<CvAnalysis | null>(null)

  async function handleSubmit() {
    if (!file) return
    setLoading(true)
    setError(null)
    setAnalysis(null)

    try {
      const formData = new FormData()
      formData.append("cv", file)
      formData.append("jobDescription", jobDescription)

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()

      if (!res.ok)
        throw new Error(data.error || "Ocurrió un error al analizar el CV.")
      setAnalysis(data.analysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16">
      <header className="mb-12 space-y-3">
        <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
          Escrutinio · análisis de CV con IA
        </p>
        <h1 className="font-display text-4xl leading-tight font-medium italic sm:text-5xl">
          Una lectura honesta de tu hoja de vida.
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Sube tu CV y, si quieres, la oferta a la que aplicas. Llama, corriendo
          en Groq, lo revisa como lo haría un reclutador exigente: habilidades,
          huecos y qué palabras clave te faltan.
        </p>
      </header>

      <div className="space-y-6">
        <div>
          <Label className="mb-2 block text-sm font-medium">
            1. Tu hoja de vida
          </Label>
          <CvDropzone onFileSelected={setFile} />
        </div>

        <div>
          <Label className="mb-2 block text-sm font-medium">
            2. Oferta laboral{" "}
            <span className="font-normal text-muted-foreground">
              (opcional)
            </span>
          </Label>
          <Textarea
            placeholder="Pega aquí la descripción del puesto para calcular compatibilidad y palabras clave faltantes..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={5}
          />
        </div>

        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={!file || loading}
          className="w-full sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analizando...
            </>
          ) : (
            <>
              <ScanSearch className="mr-2 h-4 w-4" /> Analizar CV
            </>
          )}
        </Button>

        {error && (
          <p className="border-gap/30 bg-gap/10 text-gap rounded-md border px-4 py-3 text-sm">
            {error}
          </p>
        )}
      </div>

      {analysis && (
        <div className="mt-12">
          <AnalysisResult analysis={analysis} />
        </div>
      )}
    </main>
  )
}
