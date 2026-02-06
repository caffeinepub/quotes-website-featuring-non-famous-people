import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Quote } from '../backend';

const QUOTES_QUERY_KEY = ['quotes'];

export function useQuotes() {
  const { actor, isFetching } = useActor();

  return useQuery<Quote[]>({
    queryKey: QUOTES_QUERY_KEY,
    queryFn: async () => {
      if (!actor) return [];
      // Using getQuotesSortedByAuthor as the backend doesn't have a general "get all" method
      return actor.getQuotesSortedByAuthor();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitQuote() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ text, author }: { text: string; author: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.addQuote(author, text);
    },
    onSuccess: () => {
      // Invalidate and refetch quotes after successful submission
      queryClient.invalidateQueries({ queryKey: QUOTES_QUERY_KEY });
    },
  });
}
