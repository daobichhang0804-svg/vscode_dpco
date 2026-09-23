import { CategoryDefinition, CategoryAttribute } from '../types/filter';

/**
 * Database-Ready Category & Attribute Schema.
 * Conceptually mirrors future Supabase tables:
 * - categories
 * - category_attributes
 * - attribute_options
 */

export const CATEGORY_DEFINITIONS: CategoryDefinition[] = [
  {
    id: 'cleanroom-nitrile-gloves',
    name: 'Găng tay nitrile phòng sạch',
    slug: 'gang-tay-nitrile-phong-sach',
    aliases: ['gang tay nitrile', 'găng tay phòng sạch', 'găng tay nitrile phòng sạch'],
    description: 'Găng tay phòng sạch chuyên dụng trong sản xuất bán dẫn, vi điện tử và y tế.',
    displayOrder: 1,
  },
  {
    id: 'rubber-finger-cots',
    name: 'Bao ngón tay cao su',
    slug: 'bao-ngon-tay-cao-su',
    aliases: [
      'bao ngón cao su',
      'bao ngon cao su',
      'bao ngón tay cao su',
      'bao ngon tay cao su',
      'finger cots',
      'rubber finger cots'
    ],
    description: 'Bao ngón cao su tĩnh điện chống bụi, bảo vệ linh kiện và ngón tay công nhân.',
    displayOrder: 2,
  },
  {
    id: 'precision-motor-shafts',
    name: 'Trục động cơ chính xác',
    slug: 'truc-dong-co-chinh-xac',
    aliases: [
      'trục cơ khí chính xác',
      'truc co khi',
      'trục động cơ',
      'truc dong co chinh xac',
      'precision motor shafts'
    ],
    description: 'Trục động cơ cơ khí siêu chính xác cho servo, robot và động cơ bước.',
    displayOrder: 3,
  }
];

export const CATEGORY_ATTRIBUTES_SCHEMA: Record<string, CategoryAttribute[]> = {
  // Găng tay nitrile phòng sạch (Riverstone) -> Class + Color + Length + Surface
  'cleanroom-nitrile-gloves': [
    {
      id: 'size',
      categoryId: 'cleanroom-nitrile-gloves',
      label: 'Cấp độ sạch (Class)',
      type: 'multi-select',
      isSpec: true,
      sortOrder: 1,
      options: ['Class 100', 'Class 1000']
    },
    {
      id: 'color',
      categoryId: 'cleanroom-nitrile-gloves',
      label: 'Màu sắc',
      type: 'multi-select',
      isSpec: true,
      sortOrder: 2,
      options: ['Trắng', 'Xanh']
    },
    {
      id: 'length',
      categoryId: 'cleanroom-nitrile-gloves',
      label: 'Chiều dài',
      type: 'multi-select',
      isSpec: true,
      sortOrder: 3,
      options: ['240 mm', '300 mm']
    },
    {
      id: 'surface',
      categoryId: 'cleanroom-nitrile-gloves',
      label: 'Bề mặt',
      type: 'multi-select',
      isSpec: true,
      sortOrder: 4,
      options: ['nhám ngón', 'nhám bàn']
    }
  ],

  // Bao ngón tay cao su (Suzuki Latex)
  'rubber-finger-cots': [
    {
      id: 'size',
      categoryId: 'rubber-finger-cots',
      label: 'Kích thước',
      type: 'multi-select',
      isSpec: true,
      sortOrder: 1,
      options: ['S 15mm - M 18mm - L 21mm', 'S 15mm - M 18mm - L 20mm', 'M 15mm - L 19mm', 'XS 13.5mm - S 15mm - SM 16.5mm - M 18mm - L 21 mm']
    },
    {
      id: 'color',
      categoryId: 'rubber-finger-cots',
      label: 'Màu sắc',
      type: 'multi-select',
      isSpec: true,
      sortOrder: 2,
      options: ['Trắng', 'Đen', 'Vàng', 'Cam', 'Hồng']
    }
  ],

  // Trục động cơ chính xác (Đức Phong) -> Diameter + Length + Material
  'precision-motor-shafts': [
    {
      id: 'diameter',
      categoryId: 'precision-motor-shafts',
      label: 'Đường kính',
      type: 'dimension',
      unit: 'mm',
      isSpec: true,
      sortOrder: 1,
      options: ['Φ12', 'Φ14', 'Φ15']
    },
    {
      id: 'length',
      categoryId: 'precision-motor-shafts',
      label: 'Chiều dài',
      type: 'dimension',
      unit: 'mm',
      isSpec: true,
      sortOrder: 2,
      options: ['100 mm', '150 mm', '200 mm', '250 mm']
    },
    {
      id: 'material',
      categoryId: 'precision-motor-shafts',
      label: 'Vật liệu',
      type: 'multi-select',
      isSpec: true,
      sortOrder: 3,
      options: ['Thép không gỉ']
    }
  ]
};

/**
 * Normalizes category identifier (id, slug, name or alias) into standard CategoryDefinition.
 */
export function findCategoryDefinition(identifier?: string | null): CategoryDefinition | undefined {
  if (!identifier) return undefined;
  const norm = identifier.trim().toLowerCase();

  return CATEGORY_DEFINITIONS.find(cat => 
    cat.id.toLowerCase() === norm ||
    cat.name.toLowerCase() === norm ||
    cat.slug.toLowerCase() === norm ||
    cat.aliases?.some(alias => alias.toLowerCase() === norm) ||
    // Partial loose match for Vietnamese accents/variations
    norm.includes(cat.id.toLowerCase()) ||
    norm.includes(cat.slug.toLowerCase()) ||
    cat.name.toLowerCase().includes(norm) ||
    norm.includes(cat.name.toLowerCase())
  );
}

/**
 * Retrieves the configured filter attributes for a given category.
 * If no category is selected or category not found, returns empty array.
 */
export function getCategoryAttributes(categoryIdOrName?: string | null): CategoryAttribute[] {
  const cat = findCategoryDefinition(categoryIdOrName);
  if (!cat) return [];
  return CATEGORY_ATTRIBUTES_SCHEMA[cat.id] || [];
}

/**
 * Checks whether a product category string matches a target category identifier.
 */
export function isProductInCategory(productCategory: string, targetCategoryIdentifier: string | null): boolean {
  if (!targetCategoryIdentifier) return true;
  const targetCat = findCategoryDefinition(targetCategoryIdentifier);
  if (!targetCat) {
    return (productCategory || '').toLowerCase().trim() === targetCategoryIdentifier.toLowerCase().trim();
  }
  const prodCat = findCategoryDefinition(productCategory);
  if (prodCat) {
    return prodCat.id === targetCat.id;
  }
  return targetCat.aliases?.some(a => a.toLowerCase() === productCategory.toLowerCase().trim()) || false;
}
