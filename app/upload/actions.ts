// src/app/upload/actions.ts
"use server";

import { PDFParse } from "pdf-parse"; // Standard v2 import syntax
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";
import { chunkContent } from "@/lib/chunking";

export async function processPdfFile(formData: FormData) {
  try {
    const file = formData.get("pdf") as File;

    // Convert File to Buffer and extract text

    // Convert the browser file into a Uint8Array buffer for the parser
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Initialize the parser and retrieve the text
    const parser = new PDFParse({ data: buffer });
    const data = await parser.getText();
    // const data = await pdf(buffer);

    if (!data.text || data.text.trim().length === 0) {
      return {
        success: false,
        error: "No text found in PDF",
      };
    }

    // Chunk the text
    const chunks = await chunkContent(data.text);

    // Generate embeddings
    const embeddings = await generateEmbeddings(chunks);

    // Store in database
    const records = chunks.map((chunk, index) => ({
      content: chunk,
      embedding: embeddings[index],
    }));

    await db.insert(documents).values(records);

    return {
      success: true,
      message: `Created ${records.length} searchable chunks`,
    };
  } catch (error) {
    console.error("PDF processing error:", error);
    return {
      success: false,
      error: "Failed to process PDF",
    };
  }
}
