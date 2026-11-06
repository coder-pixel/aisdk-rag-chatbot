import { convertToModelMessages, streamText, UIMessage } from "ai";
import { groq } from "@ai-sdk/groq";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: groq("openai/gpt-oss-120b"),
      messages: [...(await convertToModelMessages(messages))],
      //   tools,
      //   system: `You are a helpful assistant with access to a knowledge base.
      //         When users ask questions, search the knowledge base for relevant information.
      //         Always search before answering if the question might relate to uploaded documents.
      //         Base your answers on the search results when available. Give concise answers that correctly answer what the user is asking for. Do not flood them with all the information from the search results.`,
      //   stopWhen: stepCountIs(2),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}
