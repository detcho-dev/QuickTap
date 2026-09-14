import { I18nProvider } from "@/lib/i18n";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { OrderForm } from "@/components/OrderForm";
import { Footer } from "@/components/Footer";

export default function App() {
  return (
    <I18nProvider>
      <div className="min-h-screen">
        <Nav />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <OrderForm />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
