import { QuoteCard } from './QuoteCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, BookOpen } from 'lucide-react';
import type { Quote } from '../../backend';

interface QuoteFeedProps {
  quotes: Quote[];
  isLoading: boolean;
  error: Error | null;
  searchQuery: string;
}

export function QuoteFeed({ quotes, isLoading, error, searchQuery }: QuoteFeedProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 border border-border rounded-lg space-y-3">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load quotes. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (quotes.length === 0) {
    return (
      <div className="text-center py-16 space-y-4">
        <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/50" />
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-foreground">
            {searchQuery ? 'No quotes found' : 'No quotes yet'}
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {searchQuery
              ? 'Try adjusting your search terms to find what you\'re looking for.'
              : 'Be the first to share wisdom from an everyday person.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {quotes.map((quote, index) => (
        <QuoteCard key={`${quote.author}-${index}`} quote={quote} />
      ))}
    </div>
  );
}
