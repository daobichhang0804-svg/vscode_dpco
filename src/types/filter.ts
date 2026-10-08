export type AttributeType = 
  | 'multi-select' 
  | 'single-select' 
  | 'boolean' 
  | 'numeric-range' 
  | 'dimension' 
  | 'specification';

export interface CategoryDefinition {
  id: string; // e.g. 'cleanroom-nitrile-gloves'
  name: string; // 'Găng tay nitrile phòng sạch'
  slug: string; // 'gang-tay-nitrile-phong-sach'
  aliases?: string[];
  description?: string;
  displayOrder?: number;
}

export interface CategoryAttribute {
  id: string; // 'size', 'color', 'type', 'diameter', 'material', 'length', 'tolerance'
  categoryId: string; // category id or '*' for universal
  label: string; // 'Kích thước', 'Màu sắc', 'Loại', 'Đường kính', etc.
  type: AttributeType;
  unit?: string; // 'mm', 'µm', etc.
  isSpec: boolean;
  sortOrder: number;
  options?: string[]; // predefined options
}

export interface FilterOptionData {
  value: string;
  label: string;
  count: number;
  disabled: boolean;
  selected: boolean;
}

export type SelectedFiltersState = Record<string, string[]>;


// ============================================================
// FINGER COT SIZE RULES
// Canonical size options used by the catalog filter.
// Do NOT derive these options by combining all raw variant
// values from the database.
// ============================================================

export const FINGER_COT_SIZES = {
  SPORE_MASK: [
    'S 15mm',
    'M 18mm',
    'L 20mm',
  ],

  SHIELD_EDEL_EX: [
    'M 15mm',
    'L 19mm',
  ],

  EDEL_II: [
    'S 15mm',
    'SM 16.5mm',
    'M 18mm',
    'L 21mm',
  ],
} as const;


// ============================================================
// PRODUCT → SIZE GROUP
// ============================================================

export const FINGER_COT_PRODUCT_SIZE_GROUP = {
  'Spore Ordinary': 'SPORE_MASK',
  'Spore Clean': 'SPORE_MASK',
  'Spore Chlorinated': 'SPORE_MASK',

  'Spore Lite II Ordinary': 'SPORE_MASK',
  'Spore Lite II Clean': 'SPORE_MASK',
  'Spore Lite II Chlorinated': 'SPORE_MASK',

  'Spore Black Clean': 'SPORE_MASK',
  'Spore Black Chlorinated': 'SPORE_MASK',
  'Spore Black E9 Chlorinated': 'SPORE_MASK',

  'Spore Sulphur Free': 'SPORE_MASK',
  'Spore Pink AS Chlorinated': 'SPORE_MASK',

  'Mask Orange': 'SPORE_MASK',
  'Mask Black': 'SPORE_MASK',

  'Shield': 'SHIELD_EDEL_EX',
  'EDEL EX': 'SHIELD_EDEL_EX',

  'EDEL II': 'EDEL_II',
} as const;


// ============================================================
// GET SIZE OPTIONS FOR A PRODUCT
// ============================================================

export function getFingerCotSizes(productName: string): string[] {
  const group =
    FINGER_COT_PRODUCT_SIZE_GROUP[
      productName as keyof typeof FINGER_COT_PRODUCT_SIZE_GROUP
    ];

  if (!group) {
    return [];
  }

  return [...FINGER_COT_SIZES[group]];
}