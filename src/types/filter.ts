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
