export type SearchIntent = 'PRODUCT' | 'TECHNICAL' | 'APPLICATION' | 'COMMERCIAL' | 'SUPPLIER' | 'BRAND' | 'MODEL' | 'CATEGORY';

export interface SearchSuggestion {
  keyword: string;
  intent: SearchIntent;
  category: string;
  priority: number;
}

export const SEARCH_SUGGESTIONS: SearchSuggestion[] = [
  // CATEGORY A — Popular Products
  { keyword: 'Găng tay nitrile phòng sạch', intent: 'PRODUCT', category: 'Sản phẩm phổ biến', priority: 1 },
  { keyword: 'Bao ngón tay phòng sạch', intent: 'PRODUCT', category: 'Sản phẩm phổ biến', priority: 1 },
  { keyword: 'Bao ngón tay chống tĩnh điện', intent: 'PRODUCT', category: 'Sản phẩm phổ biến', priority: 1 },
  { keyword: 'Trục cơ khí chính xác', intent: 'PRODUCT', category: 'Sản phẩm phổ biến', priority: 1 },
  { keyword: 'Vật tư phòng sạch', intent: 'PRODUCT', category: 'Sản phẩm phổ biến', priority: 1 },

  // CATEGORY B — Technical / Specification Intent
  { keyword: 'Găng tay nitrile ISO 5', intent: 'TECHNICAL', category: 'Theo yêu cầu kỹ thuật', priority: 2 },
  { keyword: 'Găng tay nitrile không bột', intent: 'TECHNICAL', category: 'Theo yêu cầu kỹ thuật', priority: 2 },
  { keyword: 'Bao ngón tay ESD', intent: 'TECHNICAL', category: 'Theo yêu cầu kỹ thuật', priority: 2 },
  { keyword: 'Bao ngón tay không lưu huỳnh', intent: 'TECHNICAL', category: 'Theo yêu cầu kỹ thuật', priority: 2 },
  { keyword: 'Găng tay phòng sạch vô trùng', intent: 'TECHNICAL', category: 'Theo yêu cầu kỹ thuật', priority: 2 },

  // CATEGORY C — Application Intent
  { keyword: 'Vật tư phòng sạch cho nhà máy điện tử', intent: 'APPLICATION', category: 'Theo nhu cầu', priority: 3 },
  { keyword: 'Găng tay phòng sạch cho điện tử', intent: 'APPLICATION', category: 'Theo nhu cầu', priority: 3 },
  { keyword: 'Bao ngón tay cho linh kiện điện tử', intent: 'APPLICATION', category: 'Theo nhu cầu', priority: 3 },
  
  // CATEGORY D — Commercial / Procurement Intent
  { keyword: 'Mua găng tay nitrile phòng sạch', intent: 'COMMERCIAL', category: 'Tìm kiếm thương mại', priority: 4 },
  { keyword: 'Nhà cung cấp vật tư phòng sạch', intent: 'SUPPLIER', category: 'Tìm kiếm thương mại', priority: 4 },
  { keyword: 'Báo giá găng tay phòng sạch', intent: 'COMMERCIAL', category: 'Tìm kiếm thương mại', priority: 4 },
];
