import { useState } from 'react';
import { QuoteFeed } from '../components/quotes/QuoteFeed';
import { QuotesToolbar } from '../components/quotes/QuotesToolbar';
import { QuoteSubmitForm } from '../components/quotes/QuoteSubmitForm';
import { useQuotes } from '../hooks/useQuotes';

export function QuotesHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const { data: quotes, isLoading, error } = useQuotes();

  // Client-side filtering and sorting
  const filteredAndSortedQuotes = quotes
    ? quotes
        .filter((quote) => {
          if (!searchQuery.trim()) return true;
          const query = searchQuery.toLowerCase();
          return (
            quote.text.toLowerCase().includes(query) ||
            quote.author.toLowerCase().includes(query)
          );
        })
        .sort((a, b) => {
          // Since backend doesn't provide timestamps, we'll reverse the array
          // assuming newer quotes are added at the end
          return sortOrder === 'newest' ? -1 : 1;
        })
    : [];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-3 py-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tight">
          Wisdom from Everyday People
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A collection of profound thoughts and insights from non-famous individuals who see the world differently.
        </p>
      </div>

      {/* Submit Form */}
      <QuoteSubmitForm />

      {/* Toolbar */}
      <QuotesToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      {/* Feed */}
      <QuoteFeed
        quotes={filteredAndSortedQuotes}
        isLoading={isLoading}
        error={error}
        searchQuery={searchQuery}
      />
    </div>
  );
}
