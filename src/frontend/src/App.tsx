import { QuotesHome } from './pages/QuotesHome';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';

function App() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Subtle paper texture background */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/assets/generated/paper-texture.dim_1600x900.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
          <QuotesHome />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}

export default App;
