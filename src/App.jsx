import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import { I18nProvider } from "./lib/i18n";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { OrderForm } from "./components/OrderForm";
import { Footer } from "./components/Footer";
import { FAQ } from "./components/FAQ";
import { About } from "./components/About";

import UserPage from "./site/UserPage";
import CompanyPage from "./site/CompanyPage";
import AdminLogin from "./site/AdminLogin";
import AdminDashboard from "./site/AdminDashboard";
import AdminRoute from "./components/AdminRoute";

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
    <div className="notfound-page">
      <h1 className="notfound-code">404</h1>
      <p className="notfound-text">Page not found</p>
      <Link to="/" className="notfound-btn">
        ← Back to Home
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
          </Route>

          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/company/:id" element={<CompanyPage />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
}
