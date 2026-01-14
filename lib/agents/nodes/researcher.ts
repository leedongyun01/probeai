import { ResearchState } from "../state";
import { search } from "@/lib/services/tavily";
import { SourceCitation } from "@/lib/schema/research";

export async function researcherNode(state: ResearchState) {
  let query = "";
  if (state.plan && state.plan.length > 0 && state.currentStep !== undefined) {
    query = state.plan[state.currentStep];
  } else {
    const lastMessage = state.messages[state.messages.length - 1];
    query = typeof lastMessage.content === 'string' ? lastMessage.content : '';
  }
  
  const searchResults = await search(query, {
    searchDepth: state.mode === 'deep_probe' ? 'advanced' : 'basic',
    maxResults: 5,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newCitations: SourceCitation[] = searchResults.results.map((r: any) => ({
    id: Buffer.from(r.url).toString('base64'),
    url: r.url,
    title: r.title,
    snippet: r.content,
    accessDate: new Date().toISOString(),
  }));

  const existingCitations = state.citations || [];
  const allCitations = [...existingCitations];
  
  newCitations.forEach(nc => {
    if (!allCitations.find(c => c.url === nc.url)) {
      allCitations.push(nc);
    }
  });

  return {
    results: [...(state.results || []), ...searchResults.results],
    citations: allCitations,
    currentStep: (state.currentStep ?? 0) + 1,
  };
}
