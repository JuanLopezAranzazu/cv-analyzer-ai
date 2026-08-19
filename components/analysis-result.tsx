"use client"

import { CvAnalysis } from "@/lib/groq"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScoreRing } from "@/components/score-ring"
import { CheckCircle2, AlertTriangle, Sparkles, Target } from "lucide-react"

export function AnalysisResult({ analysis }: { analysis: CvAnalysis }) {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="flex flex-col items-start gap-6 pt-6 sm:flex-row sm:items-center">
          {analysis.compatibility && (
            <ScoreRing score={analysis.compatibility.score} />
          )}
          <div className="space-y-2">
            <p className="font-mono text-xs tracking-widest text-primary uppercase">
              Resumen del perfil
            </p>
            <p className="font-display text-lg leading-snug text-foreground/90 italic">
              “{analysis.candidateSummary}”
            </p>
            <p className="text-sm text-muted-foreground">
              Experiencia estimada: {analysis.yearsOfExperience}
            </p>
          </div>
        </CardContent>
      </Card>

      {analysis.compatibility && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="h-4 w-4 text-primary" /> Compatibilidad con la
              oferta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/90">
              {analysis.compatibility.summary}
            </p>
            {analysis.missingKeywords.length > 0 && (
              <>
                <Separator className="my-4" />
                <p className="mb-2 text-sm font-medium">
                  Palabras clave faltantes
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingKeywords.map((kw) => (
                    <Badge key={kw} variant="gap">
                      {kw}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="habilidades">
        <TabsList>
          <TabsTrigger value="habilidades">Habilidades</TabsTrigger>
          <TabsTrigger value="balance">Fortalezas y debilidades</TabsTrigger>
          <TabsTrigger value="recomendaciones">Recomendaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="habilidades">
          <Card>
            <CardContent className="space-y-5 pt-6">
              <div>
                <p className="mb-2 text-sm font-medium">
                  Tecnologías detectadas
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.technologies.map((t) => (
                    <Badge key={t} variant="default" className="font-mono">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm font-medium">
                    Habilidades técnicas
                  </p>
                  <ul className="space-y-1.5 text-sm text-foreground/90">
                    {analysis.technicalSkills.map((s) => (
                      <li key={s} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">
                    Habilidades blandas
                  </p>
                  <ul className="space-y-1.5 text-sm text-foreground/90">
                    {analysis.softSkills.map((s) => (
                      <li key={s} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balance">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-match/30">
              <CardHeader>
                <CardTitle className="text-match flex items-center gap-2 text-base">
                  <CheckCircle2 className="h-4 w-4" /> Fortalezas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {analysis.strengths.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="bg-match mt-1.5 h-1 w-1 shrink-0 rounded-full" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-gap/30">
              <CardHeader>
                <CardTitle className="text-gap flex items-center gap-2 text-base">
                  <AlertTriangle className="h-4 w-4" /> A mejorar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {analysis.weaknesses.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <span className="bg-gap mt-1.5 h-1 w-1 shrink-0 rounded-full" />
                      {d}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recomendaciones">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-primary" /> Cómo mejorar tu CV
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {analysis.recommendations.map((r, i) => (
                  <li key={r} className="flex gap-3 text-sm">
                    <span className="font-display text-primary italic">
                      {i + 1}.
                    </span>
                    <span className="text-foreground/90">{r}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
