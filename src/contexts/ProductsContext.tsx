import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product, SupabaseProduct, SupabaseNitrileGlove, SupabaseShaft } from '../types';
import { supabase } from '../lib/supabase';

const CACHE_KEY = 'suzuki_supabase_real_products_cache_v5';

function getInitialProducts(): Product[] {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    // ignore
  }
  return [];
}

export function mapSupabaseToProduct(sp: SupabaseProduct): Product {
  const fallbackImage = 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Spore%20Ordinary%202S2L%202.jpg';
  
  let image = sp.image_url?.trim() || '';
  if (image && !image.startsWith('http') && !image.startsWith('/') && !image.startsWith('blob:')) {
    image = `https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/${image}`;
  }
  if (!image) {
    // Map known Suzuki images if image_url in database was empty
    if (sp.name?.includes('Clean')) {
      image = 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Suzuki%20latex/Spore_Lite_II_Clean_1.jpg';
    } else if (sp.name?.includes('Ordinary')) {
      image = 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Spore%20Ordinary%202S2L%202.jpg';
    } else if (sp.name?.includes('EDEL')) {
      image = 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Suzuki%20latex/EDEL_EX_2.jpg';
    } else {
      image = fallbackImage;
    }
  }

  return {
    id: sp.id,
    sku: sp.sku || (sp.name ? sp.name.toUpperCase().replace(/[^A-Z0-9]/g, '-').slice(0, 10) : 'SP-ITEM'),
    name: sp.name,
    description: `${sp.name} - ${sp.category || 'Bao ngón cao su'} chất lượng cao từ ${sp.brand || 'Suzuki Latex'}.`,
    price: 0,
    image,
    brand: sp.brand || 'Suzuki Latex',
    category: sp.category || 'Bao ngón cao su',
    specs: {
      color: sp.color || undefined,
      material: sp.material || undefined,
      size: sp.size || undefined,
      type: sp.type || undefined,
      powder: sp.powder || undefined,
      sulphur: sp.sulphur || undefined,
      chlorine: sp.chlorine || undefined,
      siliconeOil: sp.silicone_oil || undefined,
      static: sp.static || undefined,
      length: sp.length || undefined,
      thickness: sp.thickness || undefined,
      surface: sp.surface || undefined,
      packaging: sp.packaging || undefined,
      diameter: sp.size || undefined,
      cleanroomClass: sp.size || undefined,
    }
  };
}

export function mapNitrileGloveToProduct(ng: SupabaseNitrileGlove): Product {
  const fallbackImage = 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Riverstone/12_%20Standard%20Glove%20Class%201000%20-%204002-copy-0.jpg';
  let image = ng.image_url?.trim() || fallbackImage;
  if (image && !image.startsWith('http') && !image.startsWith('/') && !image.startsWith('blob:')) {
    image = `https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/${image}`;
  }

  const cleanClass = ng.glove_class ? `Class ${ng.glove_class}` : 'Class 100';
  const lengthStr = ng.length_mm || '240 mm';

  return {
    id: ng.id,
    sku: `RS-${ng.glove_class ? 'C' + ng.glove_class : '100'}-${lengthStr.replace(/[^0-9]/g, '') || '240'}`,
    name: `${ng.name} (${cleanClass} - ${lengthStr})`,
    description: `Găng tay nitrile phòng sạch ${ng.name} thương hiệu Riverstone, đạt chuẩn phòng sạch ${cleanClass}, chiều dài ${lengthStr}, đóng gói ${ng.packaging || '1000 cái / thùng gói'}.`,
    price: 0,
    image,
    brand: ng.brand || 'Riverstone',
    category: 'Găng tay nitrile phòng sạch',
    specs: {
      color: ng.color || 'Trắng',
      material: ng.material || 'Cao su tổng hợp',
      size: cleanClass,
      cleanroomClass: cleanClass,
      length: lengthStr,
      surface: ng.surface || 'nhám ngón',
      packaging: ng.packaging || '1000 cái / thùng gói',
      powder: 'không bột (Powder-free)',
      static: 'Phòng sạch ESD Safe',
      type: 'Cuộn viền phòng sạch'
    }
  };
}

export function mapShaftToProduct(sh: SupabaseShaft): Product {
  const fallbackImage = 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80';
  let image = sh.image_url?.trim() || fallbackImage;
  if (image && !image.startsWith('http') && !image.startsWith('/') && !image.startsWith('blob:')) {
    image = `https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/${image}`;
  }

  const diameterStr = sh.diameter || 'Φ12';
  const derivedLength = sh.name.includes('150') ? '150 mm' : sh.name.includes('200') ? '200 mm' : sh.name.includes('250') ? '250 mm' : sh.name.includes('100') ? '100 mm' : undefined;

  return {
    id: sh.id,
    sku: `DP-TRUC-${sh.name.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()}`,
    name: `${sh.name}${sh.diameter ? ` (${sh.diameter})` : ''}`,
    description: `Trục động cơ chính xác ${sh.name}, đường kính ${diameterStr}, vật liệu ${sh.material || 'Thép không gỉ'}, gia công độ chính xác cao bởi Đức Phong.`,
    price: 0,
    image,
    brand: 'Đức Phong',
    category: 'Trục động cơ chính xác',
    specs: {
      material: sh.material || 'Thép không gỉ',
      diameter: diameterStr,
      size: diameterStr,
      color: sh.color || 'Bạc kim loại',
      length: derivedLength,
      surface: 'Mài bóng chính xác cao',
      packaging: 'Đóng gói chống sốc công nghiệp',
      static: 'Chống nhiễm từ'
    }
  };
}

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
  getProductById: (idOrSlug?: string | null) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(getInitialProducts);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Concurrently query products, products_nitrile_gloves, and products_shafts tables
      const [productsRes, nitrileRes, shaftsRes] = await Promise.all([
        supabase.from('products').select('*').order('name', { ascending: true }),
        supabase.from('products_nitrile_gloves').select('*').order('name', { ascending: true }),
        supabase.from('products_shafts').select('*').order('name', { ascending: true })
      ]);

      if (productsRes.error) {
        console.error('Supabase products fetch error:', productsRes.error);
      }
      if (nitrileRes.error) {
        console.error('Supabase products_nitrile_gloves fetch error:', nitrileRes.error);
      }
      if (shaftsRes.error) {
        console.error('Supabase products_shafts fetch error:', shaftsRes.error);
      }

      const combined: Product[] = [];

      if (productsRes.data && productsRes.data.length > 0) {
        combined.push(...(productsRes.data as SupabaseProduct[]).map(mapSupabaseToProduct));
      }

      if (nitrileRes.data && nitrileRes.data.length > 0) {
        combined.push(...(nitrileRes.data as SupabaseNitrileGlove[]).map(mapNitrileGloveToProduct));
      }

      if (shaftsRes.data && shaftsRes.data.length > 0) {
        combined.push(...(shaftsRes.data as SupabaseShaft[]).map(mapShaftToProduct));
      }

      setProducts(combined);
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(combined));
      } catch (e) {
        // ignore storage error
      }
    } catch (err: any) {
      console.error('Failed to fetch products from Supabase:', err);
      setError(err?.message || 'Lỗi tải dữ liệu sản phẩm từ Supabase');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();

    // Subscribe to realtime database changes on all 3 product tables
    const channel = supabase
      .channel('realtime_products_all_tables')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        (payload) => {
          console.log('[Supabase Realtime] Change detected in products:', payload);
          fetchProducts();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products_nitrile_gloves' },
        (payload) => {
          console.log('[Supabase Realtime] Change detected in products_nitrile_gloves:', payload);
          fetchProducts();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products_shafts' },
        (payload) => {
          console.log('[Supabase Realtime] Change detected in products_shafts:', payload);
          fetchProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchProducts]);

  const getProductById = useCallback((idOrSlug?: string | null): Product | undefined => {
    if (!idOrSlug) return products[0];
    const lower = idOrSlug.toLowerCase().trim();

    // 1. Direct match with id
    const byId = products.find(p => p.id.toLowerCase() === lower);
    if (byId) return byId;

    // 2. Match with SKU
    const bySku = products.find(p => p.sku && p.sku.toLowerCase() === lower);
    if (bySku) return bySku;

    // 3. Match with slugified name or exact name
    const bySlugOrName = products.find(p => {
      const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return slug === lower || p.name.toLowerCase() === lower;
    });
    if (bySlugOrName) return bySlugOrName;

    return products[0];
  }, [products]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        refreshProducts: fetchProducts,
        getProductById
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
