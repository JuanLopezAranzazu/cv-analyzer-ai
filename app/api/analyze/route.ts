import { NextRequest, NextResponse } from "next/server";
import { extractTextFromFile } from "@/lib/extract-text";
import { analyzeCv } from "@/lib/groq";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("cv") as File | null;
    const jobDescription = (formData.get("jobDescription") as string | null) ?? "";

    if (!file) {
      return NextResponse.json({ error: "No se recibió ningún archivo." }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Falta configurar GROQ_API_KEY en el servidor (.env.local)." },
        { status: 500 }
      );
    }

    const cvText = await extractTextFromFile(file);

    if (!cvText || cvText.trim().length < 40) {
      return NextResponse.json(
        { error: "No se pudo extraer texto legible del archivo." },
        { status: 422 }
      );
    }

    const analysis = await analyzeCv(cvText, jobDescription.trim() || undefined);

    return NextResponse.json({ analysis });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
