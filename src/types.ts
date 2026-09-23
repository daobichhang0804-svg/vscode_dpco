export interface ProductSpecs {
  color?: string;
  material?: string;
  size?: string;
  type?: string;
  powder?: string;
  sulphur?: string;
  chlorine?: string;
  siliconeOil?: string;
  static?: string;
  length?: string;
  thickness?: string;
  surface?: string;
  packaging?: string;
  diameter?: string;
  tolerance?: string;
  [key: string]: any;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number; // 0 indicates "Liên hệ"
  image: string;
  brand: string;
  category: string;
  specs: ProductSpecs;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface SupabaseProduct {
  id: string;
  name: string;
  category?: string | null;
  brand?: string | null;
  color?: string | null;
  material?: string | null;
  size?: string | null;
  type?: string | null;
  powder?: string | null;
  sulphur?: string | null;
  chlorine?: string | null;
  silicone_oil?: string | null;
  static?: string | null;
  length?: string | null;
  thickness?: string | null;
  surface?: string | null;
  packaging?: string | null;
  sku?: string | null;
  image_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Certificate {
  id: string;
  title: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  public_url: string;
  created_at: string;
}

export interface SupabaseNitrileGlove {
  id: string;
  name: string;
  brand?: string | null;
  material?: string | null;
  color?: string | null;
  glove_class?: string | null;
  length_mm?: string | null;
  surface?: string | null;
  packaging?: string | null;
  image_url?: string | null;
  created_at?: string;
}

export interface SupabaseShaft {
  id: string;
  name: string;
  material?: string | null;
  diameter?: string | null;
  color?: string | null;
  image_url?: string | null;
  created_at?: string;
}

export type ProductGroupType = 'finger_cots' | 'nitrile_gloves' | 'shafts';

export interface ProductVariant {
  id?: string;
  product_group: ProductGroupType | string;
  product_id: string;
  option1_name?: string | null;
  option1_value?: string | null;
  option2_name?: string | null;
  option2_value?: string | null;
  option3_name?: string | null;
  option3_value?: string | null;
  image_url?: string | null;
  is_default?: boolean | null;
  price?: number | null;
  sku?: string | null;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

export interface VariantOptionGroup {
  name: string;
  key: 'option1' | 'option2' | 'option3';
  values: string[];
}

