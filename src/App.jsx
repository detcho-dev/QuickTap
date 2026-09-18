import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { I18nProvider } from "./lib/i18n";

import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { OrderForm } from "./components/OrderForm";
import { Footer } from "./components/Footer";
import { FAQ } from "./components/FAQ";
import { About } from "./components/About";

import UserPage from "./sites/UserPage";
import CompanyPage from "./sites/CompanyPage";

function Layout() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <About />
      <OrderForm />
      <FAQ />
    </>
  );
}

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <h1>404</h1>
      <p>404 Page Not Found</p>
      <a href="/" style={(cursor = Pointer)}>
        Back to Home
      </a>
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          {/* صفحات فيها Nav + Footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
          </Route>

          {/* صفحات البروفايل — من غير Nav/Footer عشان تبقى نضيفة */}
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/company/:id" element={<CompanyPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
}
