import { PDFParse } from "pdf-parse"

export async function extractTextFromFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())
  const name = file.name.toLowerCase()

  if (name.endsWith(".pdf")) {
    const parser = new PDFParse({
      data: buffer,
    })

    try {
      const result = await parser.getText()
      return result.text
    } finally {
      await parser.destroy()
    }
  }

  if (name.endsWith(".docx")) {
    const mammoth = await import("mammoth")

    const result = await mammoth.extractRawText({
      buffer,
    })

    return result.value
  }

  if (name.endsWith(".txt")) {
    return buffer.toString("utf-8")
  }

  throw new Error("Formato no soportado. Usa PDF, DOCX o TXT.")
}
