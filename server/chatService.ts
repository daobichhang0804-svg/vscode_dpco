import { GoogleGenAI, Type } from '@google/genai';
import { createClient } from '@supabase/supabase-js';
import { CATEGORY_DEMO_PRODUCTS } from '../src/data/categoryDemoProducts';
import { CATEGORY_DEFINITIONS, findCategoryDefinition } from '../src/data/categorySchema';
import { rohsMapping, getRohsFileBySku } from '../src/data/rohsMapping';
import { Product, SupabaseProduct } from '../src/types';
import { UserIntent, ChatCitation, ChatAction, ChatResponsePayload } from '../src/types/chat';

// Initialize Supabase client
const rawSupabaseUrl = (process.env.VITE_SUPABASE_URL || 'https://ybitklruurxnuoyzusdp.supabase.co').trim();
const SUPABASE_URL = rawSupabaseUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const SUPABASE_ANON_KEY = (process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_6sWO6mHNShTmsMToa8-5Pw_R1RD65dz').trim();
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Official DPCO Company Data
const DPCO_OFFICIAL_DATA = {
  name: 'CÔNG TY TNHH THƯƠNG MẠI ĐỨC PHONG',
  englishName: 'DUC PHONG TRADING COMPANY LIMITED',
  shortName: 'DPCO',
  tagline: 'Nhà cung cấp vật tư phòng sạch, thiết bị kiểm soát tĩnh điện (ESD) và cơ khí công nghiệp tiêu chuẩn cao.',
  distributorPartnerships: [
    'Đại lý phân phối và tiếp thị được chỉ định của Suzuki Latex (Nhật Bản)',
    'Đối tác phân phối ủy quyền sản phẩm phòng sạch Riverstone tại Việt Nam'
  ],
  locations: [
    {
      name: 'Trụ sở & Văn phòng Hà Nội (Miền Bắc)',
      address: 'Số nhà 24, Ngõ 25 Phố Bùi Huy Bích, Phường Hoàng Mai, Hà Nội',
      hotline: '094 828 1881 / 039 667 5987',
      email: 'bm-m@dpco.com.vn',
      hours: 'Thứ Hai - Thứ Bảy: 08:00 - 17:30',
      mapUrl: 'https://maps.google.com/?q=Số+nhà+24,+Ngõ+25+Phố+Bùi+Huy+Bích,+Phường+Hoàng+Mai,+Hà+Nội'
    },
    {
      name: 'Văn phòng đại diện Đồng Nai (Miền Nam)',
      address: 'Khu phố 1, Phường Long Hưng, Thành phố Biên Hòa, Tỉnh Đồng Nai',
      hotline: '038 250 2425',
      email: 'buz-south-01@dpco.com.vn',
      hours: 'Thứ Hai - Thứ Bảy: 08:00 - 17:30',
      mapUrl: 'https://maps.google.com/?q=Khu+phố+1,+Phường+Long+Hưng,+Biên+Hòa,+Đồng+Nai'
    }
  ],
  deliveryPolicy: 'Cung ứng và giao hàng toàn quốc. Phục vụ các nhà máy, khu chế xuất và khu công nghiệp lớn tại Bắc Ninh, Thái Nguyên, Hải Phòng, Hà Nội, Đồng Nai, Bình Dương, TP.HCM.',
  documentsPolicy: 'Tất cả các sản phẩm bao ngón, găng tay đều có sẵn tài liệu kỹ thuật, chứng nhận không chứa chất độc hại RoHS, COA cho từng lô hàng.'
};

// Cached products in server memory for high-performance tool access
let cachedProducts: Product[] = [];
let lastCacheTime = 0;

async function getLiveProducts(): Promise<Product[]> {
  const now = Date.now();
  if (cachedProducts.length > 0 && now - lastCacheTime < 60000) {
    return cachedProducts;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name', { ascending: true });

    if (error || !data) {
      console.warn('Supabase fetch failed in chatService, using demo fallback:', error?.message);
      cachedProducts = CATEGORY_DEMO_PRODUCTS;
      return cachedProducts;
    }

    const mappedSupabase: Product[] = (data as SupabaseProduct[]).map((sp) => {
      const fallbackImage = `https://placehold.co/400x500/f4f5f7/007a3d?text=${encodeURIComponent(sp.name || 'Product')}`;
      let image = sp.image_url?.trim() || fallbackImage;
      if (image && !image.startsWith('http') && !image.startsWith('/') && !image.startsWith('blob:')) {
        image = `https://ybitklruurxnuoyzusdp.supabase.co/storage/v1/object/public/images/${image}`;
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
        }
      };
    });

    // Combine with categories not yet fully in Supabase
    const additionalDemo = CATEGORY_DEMO_PRODUCTS.filter(demo =>
      !mappedSupabase.some(p => p.category.toLowerCase().trim() === demo.category.toLowerCase().trim())
    );

    cachedProducts = [...mappedSupabase, ...additionalDemo];
    lastCacheTime = now;
    return cachedProducts;
  } catch (err) {
    console.error('getLiveProducts exception:', err);
    cachedProducts = CATEGORY_DEMO_PRODUCTS;
    return cachedProducts;
  }
}

// Helper to determine intent from text
export function detectUserIntents(message: string): UserIntent[] {
  const norm = message.toLowerCase();
  const intents: UserIntent[] = [];

  // Quotation / Pricing signals
  if (
    norm.includes('báo giá') ||
    norm.includes('bao gia') ||
    norm.includes('giá') ||
    norm.includes('gia bao nhieu') ||
    norm.includes('giá sỉ') ||
    norm.includes('số lượng lớn') ||
    norm.includes('mua') ||
    norm.includes('hộp') ||
    norm.includes('thùng') ||
    norm.includes('đặt hàng') ||
    norm.includes('moq') ||
    norm.includes('hợp đồng')
  ) {
    intents.push('PRICE_QUOTATION');
  }

  // Comparison
  if (
    norm.includes('so sánh') ||
    norm.includes('khác nhau') ||
    norm.includes('khác gì') ||
    norm.includes('phân vân') ||
    norm.includes('nên chọn loại nào') ||
    norm.includes('tốt hơn')
  ) {
    intents.push('PRODUCT_COMPARISON');
  }

  // Technical specification
  if (
    norm.includes('thông số') ||
    norm.includes('làm bằng gì') ||
    norm.includes('chất liệu') ||
    norm.includes('độ dày') ||
    norm.includes('độ sạch') ||
    norm.includes('chiều dài') ||
    norm.includes('tĩnh điện') ||
    norm.includes('sulphur') ||
    norm.includes('chlorine') ||
    norm.includes('silicone') ||
    norm.includes('có bột') ||
    norm.includes('không bột') ||
    norm.includes('coa') ||
    norm.includes('rohs') ||
    norm.includes('chứng nhận') ||
    norm.includes('tiêu chuẩn')
  ) {
    intents.push('TECHNICAL_SPECIFICATION');
  }

  // Location / Map
  if (
    norm.includes('ở đâu') ||
    norm.includes('địa chỉ') ||
    norm.includes('văn phòng') ||
    norm.includes('chi nhánh') ||
    norm.includes('chỉ đường') ||
    norm.includes('bản đồ') ||
    norm.includes('kho') ||
    norm.includes('hà nội') ||
    norm.includes('đồng nai') ||
    norm.includes('tp.hcm') ||
    norm.includes('showroom')
  ) {
    intents.push('LOCATION_MAP');
  }

  // Company / Contact
  if (
    norm.includes('công ty') ||
    norm.includes('đức phong') ||
    norm.includes('dpco') ||
    norm.includes('liên hệ') ||
    norm.includes('hotline') ||
    norm.includes('số điện thoại') ||
    norm.includes('email') ||
    norm.includes('sales')
  ) {
    intents.push('COMPANY_INFORMATION');
    intents.push('CONTACT_SALES');
  }

  // Delivery / Distribution
  if (
    norm.includes('giao hàng') ||
    norm.includes('vận chuyển') ||
    norm.includes('ship') ||
    norm.includes('phân phối') ||
    norm.includes('toàn quốc')
  ) {
    intents.push('DELIVERY_DISTRIBUTION');
  }

  // Product Filter
  if (
    norm.includes('size') ||
    norm.includes('màu') ||
    norm.includes('đường kính') ||
    norm.includes('15mm') ||
    norm.includes('18mm') ||
    norm.includes('21mm') ||
    norm.includes('roll') ||
    norm.includes('unroll') ||
    norm.includes('cut') ||
    norm.includes('shortcut')
  ) {
    intents.push('PRODUCT_FILTER');
  }

  // Product Search / Recommendation
  if (
    norm.includes('bao ngón') ||
    norm.includes('găng tay') ||
    norm.includes('trục') ||
    norm.includes('phòng sạch') ||
    norm.includes('spore') ||
    norm.includes('edel') ||
    norm.includes('mask') ||
    norm.includes('shield') ||
    norm.includes('tìm') ||
    norm.includes('có loại')
  ) {
    intents.push('PRODUCT_SEARCH');
  }

  if (norm.includes('phù hợp') || norm.includes('tư vấn') || norm.includes('gợi ý')) {
    intents.push('PRODUCT_RECOMMENDATION');
  }

  // External / General Industry Question
  if (
    norm.includes('iso 14644') ||
    norm.includes('class 100') ||
    norm.includes('esd là gì') ||
    norm.includes('cleanroom là gì') ||
    norm.includes('tiêu chuẩn quốc tế')
  ) {
    intents.push('GENERAL_INDUSTRY_QUESTION');
  }

  if (intents.length === 0) {
    intents.push('UNKNOWN');
  }

  return Array.from(new Set(intents));
}

export async function processChatRequest(
  message: string,
  history: Array<{ role: 'user' | 'assistant'; content: string }> = [],
  userLocation?: { latitude: number; longitude: number }
): Promise<ChatResponsePayload> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      reply: 'Hệ thống trợ lý đang được cấu hình khóa API. Vui lòng cài đặt GEMINI_API_KEY trong Settings > Secrets để kích hoạt.',
      intents: ['UNKNOWN']
    };
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });

  const allProducts = await getLiveProducts();
  const intents = detectUserIntents(message);

  // Prepare product summary catalogue for Gemini prompt context
  const catalogSummary = allProducts.map(p => ({
    id: p.id,
    sku: p.sku,
    name: p.name,
    category: p.category,
    brand: p.brand,
    color: p.specs?.color || 'N/A',
    size: p.specs?.size || p.specs?.diameter || 'N/A',
    material: p.specs?.material || 'N/A',
    type: p.specs?.type || 'N/A',
    powder: p.specs?.powder || 'N/A',
    sulphur: p.specs?.sulphur || 'N/A',
    chlorine: p.specs?.chlorine || 'N/A',
    static: p.specs?.static || 'N/A',
    packaging: p.specs?.packaging || 'N/A',
    hasRohs: !!getRohsFileBySku(p.sku, p.name)
  }));

  // Define tools for Gemini
  const searchProductsDeclaration = {
    name: 'searchProducts',
    description: 'Tìm kiếm sản phẩm trong cơ sở dữ liệu Supabase/Website theo tên, danh mục, kích thước, màu sắc hoặc thuộc tính.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        query: { type: Type.STRING, description: 'Từ khóa tìm kiếm (tên, mã SKU hoặc đặc điểm)' },
        category: { type: Type.STRING, description: 'Danh mục sản phẩm (ví dụ: Bao ngón cao su, Găng tay nitrile phòng sạch, Trục động cơ chính xác)' },
        size: { type: Type.STRING, description: 'Kích thước hoặc đường kính (ví dụ: S, M, L, 15mm, 18mm)' },
        color: { type: Type.STRING, description: 'Màu sắc (ví dụ: Vàng, Trắng, Đen, Cam, Hồng)' }
      }
    }
  };

  const getProductDetailsDeclaration = {
    name: 'getProductDetails',
    description: 'Lấy thông tin kỹ thuật chi tiết đã xác thực của 1 sản phẩm cụ thể từ cơ sở dữ liệu.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        productIdentifier: { type: Type.STRING, description: 'Tên hoặc SKU hoặc ID sản phẩm' }
      },
      required: ['productIdentifier']
    }
  };

  const compareProductsDeclaration = {
    name: 'compareProducts',
    description: 'So sánh từ 2 đến 4 sản phẩm theo các thông số kỹ thuật thực tế.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        productIdentifiers: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: 'Danh sách 2 đến 4 tên sản phẩm cần so sánh'
        }
      },
      required: ['productIdentifiers']
    }
  };

  const openQuotationFlowDeclaration = {
    name: 'openQuotationFlow',
    description: 'Kích hoạt quy trình yêu cầu báo giá B2B khi người dùng có nhu cầu mua hàng, hỏi giá hoặc số lượng.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        productName: { type: Type.STRING, description: 'Tên sản phẩm được yêu cầu báo giá' },
        quantity: { type: Type.STRING, description: 'Số lượng dự kiến (ví dụ: 500 hộp, 1000 cái)' },
        notes: { type: Type.STRING, description: 'Yêu cầu quy cách thêm' }
      }
    }
  };

  const getCompanyAndLocationDeclaration = {
    name: 'getCompanyAndLocation',
    description: 'Lấy thông tin công ty Đức Phong, địa chỉ trụ sở Hà Nội, Đồng Nai, liên hệ hotline, chính sách giao hàng.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        topic: { type: Type.STRING, description: 'Chủ đề: location (địa chỉ), contact (liên hệ), delivery (giao hàng), partnership (đối tác)' }
      }
    }
  };

  const systemInstruction = `
Bạn là Trợ lý Kinh doanh AI B2B của CÔNG TY TNHH THƯƠNG MẠI ĐỨC PHONG (DPCO).
Bạn KHÔNG PHẢI là chatbot AI thông thường. Bạn là chuyên gia tư vấn kỹ thuật vật tư phòng sạch, thiết bị kiểm soát tĩnh điện (ESD) và gia công cơ khí chính xác.

NGUYÊN TẮC CỐT LÕI VỀ NGUỒN THÔNG TIN:
1. ƯU TIÊN 1: Dữ liệu sản phẩm thực tế từ Supabase / Website DPCO.
   - Luôn sử dụng thông số kỹ thuật chính xác (vật liệu, màu sắc, size, độ bột, sulphur, chlorine, độ tĩnh điện, quy cách đóng gói).
   - TUYỆT ĐỐI KHÔNG BỊA ĐẶT THÔNG SỐ (Không Hallucination). Nếu dữ liệu chưa có, hãy nói thẳng: "Thông tin này hiện chưa có trong dữ liệu sản phẩm của tôi. Tôi có thể đưa bạn đến trang sản phẩm hoặc hỗ trợ liên hệ bộ phận kỹ thuật để xác nhận."
2. ƯU TIÊN 2: Thông tin chính thức về DPCO:
   - Trụ sở Hà Nội: Số nhà 24, Ngõ 25 Phố Bùi Huy Bích, Phường Hoàng Mai, Hà Nội. Hotline: 094 828 1881 / 039 667 5987. Email: bm-m@dpco.com.vn.
   - Chi nhánh Đồng Nai: Khu phố 1, Phường Long Hưng, Thành phố Biên Hòa, Đồng Nai. Hotline: 038 250 2425. Email: buz-south-01@dpco.com.vn.
   - Đối tác phân phối chính thức của Suzuki Latex (Nhật Bản) và Riverstone tại Việt Nam.
   - Giao hàng toàn quốc. Có đầy đủ chứng chỉ RoHS, COA cho các nhà máy phòng sạch.
3. QUY TRÌNH BÁO GIÁ B2B (High Purchase Intent):
   - Khi khách hàng hỏi "Báo giá", "giá bao nhiêu", "giá sỉ", "mua 500 hộp", "MOQ":
   - KHÔNG đưa ra giá tùy tiện khi chưa xác nhận đơn giá hợp đồng.
   - Ưu tiên chuỗi: SẢN PHẨM → QUY CÁCH / SIZE → SỐ LƯỢNG → MỞ BIỂU MẪU BÁO GIÁ.
   - Thu thập thông tin lũy tiến, KHÔNG hỏi dồn dập 5-6 câu hỏi cùng lúc. Kích hoạt tool openQuotationFlow khi nhận diện được sản phẩm và số lượng.
4. SO SÁNH SẢN PHẨM:
   - Liệt kê các điểm khác biệt rõ ràng: chất liệu (cao su tự nhiên vs cao su tổng hợp), độ bột (có bột, ít bột, không bột), độ tĩnh điện (có chống tĩnh điện ESD 10⁶~10⁸ hay không), bề mặt (nhám hay nhẵn).
   - Đề xuất CTA so sánh chi tiết.
5. ĐIỀU HƯỚNG WEBSITE (Actionable CTAs):
   - Thay vì chỉ nói "bạn có thể vào trang...", hãy gọi tool hoặc cung cấp đường dẫn chính xác:
     * Trang chi tiết sản phẩm: /product/{id}
    * Trang lọc danh mục: /collections/{slug}?{filter}={val}&{filter2}={val2}
     * Trang so sánh: /compare
     * Trang liên hệ báo giá: /contact
6. PHONG CÁCH GIAO TIẾP:
   - Chuyên nghiệp, lịch sự, chuẩn mực B2B công nghiệp.
   - Trả lời bằng tiếng Việt gãy gọn, có cấu trúc bullet point rõ ràng, dễ đọc.
`;

  // Check if user is asking for general external industry questions or maps
  const isGeneralIndustryQuestion = intents.includes('GENERAL_INDUSTRY_QUESTION');
  const isLocationMapQuestion = intents.includes('LOCATION_MAP') && (
    message.toLowerCase().includes('chỉ đường') ||
    message.toLowerCase().includes('ở đâu trên bản đồ') ||
    message.toLowerCase().includes('tìm đường') ||
    message.toLowerCase().includes('gần tôi')
  );

  let productCards: Product[] = [];
  let actions: ChatAction[] = [];
  let citations: ChatCitation[] = [];
  let groundingType: 'google_search' | 'google_maps' | 'supabase' | 'official_site' = 'supabase';
  let leadFormPrompt: { productName?: string; quantity?: string } | undefined = undefined;
  let suggestedReplies: string[] = [];

  // Special branch: If query demands external industry search or maps grounding
  if (isGeneralIndustryQuestion) {
    try {
      const searchRes = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\nNgười dùng hỏi kiến thức tiêu chuẩn bên ngoài: ${message}. Hãy giải thích chính xác, trích dẫn nguồn uy tín nếu có.` }] }
        ],
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      const replyText = searchRes.text || 'Tôi đã tra cứu tiêu chuẩn công nghiệp cho bạn.';
      groundingType = 'google_search';

      // Extract search citations
      const chunks = searchRes.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks && Array.isArray(chunks)) {
        for (const chunk of chunks) {
          if (chunk.web?.uri && chunk.web?.title) {
            citations.push({
              title: chunk.web.title,
              url: chunk.web.uri,
              sourceType: 'web'
            });
          }
        }
      }

      suggestedReplies = [
        'Xem sản phẩm phòng sạch phù hợp',
        'Tôi cần báo giá vật tư phòng sạch',
        'Liên hệ bộ phận kỹ thuật DPCO'
      ];

      return {
        reply: replyText,
        intents,
        citations: citations.length > 0 ? citations : undefined,
        groundingType,
        suggestedReplies
      };
    } catch (searchErr) {
      console.warn('Google search grounding fallback to standard flow:', searchErr);
    }
  }

  // Branch: If query explicitly asks for Google Maps grounding
  if (isLocationMapQuestion) {
    try {
      const mapsConfig: any = {
        tools: [{ googleMaps: {} }]
      };
      if (userLocation) {
        mapsConfig.toolConfig = {
          retrievalConfig: {
            latLng: {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude
            }
          }
        };
      }

      const mapPrompt = `Người dùng hỏi về địa chỉ / vị trí của Công ty TNHH Thương Mại Đức Phong (DPCO) tại Hà Nội (Số 24 ngõ 25 Bùi Huy Bích, Hoàng Mai, Hà Nội) hoặc Đồng Nai (Long Hưng, Biên Hòa, Đồng Nai). Câu hỏi: "${message}". Hãy cung cấp thông tin vị trí và chỉ đường chính xác.`;
      const mapRes = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: [{ role: 'user', parts: [{ text: mapPrompt }] }],
        config: mapsConfig
      });

      const replyText = mapRes.text || 'Dưới đây là thông tin địa chỉ và bản đồ vị trí văn phòng DPCO.';
      groundingType = 'google_maps';

      const mapChunks = mapRes.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (mapChunks && Array.isArray(mapChunks)) {
        for (const chunk of mapChunks) {
          if (chunk.maps?.uri) {
            citations.push({
              title: chunk.maps.title || 'Vị trí Google Maps',
              url: chunk.maps.uri,
              sourceType: 'maps'
            });
          }
        }
      }

      // Add default DPCO Maps citation if none returned
      if (citations.length === 0) {
        citations.push({
          title: 'Vị trí Trụ sở DPCO Hà Nội (Google Maps)',
          url: 'https://maps.google.com/?q=Số+nhà+24,+Ngõ+25+Phố+Bùi+Huy+Bích,+Phường+Hoàng+Mai,+Hà+Nội',
          sourceType: 'maps'
        });
      }

      actions.push({
        type: 'navigate',
        label: 'Xem trang liên hệ & bản đồ',
        url: '/contact'
      });

      suggestedReplies = [
        'Giờ mở cửa văn phòng?',
        'Số điện thoại kinh doanh?',
        'Gửi yêu cầu báo giá'
      ];

      return {
        reply: replyText,
        intents,
        actions,
        citations,
        groundingType,
        suggestedReplies
      };
    } catch (mapErr) {
      console.warn('Google maps grounding fallback to standard flow:', mapErr);
    }
  }

  // Standard B2B Agent Flow with Supabase Retrieval-Augmented Generation (RAG)
  try {
    const lower = message.toLowerCase();
    
    // 1. Search products from Supabase / catalog matching user query
    const matchedProducts = allProducts.filter(p => {
      const matchName = p.name.toLowerCase().includes(lower);
      const matchSku = p.sku.toLowerCase().includes(lower);
      const matchDesc = p.description?.toLowerCase().includes(lower);
      const matchCat = p.category?.toLowerCase().includes(lower);
      const matchColor = p.specs?.color && lower.includes(p.specs.color.toLowerCase());
      const matchClean = lower.includes('class 100') && p.specs?.cleanroom_class?.includes('100');
      const matchPowderFree = (lower.includes('không bột') || lower.includes('powder free')) && 
                              (p.specs?.powder_content?.toLowerCase().includes('không bột') || p.specs?.powder_content?.toLowerCase().includes('powder free') || p.name.toLowerCase().includes('không bột'));
      
      const categoryKeyword = 
        (lower.includes('bao ngón') && p.category.toLowerCase().includes('bao ngón')) ||
        (lower.includes('găng tay') && p.category.toLowerCase().includes('găng tay')) ||
        ((lower.includes('trục') || lower.includes('motor')) && p.category.toLowerCase().includes('trục'));

      return matchName || matchSku || matchDesc || matchCat || matchColor || matchClean || matchPowderFree || categoryKeyword;
    });

    if (matchedProducts.length > 0) {
      groundingType = 'supabase';
      productCards = matchedProducts.slice(0, 3);
      citations.push({
        title: `Cơ sở dữ liệu sản phẩm DPCO (${matchedProducts.length} sản phẩm)`,
        url: '/products',
        sourceType: 'supabase'
      });
      actions.push({
        type: 'navigate',
        label: `Xem tất cả ${matchedProducts.length} sản phẩm phù hợp`,
        url: '/products'
      });

      if (productCards.length >= 2) {
        actions.push({
          type: 'open_compare',
          label: 'So sánh các sản phẩm này',
          url: '/compare'
        });
      }
    }

    // Check quotation intent
    if (intents.includes('PRICE_QUOTATION') || lower.includes('báo giá') || lower.includes('giá sỉ') || lower.includes('số lượng')) {
      const firstP = productCards[0] || allProducts[0];
      leadFormPrompt = {
        productName: firstP?.name || 'Vật tư phòng sạch DPCO',
        quantity: ''
      };
      actions.push({
        type: 'open_quote_modal',
        label: 'Mở biểu mẫu yêu cầu báo giá nhanh',
        payload: { productName: firstP?.name || 'Vật tư DPCO' }
      });
      actions.push({
        type: 'call_phone',
        label: 'Hotline kinh doanh 094 828 1881',
        url: 'tel:0948281881'
      });
    }

    // Check location/contact intent
    if (intents.includes('LOCATION_MAP') || intents.includes('COMPANY_INFORMATION') || intents.includes('CONTACT_SALES')) {
      citations.push({
        title: 'Trụ sở chính DPCO - Số 24 ngõ 25 Bùi Huy Bích, Hoàng Mai, Hà Nội',
        url: 'https://maps.google.com/?q=Số+nhà+24,+Ngõ+25+Phố+Bùi+Huy+Bích,+Phường+Hoàng+Mai,+Hà+Nội',
        sourceType: 'maps'
      });
      actions.push({
        type: 'navigate',
        label: 'Xem thông tin liên hệ & bản đồ',
        url: '/contact'
      });
    }

    // Format chat history
    const formattedHistory = history.slice(-4).map(h => ({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.content }]
    }));

    // Generate conversational response grounded in database data
    const ragContext = `
[DỮ LIỆU SẢN PHẨM KHẢ DỤNG TỪ CƠ SỞ DỮ LIỆU SUPABASE]:
${JSON.stringify(matchedProducts.slice(0, 5).map(p => ({
  name: p.name,
  sku: p.sku,
  category: p.category,
  price_unit: (p as any).price_unit,
  specs: p.specs,
  standards: (p as any).standards
})), null, 2)}

[THÔNG TIN CÔNG TY & ĐẠI LÝ CHÍNH THỨC]:
- Tên: ${DPCO_OFFICIAL_DATA.name} (${DPCO_OFFICIAL_DATA.shortName})
- Hợp tác: ${DPCO_OFFICIAL_DATA.distributorPartnerships.join('; ')}
- Trụ sở: ${DPCO_OFFICIAL_DATA.locations[0].address}
- Hotline: 094 828 1881 / 0243 681 5588
- Chính sách: Hàng chính hãng 100%, đầy đủ CO/CQ, RoHS, giao hàng toàn quốc.

[YÊU CẦU CỦA KHÁCH HÀNG]: "${message}"
`;

    let finalAnswer = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: [
          ...formattedHistory,
          {
            role: 'user',
            parts: [{
              text: `${systemInstruction}\n\n${ragContext}\n\nHãy trả lời khách hàng ngắn gọn, chuyên nghiệp, chính xác dựa trên dữ liệu sản phẩm trên. Không bịa đặt giá hoặc thông số. Hướng dẫn khách xem thông số và nhận báo giá số lượng lớn.`
            }]
          }
        ]
      });
      finalAnswer = response.text || '';
    } catch (genErr) {
      console.warn('gemini-3.1-flash-lite retry with gemini-3.5-flash:', genErr);
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: [
          ...formattedHistory,
          {
            role: 'user',
            parts: [{
              text: `${systemInstruction}\n\n${ragContext}\n\nHãy trả lời khách hàng ngắn gọn, chuyên nghiệp, chính xác dựa trên dữ liệu sản phẩm trên.`
            }]
          }
        ]
      });
      finalAnswer = response.text || '';
    }

    // Default suggested replies based on intent
    if (intents.includes('PRICE_QUOTATION')) {
      suggestedReplies = [
        'Tôi cần báo giá 500 hộp',
        'Có sẵn hàng số lượng lớn không?',
        'Quy cách đóng thùng như thế nào?'
      ];
    } else if (intents.includes('PRODUCT_SEARCH') || intents.includes('PRODUCT_FILTER')) {
      suggestedReplies = [
        'Bao ngón không bột màu đen',
        'Găng tay nitrile phòng sạch Class 100',
        'Báo giá số lượng lớn'
      ];
    } else if (intents.includes('LOCATION_MAP') || intents.includes('COMPANY_INFORMATION')) {
      suggestedReplies = [
        'Chỉ đường tới văn phòng Hà Nội',
        'Thời gian giao hàng toàn quốc?',
        'Hotline kinh doanh'
      ];
    } else {
      suggestedReplies = [
        'Tư vấn bao ngón phòng sạch',
        'So sánh Spore Ordinary và Spore Clean',
        'Yêu cầu báo giá B2B'
      ];
    }

    return {
      reply: finalAnswer || 'Tôi có thể hỗ trợ quý khách tìm kiếm sản phẩm phòng sạch, thông số kỹ thuật hoặc gửi yêu cầu báo giá B2B.',
      intents,
      productCards: productCards.length > 0 ? productCards : undefined,
      actions: actions.length > 0 ? actions : undefined,
      citations: citations.length > 0 ? citations : undefined,
      groundingType,
      leadFormPrompt,
      suggestedReplies
    };
  } catch (err: any) {
    console.error('Gemini error in processChatRequest:', err);

    // Intelligent Deterministic Fallback: Search products locally based on keyword
    const lowerMsg = message.toLowerCase();
    const fallbackMatched = allProducts.filter(p => {
      const matchName = p.name.toLowerCase().includes(lowerMsg);
      const matchSku = p.sku.toLowerCase().includes(lowerMsg);
      const matchCategory = p.category?.toLowerCase().includes(lowerMsg);
      return matchName || matchSku || matchCategory;
    });

    const isQuote = lowerMsg.includes('báo giá') || lowerMsg.includes('gia') || lowerMsg.includes('bao gia') || lowerMsg.includes('giá');
    const isContact = lowerMsg.includes('địa chỉ') || lowerMsg.includes('ở đâu') || lowerMsg.includes('liên hệ') || lowerMsg.includes('điện thoại') || lowerMsg.includes('hotline');

    let reply = 'DPCO sẵn sàng hỗ trợ quý khách về vật tư phòng sạch và cơ khí chính xác.';
    const actions: ChatAction[] = [];
    const citations: ChatCitation[] = [];

    if (fallbackMatched.length > 0) {
      reply = `Hệ thống tìm thấy **${fallbackMatched.length} sản phẩm** phù hợp với yêu cầu của quý khách. Quý khách có thể xem thông số kỹ thuật chi tiết bên dưới hoặc yêu cầu báo giá nhanh:`;
      citations.push({
        title: 'Cơ sở dữ liệu sản phẩm DPCO (Supabase)',
        url: '/products',
        sourceType: 'supabase'
      });
      actions.push({
        type: 'navigate',
        label: 'Xem toàn bộ sản phẩm',
        url: '/products'
      });
    } else if (isContact) {
      reply = `**Công ty TNHH Thương Mại Đức Phong (DPCO)**:\n- **Trụ sở Hà Nội:** Số nhà 24, Ngõ 25 Phố Bùi Huy Bích, Phường Hoàng Liệt, Quận Hoàng Mai, TP. Hà Nội.\n- **Kho/VP Đồng Nai:** Xã Long Hưng, TP. Biên Hòa, Tỉnh Đồng Nai.\n- **Hotline:** 094 828 1881 / 0243 681 5588.`;
      citations.push({
        title: 'Trụ sở chính DPCO Hà Nội (Google Maps)',
        url: 'https://maps.google.com/?q=Số+nhà+24,+Ngõ+25+Phố+Bùi+Huy+Bích,+Phường+Hoàng+Mai,+Hà+Nội',
        sourceType: 'maps'
      });
      actions.push({
        type: 'call_phone',
        label: 'Gọi hotline 094 828 1881',
        url: 'tel:0948281881'
      });
    }

    if (isQuote) {
      actions.push({
        type: 'open_quote_modal',
        label: 'Mở biểu mẫu báo giá nhanh',
        payload: { productName: fallbackMatched[0]?.name || 'Vật tư DPCO' }
      });
    }

    return {
      reply,
      intents,
      productCards: fallbackMatched.slice(0, 4),
      actions: actions.length > 0 ? actions : [
        { type: 'navigate', label: 'Xem danh mục sản phẩm', url: '/products' },
        { type: 'call_phone', label: 'Gọi hotline 094 828 1881', url: 'tel:0948281881' }
      ],
      citations: citations.length > 0 ? citations : undefined,
      groundingType: fallbackMatched.length > 0 ? 'supabase' : 'official_site',
      suggestedReplies: [
        'Báo giá bao ngón không bột',
        'Găng tay nitrile phòng sạch',
        'Địa chỉ văn phòng DPCO'
      ]
    };
  }
}
