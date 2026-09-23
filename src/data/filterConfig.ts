export interface FilterAttribute {
  id: string;
  label: string;
  type: 'multi-select' | 'single-select';
  isSpec: boolean;
}

const FINGER_COT_ATTRIBUTES: FilterAttribute[] = [
  { id: 'size', label: 'Kích thước', type: 'multi-select', isSpec: true },
  { id: 'color', label: 'Màu sắc', type: 'multi-select', isSpec: true },
  { id: 'type', label: 'Loại', type: 'multi-select', isSpec: true },
  { id: 'powder', label: 'Độ bột', type: 'multi-select', isSpec: true },
  { id: 'surface', label: 'Bề mặt', type: 'multi-select', isSpec: true },
  { id: 'static', label: 'Độ tĩnh điện', type: 'multi-select', isSpec: true },
  { id: 'chlorine', label: 'Chlorine', type: 'multi-select', isSpec: true },
];

export const CATEGORY_ATTRIBUTES: Record<string, FilterAttribute[]> = {
  'Bao ngón tay cao su': FINGER_COT_ATTRIBUTES,
  'Bao ngón cao su': FINGER_COT_ATTRIBUTES,
  'Găng tay nitrile phòng sạch': [
    { id: 'brand', label: 'Thương hiệu', type: 'multi-select', isSpec: false },
    { id: 'size', label: 'Kích thước', type: 'multi-select', isSpec: true },
    { id: 'color', label: 'Màu sắc', type: 'multi-select', isSpec: true },
    { id: 'surface', label: 'Bề mặt', type: 'multi-select', isSpec: true },
    { id: 'chlorine', label: 'Chlorine', type: 'multi-select', isSpec: true },
  ],
  'Trục cơ khí chính xác': [
    { id: 'brand', label: 'Thương hiệu', type: 'multi-select', isSpec: false },
    { id: 'size', label: 'Đường kính', type: 'multi-select', isSpec: true },
    { id: 'length', label: 'Chiều dài', type: 'multi-select', isSpec: true },
  ]
};

// Remove COMMON_ATTRIBUTES since we want specific brand logic per category
export const COMMON_ATTRIBUTES: FilterAttribute[] = [];
