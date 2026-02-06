import { Quote as QuoteIcon } from 'lucide-react';
import type { Quote } from '../../backend';

interface QuoteCardProps {
  quote: Quote;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <article className="group relative p-6 border border-border rounded-lg bg-card hover:shadow-md transition-all duration-200 hover:border-border/80">
      <div className="flex gap-4">
        <div className="flex-shrink-0 pt-1">
          <QuoteIcon className="w-6 h-6 text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors" />
        </div>
        <div className="flex-1 space-y-3">
          <blockquote className="text-lg leading-relaxed text-foreground font-serif">
            "{quote.text}"
          </blockquote>
          <footer className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">—</span>
            <cite className="text-sm font-medium text-muted-foreground not-italic">
              {quote.author}
            </cite>
          </footer>
        </div>
      </div>
    </article>
  );
}
