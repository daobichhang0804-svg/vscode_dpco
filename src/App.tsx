// The router dependency is provided at runtime by the application host.
// @ts-expect-error The local type checker may not have the dependency's type declarations.
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Compare from './pages/Compare';
import AdminCertificates from './pages/AdminCertificates';
import { LanguageProvider } from './contexts/LanguageContext';
import { ProductsProvider } from './contexts/ProductsContext';

export default function App() {
  return (
    <LanguageProvider>
      <ProductsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Catalog />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="compare" element={<Compare />} />
              <Route path="blog" element={<Blog />} />
              <Route path="contact" element={<Contact />} />
              <Route path="admin" element={<AdminCertificates />} />
              <Route path="admin/certificates" element={<AdminCertificates />} />
              <Route path="certificates" element={<Navigate to="/#certificates" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProductsProvider>
    </LanguageProvider>
  );
}


