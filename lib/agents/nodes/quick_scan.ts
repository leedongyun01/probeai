import { ResearchState } from "../state";
import { search } from "@/lib/services/tavily";
import { SourceCitation, SearchResult } from "@/lib/schema/research";

export async function quickScanNode(state: ResearchState) {
  const lastMessage = state.messages[state.messages.length - 1];
  const query = typeof lastMessage.content === 'string' ? lastMessage.content : '';

  const searchResults = await search(query, {
    searchDepth: "basic",
    maxResults: 3,
    includeAnswer: true,
  });

  const newCitations: SourceCitation[] = searchResults.results.map((r: SearchResult) => ({
    id: Buffer.from(r.url).toString('base64'),
    url: r.url,
    title: r.title,
    snippet: r.content,
    accessDate: new Date().toISOString(),
  }));

  return {
    results: searchResults.results,
    report: searchResults.answer || "No summary available.",
    citations: newCitations,
  };
}
