export function SiteHeader() {
  return (
    <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
        <img 
          src="/assets/generated/quotes-logo.dim_512x512.png" 
          alt="Quotes Logo" 
          className="w-10 h-10 object-contain"
        />
        <div>
          <h1 className="text-xl font-serif font-semibold text-foreground">
            Everyday Wisdom
          </h1>
          <p className="text-xs text-muted-foreground">
            Quotes from non-famous people
          </p>
        </div>
      </div>
    </header>
  );
}
