import { describe, it, expect, vi, beforeEach } from 'vitest';
import { quickScanNode } from '@/lib/agents/nodes/quick_scan';
import { ResearchState } from '@/lib/agents/state';
import { HumanMessage } from '@langchain/core/messages';

// Mock the tavily service
vi.mock('@/lib/services/tavily', () => ({
  search: vi.fn(),
}));

import { search } from '@/lib/services/tavily';

describe('quickScanNode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should perform a basic search and update state with results', async () => {
    // Setup mock return value
    const mockSearchResults = {
      results: [
        { title: 'Test 1', url: 'http://test1.com', content: 'Content 1' },
        { title: 'Test 2', url: 'http://test2.com', content: 'Content 2' },
      ],
      answer: 'This is a summary.',
    };
    (search as any).mockResolvedValue(mockSearchResults);

    // Setup input state
    const initialState: Partial<ResearchState> = {
      messages: [new HumanMessage("Test query")],
      mode: 'quick_scan',
    };

    // Execute node
    const result = await quickScanNode(initialState as ResearchState);

    // Assertions
    expect(search).toHaveBeenCalledWith("Test query", expect.objectContaining({
      searchDepth: "basic",
      includeAnswer: true,
    }));

    expect(result.results).toEqual(mockSearchResults.results);
    expect(result.report).toBe('This is a summary.');
    expect(result.citations).toHaveLength(2);
    expect(result.citations?.[0].url).toBe('http://test1.com');
  });

  it('should handle empty search results gracefully', async () => {
     const mockSearchResults = {
      results: [],
      answer: null,
    };
    (search as any).mockResolvedValue(mockSearchResults);

    const initialState: Partial<ResearchState> = {
      messages: [new HumanMessage("Unknown query")],
      mode: 'quick_scan',
    };

    const result = await quickScanNode(initialState as ResearchState);

    expect(result.report).toBe('No summary available.');
    expect(result.citations).toHaveLength(0);
  });
});
