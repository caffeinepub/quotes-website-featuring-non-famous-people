import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSubmitQuote } from '../../hooks/useQuotes';
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';

export function QuoteSubmitForm() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quoteText, setQuoteText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const { mutate: submitQuote, isPending } = useSubmitQuote();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!quoteText.trim() || !authorName.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    submitQuote(
      { text: quoteText.trim(), author: authorName.trim() },
      {
        onSuccess: () => {
          toast.success('Quote submitted successfully!');
          setQuoteText('');
          setAuthorName('');
          setIsExpanded(false);
        },
        onError: () => {
          toast.error('Failed to submit quote. Please try again.');
        },
      }
    );
  };

  if (!isExpanded) {
    return (
      <div className="flex justify-center">
        <Button
          onClick={() => setIsExpanded(true)}
          size="lg"
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Share a Quote
        </Button>
      </div>
    );
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Share a Quote</CardTitle>
        <CardDescription>
          Contribute wisdom from someone who isn't famous but should be heard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quote-text">Quote</Label>
            <Textarea
              id="quote-text"
              placeholder="Enter the quote here..."
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
              rows={4}
              className="resize-none"
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author-name">Author Name</Label>
            <Input
              id="author-name"
              placeholder="Who said this?"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              disabled={isPending}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={isPending || !quoteText.trim() || !authorName.trim()}
              className="flex-1"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Quote'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsExpanded(false);
                setQuoteText('');
                setAuthorName('');
              }}
              disabled={isPending}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
