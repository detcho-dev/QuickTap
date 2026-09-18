import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "./lib/i18n";

// الصفحة الرئيسية
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { OrderForm } from "./components/OrderForm";
import { Footer } from "./components/Footer";
import { FAQ } from "./components/FAQ";
import { About } from "./components/About";

// الصفحات الفرعية
import UserPage from "./sites/UserPage";
import CompanyPage from "./sites/CompanyPage";

// الصفحة الرئيسية ككومبوننت منفصل
function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <About />
        <OrderForm />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

// صفحة 404
function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <h1>404</h1>
      <p>الصفحة غير موجودة</p>
      <a href="/">الرجوع للرئيسية</a>
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/company/:id" element={<CompanyPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </I18nProvider>
  );
}
