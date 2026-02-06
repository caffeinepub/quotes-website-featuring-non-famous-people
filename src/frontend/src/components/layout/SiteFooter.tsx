import { Heart } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-background/80 backdrop-blur-sm mt-16">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-1.5">
          © 2026. Built with <Heart className="w-3.5 h-3.5 fill-current text-rose-500" /> using{' '}
          <a 
            href="https://caffeine.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
