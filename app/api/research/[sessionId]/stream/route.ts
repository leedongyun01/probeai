import { NextRequest } from "next/server";
import { graph } from "@/lib/agents/graph";
import { HumanMessage } from "@langchain/core/messages";

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const mode = searchParams.get("mode") as 'quick_scan' | 'deep_probe';
  
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const config = {
        configurable: { thread_id: sessionId },
      };

      try {
        // First, check if the state already has a report
        const currentState = await graph.getState(config);
        if (currentState.values?.report) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(currentState.values)}\n\n`));
          controller.enqueue(encoder.encode('data: {"status": "completed"}\n\n'));
          return; // The finally block will handle controller.close()
        }

        // Run the graph with the initial input from query params
        const input = query ? { 
          messages: [new HumanMessage(query)],
          mode: mode || 'quick_scan'
        } : null;

        const eventStream = await graph.stream(input, { 
          ...config, 
          streamMode: "values" 
        });

        for await (const chunk of eventStream) {
          if (chunk) {
            const data = `data: ${JSON.stringify(chunk)}\n\n`;
            controller.enqueue(encoder.encode(data));
          }
        }
        
        controller.enqueue(encoder.encode('data: {"status": "completed"}\n\n'));
      } catch (error) {
        console.error("Stream error:", error);
        const errorData = `data: {"error": "${(error as Error).message}"}\n\n`;
        controller.enqueue(encoder.encode(errorData));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no", // Disable buffering in Nginx/Vercel
    },
  });
}
