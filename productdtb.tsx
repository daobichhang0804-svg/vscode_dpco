import { createClient } from '@supabase/supabase-js';
import { Product } from './src/types';
import { GoogleGenAI } from '@google/genai';

// Khởi tạo Supabase client bằng biến môi trường (tự động chuẩn hóa URL)
const rawUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://ybitklruurxnuoyzusdp.supabase.co';
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_6sWO6mHNShTmsMToa8-5Pw_R1RD65dz';
const supabase = createClient(supabaseUrl, supabaseKey);

// Hàm lấy dữ liệu sản phẩm từ Supabase
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    console.error('Lỗi khi fetch dữ liệu từ Supabase:', error.message);
    return [];
  }

  return (data || []) as Product[];
}

// Khởi tạo Gemini client
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export async function askAIAboutProducts() {
  const products = await getProducts();

  const prompt = `
    Dưới đây là danh sách sản phẩm lấy từ cơ sở dữ liệu Supabase của tôi:
    ${JSON.stringify(products, null, 2)}

    Hãy đóng vai một trợ lý bán hàng, gợi ý cho tôi 3 sản phẩm nổi bật nhất và giải thích lý do.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    console.log(response.text);
  } catch (error) {
    console.error('Lỗi khi gọi Gemini API:', error);
  }
}
