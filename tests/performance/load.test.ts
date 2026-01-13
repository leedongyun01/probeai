import { describe, it, expect, vi } from 'vitest';
import { graph } from '@/lib/agents/graph';
import { HumanMessage } from '@langchain/core/messages';
import { ResearchState } from '@/lib/agents/state';

// Mock the nodes to avoid actual API calls during load test
vi.mock('@/lib/agents/nodes/quick_scan', () => ({
  quickScanNode: vi.fn(async (state) => ({
    report: "Fast report",
    citations: [],
    results: []
  }))
}));

// Mock checkpointer to avoid FS issues during parallel tests if necessary
vi.mock('@/lib/agents/checkpoint', () => ({
  getCheckpointer: () => ({
    get: vi.fn(),
    put: vi.fn(),
    list: vi.fn(),
  })
}));

describe('Performance / Concurrency', () => {
  it('should handle multiple concurrent graph executions', async () => {
    const CONCURRENCY = 10;
    const start = Date.now();
    
    const promises = Array.from({ length: CONCURRENCY }).map(async (_, i) => {
      const state: Partial<ResearchState> = {
        messages: [new HumanMessage(`Query ${i}`)],
        mode: 'quick_scan',
      };
      const config = { configurable: { thread_id: `bench-${i}` } };
      return graph.invoke(state, config);
    });

    const results = await Promise.all(promises);
    const duration = Date.now() - start;

    expect(results).toHaveLength(CONCURRENCY);
    console.log(`Executed ${CONCURRENCY} concurrent quick scans in ${duration}ms`);
    
    // Simple assertion that it didn't take excessively long (overhead check)
    expect(duration).toBeLessThan(5000); 
  });
});
