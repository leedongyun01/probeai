import { NextRequest, NextResponse } from "next/server";
import { graph } from "@/lib/agents/graph";

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;

  try {
    const config = {
      configurable: { thread_id: sessionId },
    };

    const state = await graph.getState(config);

    if (!state.values) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(state.values);
  } catch (error) {
    console.error("Fetch session error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
