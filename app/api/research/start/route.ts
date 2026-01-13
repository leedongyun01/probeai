import { NextRequest, NextResponse } from "next/server";
import { graph } from "@/lib/agents/graph";
import { createNewSessionId } from "@/lib/session";
import { HumanMessage } from "@langchain/core/messages";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { query, mode } = await req.json();
    const sessionId = await createNewSessionId();

    // Just initialize the state without waiting for full execution
    const config = {
      configurable: { thread_id: sessionId },
    };

    // We only update the state with the initial message
    await graph.updateState(config, {
      messages: [new HumanMessage(query)],
      mode: mode || 'quick_scan',
    });

    return NextResponse.json({
      sessionId,
      status: 'started',
    });
  } catch (error) {
    console.error("Research start API error:", error);
    // Log the full error stack for debugging
    if ((error as Error).stack) {
      console.error((error as Error).stack);
    }
    return NextResponse.json({ error: (error as Error).message, stack: (error as Error).stack }, { status: 500 });
  }
}
