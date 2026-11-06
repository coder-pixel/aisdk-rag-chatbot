// /lib/chunking.ts
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 150, // small chunk taken for development and testing purposes, in production better to take large chunks of characters like around 500 characters
  chunkOverlap: 20, // chunks share chracters across boundary (helps in maintaining context between different chunks)
  separators: [" "], // describe how we want to break the text into small chunks
});

export async function chunkContent(content: string) {
  return await textSplitter?.splitText(content?.trim());
}
