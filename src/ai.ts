import { OpenAI } from "openai";
import { ChatCompletionTool } from "openai/resources/chat/completions";
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function askAI(content: string) {
    const tools: ChatCompletionTool[] = [    {
      type: "function",
      function: {
        name: "summarize",
        description: "Summarizes text",
        parameters: {
          type: "object",
          properties: {
            text: { type: "string" }
          },
          required: ["text"]
        }
      }
    },
    {
      type: "function",
      function: {
        name: "translate",
        description: "Translate text",
        parameters: {
          type: "object",
          properties: {
            text: { type: "string" },
            targetLang: { type: "string" }
          },
          required: ["text", "targetLang"]
        }
      }
    }
  ];

  const chat = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content }],
    tools,
    tool_choice: "auto"
  });

  const toolCall = chat.choices[0].message.tool_calls?.[0];

  if (!toolCall) {
    return chat.choices[0].message.content || "Sorry, I couldn't help with that.";
  }

  const { name, arguments: args } = toolCall.function;
  const parsedArgs = typeof args === "string" ? JSON.parse(args) : args;

  if (name === "summarize") {
    return `Summary: ${parsedArgs.text.slice(0, 30)}...`;
  }

  if (name === "translate") {
    return `(${parsedArgs.targetLang}) ${parsedArgs.text}`;
  }

  return "Unhandled tool.";
}
