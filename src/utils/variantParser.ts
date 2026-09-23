import { Product, ProductVariant, VariantOptionGroup, ProductGroupType } from '../types';

/**
 * Determine the product group from product category or brand.
 */
export function getProductGroup(product: Product): ProductGroupType {
  const categoryLower = (product.category || '').toLowerCase();
  const nameLower = (product.name || '').toLowerCase();
  const brandLower = (product.brand || '').toLowerCase();

  if (
    categoryLower.includes('nitrile') || 
    categoryLower.includes('găng tay') || 
    nameLower.includes('nitrile') || 
    brandLower.includes('riverstone')
  ) {
    return 'nitrile_gloves';
  }

  if (
    categoryLower.includes('trục') || 
    categoryLower.includes('shaft') || 
    nameLower.includes('trục') || 
    brandLower.includes('đức phong')
  ) {
    return 'shafts';
  }

  // Default to finger_cots (Bao ngón tay cao su / Suzuki Latex)
  return 'finger_cots';
}

/**
 * Parses grouped attribute strings into individual option values:
 * - "XS 13.5mm - S 15mm - SM 16.5mm - M 18mm - L 21mm" -> ["XS 13.5mm", "S 15mm", "SM 16.5mm", "M 18mm", "L 21mm"]
 * - "Cut | Shortcut | Roll | Unroll" -> ["Cut", "Shortcut", "Roll", "Unroll"]
 * - "Class 100, Class 1000" -> ["Class 100", "Class 1000"]
 */
export function parseAttributeValues(raw?: string | null): string[] {
  if (!raw) return [];
  const trimmed = raw.trim();
  if (!trimmed) return [];

  // 1. If contains " - " (dash surrounded by spaces, or common dimension strings)
  if (trimmed.includes(' - ') || /^[A-Z0-9\s.]+mm\s*-\s*/i.test(trimmed)) {
    const items = trimmed.split(/\s*-\s*/).map(s => s.trim()).filter(Boolean);
    if (items.length > 1) return Array.from(new Set(items));
  }

  // 2. If contains "|" pipe symbol
  if (trimmed.includes('|')) {
    const items = trimmed.split(/\s*\|\s*/).map(s => s.trim()).filter(Boolean);
    if (items.length > 1) return Array.from(new Set(items));
  }

  // 3. If contains comma ","
  if (trimmed.includes(',')) {
    const items = trimmed.split(/\s*,\s*/).map(s => s.trim()).filter(Boolean);
    if (items.length > 1) return Array.from(new Set(items));
  }

  // 4. If contains slash " / "
  if (trimmed.includes(' / ')) {
    const items = trimmed.split(/\s*\/\s*/).map(s => s.trim()).filter(Boolean);
    if (items.length > 1) return Array.from(new Set(items));
  }

  return [trimmed];
}

/**
 * Known fallback images for variants (from Supabase Storage and official assets)
 */
const KNOWN_VARIANT_IMAGES: Record<string, string> = {
  // Spore Ordinary
  'spore-ordinary-s': 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Suzuki%20latex/Spore_Ordinary_2S2L_2.jpg',
  'spore-ordinary-m': 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Suzuki%20latex/Spore_Ordinary_2M3L_1.jpg',
  'spore-ordinary-l': 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Suzuki%20latex/Spore_Ordinary_2M3L_1.jpg',
  
  // Spore Lite II Clean
  'spore-lite-ii-clean-s': 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Suzuki%20latex/Spore_Lite_II_Clean_VS2LC_1.jpg',
  'spore-lite-ii-clean-m': 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Suzuki%20latex/Spore_Lite_II_Clean_VM2LC_5.jpg',
  'spore-lite-ii-clean-l': 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Suzuki%20latex/Spore_Lite_II_Clean_VM2LC_6.jpg',

  // Spore Lite II Ordinary
  'spore-lite-ii-ordinary-s': 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Suzuki%20latex/Spore_Lite_II_Ordinary_VS2L_1.jpg',
  'spore-lite-ii-ordinary-m': 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Suzuki%20latex/Spore_Lite_II_Ordinary_VM2L_3.jpg',
  'spore-lite-ii-ordinary-l': 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Suzuki%20latex/Spore_Lite_II_Ordinary_VM2L_4.jpg',

  // Spore Lite II Chlorinated
  'spore-lite-ii-chlorinated-s': 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Suzuki%20latex/Spore_Lite_II_Chlorinated_VS2LP_1.jpg',
  'spore-lite-ii-chlorinated-m': 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Suzuki%20latex/Spore_Lite_II_Chlorinated_VM3LP_1.jpg',
  'spore-lite-ii-chlorinated-l': 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Suzuki%20latex/Spore_Lite_II_Chlorinated_VS3LP_1.jpg',

  // Spore Black Chlorinated Shortcut
  'spore-black-chlorinated-shortcut': 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Suzuki%20latex/Spore_Black_Chlorinated_Short_Cut_1.jpg',
  'spore-black-chlorinated-cut': 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Suzuki%20latex/Spore_Black_Chlorinated_Short_Cut_1.jpg',

  // Mask series
  'mask-black': 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Suzuki%20latex/Mask_Black_1.jpg',
  'mask-orange': 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Suzuki%20latex/Mask_Orange_2.jpg',

  // EDEL
  'edel-ex': 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Suzuki%20latex/EDEL_EX_2.jpg',
  'shield': 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Suzuki%20latex/Shield_2.jpg',

  // Nitrile Gloves Class 100 / 1000
  'nitrile-class-100': 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Riverstone/12_%20Standard%20Glove%20Class%201000%20-%204001%20-%201.jpg',
  'nitrile-class-1000': 'https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/Riverstone/12_%20Standard%20Glove%20Class%201000%20-%204002-copy-0.jpg',

  // Shafts
  'shaft-blue': 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
  'shaft-white': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
};

/**
 * Builds the option groups for a product:
 * 1. Checks if variants exist in `product_variants` table for this product.
 * 2. If yes, constructs groups from option1_name, option2_name, option3_name.
 * 3. If no, constructs groups dynamically from product specifications and product group.
 */
export function buildProductOptionGroups(
  product: Product, 
  allVariants: ProductVariant[]
): VariantOptionGroup[] {
  const group = getProductGroup(product);
  
  // 1. Check if variants in DB exist for this product
  const productVariants = allVariants.filter(
    v => v.product_id === product.id || (v.sku && product.sku && v.sku === product.sku)
  );

  if (productVariants.length > 0) {
    const groups: VariantOptionGroup[] = [];

    // Group 1
    const opt1Name = productVariants[0].option1_name || 'Loại (Option)';
    const opt1Values = Array.from(
      new Set(productVariants.map(v => v.option1_value).filter(Boolean) as string[])
    );
    if (opt1Values.length > 0) {
      groups.push({ name: opt1Name, key: 'option1', values: opt1Values });
    }

    // Group 2
    const opt2Name = productVariants[0].option2_name || 'Kích thước (Dimensions)';
    const opt2Values = Array.from(
      new Set(productVariants.map(v => v.option2_value).filter(Boolean) as string[])
    );
    if (opt2Values.length > 0) {
      groups.push({ name: opt2Name, key: 'option2', values: opt2Values });
    }

    // Group 3
    if (productVariants[0].option3_name) {
      const opt3Name = productVariants[0].option3_name;
      const opt3Values = Array.from(
        new Set(productVariants.map(v => v.option3_value).filter(Boolean) as string[])
      );
      if (opt3Values.length > 0) {
        groups.push({ name: opt3Name, key: 'option3', values: opt3Values });
      }
    }

    if (groups.length > 0) {
      return groups;
    }
  }

  // 2. Dynamic generation based on Product Group specifications
  if (group === 'finger_cots') {
    const groups: VariantOptionGroup[] = [];

    // Group 1: OPTION TYPE (Loại)
    const typeValues = parseAttributeValues(product.specs.type || 'Cut | Roll | Unroll');
    if (typeValues.length > 0) {
      groups.push({
        name: 'OPTION TYPE (Loại)',
        key: 'option1',
        values: typeValues
      });
    }

    // Group 2: DIMENSIONS (Kích thước)
    const sizeRaw = product.specs.size || product.specs.diameter || 'S 15mm - M 18mm - L 21mm';
    const sizeValues = parseAttributeValues(sizeRaw);
    if (sizeValues.length > 0) {
      groups.push({
        name: 'DIMENSIONS (Kích thước)',
        key: 'option2',
        values: sizeValues
      });
    }

    return groups;
  }

  if (group === 'nitrile_gloves') {
    const groups: VariantOptionGroup[] = [];

    // Group 1: Class (Cấp độ sạch)
    let classValues = parseAttributeValues(product.specs.cleanroomClass || product.specs.size);
    if (classValues.length === 0 || classValues.every(c => !c.includes('100') && !c.includes('1000'))) {
      classValues = ['Class 100', 'Class 1000'];
    }
    groups.push({
      name: 'Class (Cấp độ sạch)',
      key: 'option1',
      values: classValues
    });

    // Group 2: Màu sắc (Color)
    const colorValues = product.specs.color ? [product.specs.color] : ['Trắng', 'Xanh'];
    groups.push({
      name: 'Màu sắc',
      key: 'option2',
      values: colorValues
    });

    // Group 3: Chiều dài (Length)
    if (product.specs.length) {
      const lenValues = parseAttributeValues(product.specs.length);
      if (lenValues.length > 0) {
        groups.push({
          name: 'Chiều dài',
          key: 'option3',
          values: lenValues
        });
      }
    }

    return groups;
  }

  if (group === 'shafts') {
    const groups: VariantOptionGroup[] = [];

    // Group 1: Đường kính (Diameter)
    let diaValues = parseAttributeValues(product.specs.diameter || 'Φ12');
    if (diaValues.length <= 1) {
      // Allow selecting between available shaft diameters
      diaValues = Array.from(new Set([...diaValues, 'Φ12', 'Φ14', 'Φ15']));
    }
    groups.push({
      name: 'Đường kính',
      key: 'option1',
      values: diaValues
    });

    // Group 2: Màu sắc / Bề mặt
    const colorValues = product.specs.color 
      ? Array.from(new Set([product.specs.color, 'Bạc kim loại']))
      : ['Xanh', 'Trắng', 'Bạc kim loại'];
    groups.push({
      name: 'Màu sắc',
      key: 'option2',
      values: colorValues
    });

    return groups;
  }

  return [];
}

/**
 * Finds a matching variant from the variants list.
 */
export function findMatchingVariant(
  variants: ProductVariant[],
  productId: string,
  selection: { option1?: string; option2?: string; option3?: string }
): ProductVariant | undefined {
  return variants.find(v => {
    if (v.product_id !== productId) return false;

    if (selection.option1 && v.option1_value && v.option1_value.toLowerCase() !== selection.option1.toLowerCase()) {
      return false;
    }
    if (selection.option2 && v.option2_value && v.option2_value.toLowerCase() !== selection.option2.toLowerCase()) {
      return false;
    }
    if (selection.option3 && v.option3_value && v.option3_value.toLowerCase() !== selection.option3.toLowerCase()) {
      return false;
    }

    return true;
  });
}

/**
 * Resolves the variant image when options are selected.
 * Falls back to default product image or known assets if no variant image row exists.
 */
export function resolveVariantImage(
  product: Product,
  matchingVariant?: ProductVariant,
  selection?: { option1?: string; option2?: string; option3?: string }
): string {
  // 1. If matching variant in DB has an image_url, use it!
  if (matchingVariant?.image_url && matchingVariant.image_url.trim()) {
    let url = matchingVariant.image_url.trim();
    if (!url.startsWith('http') && !url.startsWith('/') && !url.startsWith('blob:')) {
      url = `https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/${url}`;
    }
    return url;
  }

  // 2. Intelligent fallback to mapped variant image from Supabase Storage / PDF
  const nameLower = product.name.toLowerCase();
  const opt1 = (selection?.option1 || '').toLowerCase();
  const opt2 = (selection?.option2 || '').toLowerCase();

  // Spore Ordinary sizes
  if (nameLower.includes('spore ordinary')) {
    if (opt2.includes('s ') || opt2.startsWith('s')) return KNOWN_VARIANT_IMAGES['spore-ordinary-s'];
    if (opt2.includes('m ') || opt2.startsWith('m')) return KNOWN_VARIANT_IMAGES['spore-ordinary-m'];
    if (opt2.includes('l ') || opt2.startsWith('l')) return KNOWN_VARIANT_IMAGES['spore-ordinary-l'];
  }

  // Spore Lite II Clean
  if (nameLower.includes('spore lite ii clean')) {
    if (opt2.includes('s ') || opt2.startsWith('s')) return KNOWN_VARIANT_IMAGES['spore-lite-ii-clean-s'];
    if (opt2.includes('m ') || opt2.startsWith('m')) return KNOWN_VARIANT_IMAGES['spore-lite-ii-clean-m'];
    if (opt2.includes('l ') || opt2.startsWith('l')) return KNOWN_VARIANT_IMAGES['spore-lite-ii-clean-l'];
  }

  // Spore Lite II Ordinary
  if (nameLower.includes('spore lite ii ordinary')) {
    if (opt2.includes('s ') || opt2.startsWith('s')) return KNOWN_VARIANT_IMAGES['spore-lite-ii-ordinary-s'];
    if (opt2.includes('m ') || opt2.startsWith('m')) return KNOWN_VARIANT_IMAGES['spore-lite-ii-ordinary-m'];
    if (opt2.includes('l ') || opt2.startsWith('l')) return KNOWN_VARIANT_IMAGES['spore-lite-ii-ordinary-l'];
  }

  // Spore Lite II Chlorinated
  if (nameLower.includes('spore lite ii chlorinated')) {
    if (opt2.includes('s ') || opt2.startsWith('s')) return KNOWN_VARIANT_IMAGES['spore-lite-ii-chlorinated-s'];
    if (opt2.includes('m ') || opt2.startsWith('m')) return KNOWN_VARIANT_IMAGES['spore-lite-ii-chlorinated-m'];
    if (opt2.includes('l ') || opt2.startsWith('l')) return KNOWN_VARIANT_IMAGES['spore-lite-ii-chlorinated-l'];
  }

  // Spore Black Chlorinated Shortcut
  if (nameLower.includes('spore black chlorinated') && opt1.includes('shortcut')) {
    return KNOWN_VARIANT_IMAGES['spore-black-chlorinated-shortcut'];
  }

  // Mask series
  if (nameLower.includes('mask black')) return KNOWN_VARIANT_IMAGES['mask-black'];
  if (nameLower.includes('mask orange')) return KNOWN_VARIANT_IMAGES['mask-orange'];
  if (nameLower.includes('edel ex')) return KNOWN_VARIANT_IMAGES['edel-ex'];
  if (nameLower.includes('shield')) return KNOWN_VARIANT_IMAGES['shield'];

  // Nitrile Gloves
  if (nameLower.includes('nitrile') || getProductGroup(product) === 'nitrile_gloves') {
    if (opt1.includes('1000')) return KNOWN_VARIANT_IMAGES['nitrile-class-1000'];
    if (opt1.includes('100')) return KNOWN_VARIANT_IMAGES['nitrile-class-100'];
  }

  // Shafts
  if (getProductGroup(product) === 'shafts') {
    if (opt2.includes('trắng') || opt2.includes('bạc')) return KNOWN_VARIANT_IMAGES['shaft-white'];
    if (opt2.includes('xanh')) return KNOWN_VARIANT_IMAGES['shaft-blue'];
  }

  // 3. Fallback to product default image
  return product.image;
}
