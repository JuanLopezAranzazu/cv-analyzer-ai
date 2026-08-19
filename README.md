# Escrutinio — Analizador de CV con IA

App de Next.js 14 (App Router) + TypeScript + shadcn/ui + Tailwind CSS que usa
**Groq** (modelo `openai/gpt-oss-120b`) para analizar hojas de vida:
habilidades, experiencia, tecnologías, fortalezas/debilidades, compatibilidad
con una oferta laboral, palabras clave faltantes y recomendaciones.

## Instalación

```bash
pnpm install
cp .env.example .env.local
```

Edita `.env.local` y pon tu API key de Groq (gratis en https://console.groq.com/keys):

```
GROQ_API_KEY=gsk_...
```

## Ejecutar en desarrollo

```bash
pnpm dev
```

Abre http://localhost:3000

## Cómo funciona

1. El usuario sube su CV (`PDF`, `DOCX` o `TXT`) mediante drag & drop.
2. Opcionalmente pega la descripción de una oferta laboral.
3. `POST /api/analyze` extrae el texto del archivo (`pdf-parse` / `mammoth`)
   y lo envía a Groq con un prompt que fuerza una respuesta JSON estructurada
   (`response_format: json_object`).
4. El resultado se tipa con la interfaz `CvAnalysis` (`lib/groq.ts`) y se
   renderiza en tabs: Habilidades, Fortalezas/Debilidades y Recomendaciones,
   más un panel de compatibilidad con anillo de puntaje y palabras clave
   faltantes cuando se proporcionó una oferta.

