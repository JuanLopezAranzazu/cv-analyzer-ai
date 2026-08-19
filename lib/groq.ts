import Groq from "groq-sdk"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export interface CvAnalysis {
  candidateSummary: string
  technicalSkills: string[]
  softSkills: string[]
  yearsOfExperience: string
  technologies: string[]
  strengths: string[]
  weaknesses: string[]
  compatibility: {
    score: number
    summary: string
  } | null
  missingKeywords: string[]
  recommendations: string[]
}

const SYSTEM_PROMPT = `Eres un reclutador técnico senior y experto en sistemas ATS (Applicant Tracking System).
Analizas hojas de vida con rigor y honestidad, sin inflar cumplidos ni exagerar carencias.
Respondes EXCLUSIVAMENTE con un objeto JSON válido, sin texto adicional, sin markdown, sin \`\`\`.
El contenido de los textos debe estar en español, pero las claves del JSON deben ser EXACTAMENTE las de este esquema (en inglés):

{
  "candidateSummary": "string, 2-3 frases resumiendo el perfil",
  "technicalSkills": ["string", ...],
  "softSkills": ["string", ...],
  "yearsOfExperience": "string, ej. '4-5 años' o 'Junior / menos de 1 año'",
  "technologies": ["string", ...],
  "strengths": ["string", ...],
  "weaknesses": ["string", ...],
  "compatibility": { "score": number (0-100), "summary": "string" } o null si no se proporcionó oferta laboral,
  "missingKeywords": ["string", ...],
  "recommendations": ["string", ...]
}

Si no se proporciona oferta laboral, "compatibility" debe ser null y "missingKeywords" debe estar vacío.
Sé específico: menciona tecnologías, herramientas y métricas reales presentes en el CV, no genéricos.`

export async function analyzeCv(
  cvText: string,
  jobDescription?: string
): Promise<CvAnalysis> {
  const userPrompt = jobDescription
    ? `HOJA DE VIDA:\n"""\n${cvText}\n"""\n\nOFERTA LABORAL A EVALUAR COMPATIBILIDAD:\n"""\n${jobDescription}\n"""\n\nAnaliza el CV y calcula la compatibilidad con esta oferta, incluyendo palabras clave presentes en la oferta que faltan en el CV.`
    : `HOJA DE VIDA:\n"""\n${cvText}\n"""\n\nAnaliza el CV. No se proporcionó oferta laboral, así que "compatibility" debe ser null.`

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    temperature: 0.3,
    max_tokens: 2000,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
  })

  const raw = completion.choices[0]?.message?.content
  if (!raw) throw new Error("Groq no devolvió contenido")

  const cleaned = raw.replace(/```json|```/g, "").trim()
  return JSON.parse(cleaned) as CvAnalysis
}
