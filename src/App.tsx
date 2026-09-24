// The router dependency is provided at runtime by the application host.
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
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
import { useEffect } from 'react';

// Chuyển hướng link cũ dạng /product/xxx sang /products/xxx
function RedirectToNewProduct() {
  const { id } = useParams();
  return <Navigate to={`/products/${id}`} replace />;
}

export default function App() {

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = '/favicon.svg';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <LanguageProvider>
      <ProductsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="collections" element={<Navigate to="/collections/all" replace />} />
              <Route path="collections/:collectionSlug" element={<Catalog />} />
              {/* Link cũ /products (không có slug) -> chuyển sang trang tất cả sản phẩm */}
              <Route path="products" element={<Navigate to="/collections/all" replace />} />
              <Route path="products/:id" element={<ProductDetail />} />
              {/* Link cũ /product/:id -> tự chuyển sang /products/:id */}
              <Route path="product/:id" element={<RedirectToNewProduct />} />
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