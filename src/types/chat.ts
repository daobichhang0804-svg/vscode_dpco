import { Product } from '../types';

export type UserIntent =
  | 'PRODUCT_SEARCH'
  | 'PRODUCT_COMPARISON'
  | 'TECHNICAL_SPECIFICATION'
  | 'PRICE_QUOTATION'
  | 'PRODUCT_RECOMMENDATION'
  | 'PRODUCT_FILTER'
  | 'COMPANY_INFORMATION'
  | 'CONTACT_SALES'
  | 'LOCATION_MAP'
  | 'DELIVERY_DISTRIBUTION'
  | 'ORDER_PURCHASE_PROCESS'
  | 'AFTER_SALES_SUPPORT'
  | 'GENERAL_INDUSTRY_QUESTION'
  | 'UNKNOWN';

export interface ChatAction {
  type: 'navigate' | 'open_quote_modal' | 'open_compare' | 'filter_products' | 'call_phone' | 'view_product';
  label: string;
  url?: string;
  payload?: any;
}

export interface ChatCitation {
  title: string;
  url: string;
  snippet?: string;
  sourceType?: 'maps' | 'web' | 'supabase' | 'document';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  intents?: UserIntent[];
  productCards?: Product[];
  actions?: ChatAction[];
  citations?: ChatCitation[];
  groundingType?: 'google_search' | 'google_maps' | 'supabase' | 'official_site';
  leadFormPrompt?: {
    productName?: string;
    quantity?: string;
  };
  suggestedReplies?: string[];
}

export interface ChatRequestPayload {
  message: string;
  history?: Array<{ role: 'user' | 'assistant'; content: string }>;
  userLocation?: {
    latitude: number;
    longitude: number;
  };
}

export interface ChatResponsePayload {
  reply: string;
  intents: UserIntent[];
  productCards?: Product[];
  actions?: ChatAction[];
  citations?: ChatCitation[];
  groundingType?: 'google_search' | 'google_maps' | 'supabase' | 'official_site';
  leadFormPrompt?: {
    productName?: string;
    quantity?: string;
  };
  suggestedReplies?: string[];
}
