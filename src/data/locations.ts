export interface DistributionLocation {
  id: string;
  name: string;
  top: string;
  left: string;
  image: string;
  description: string;
  serviceArea: string;
  productCategories: string[];
  link: string;
}

export const DISTRIBUTION_LOCATIONS: DistributionLocation[] = [
  {
    id: 'hanoi',
    name: 'Hà Nội',
    top: '25%',
    left: '42%',
    image: 'https://placehold.co/400x300/f4f5f7/007a3d?text=Ha+Noi+Office',
    description: 'Trụ sở chính & Kho trung tâm khu vực miền Bắc.',
    serviceArea: 'Hà Nội & Các tỉnh lân cận',
    productCategories: ['Vật tư phòng sạch', 'Vật tư tiêu hao', 'Thiết bị phụ trợ'],
    link: '/contact'
  },
  {
    id: 'haiphong',
    name: 'Hải Phòng',
    top: '28%',
    left: '48%',
    image: 'https://placehold.co/400x300/f4f5f7/007a3d?text=Hai+Phong+Branch',
    description: 'Chi nhánh phân phối vật tư công nghiệp phụ trợ.',
    serviceArea: 'Hải Phòng, Quảng Ninh, Hải Dương',
    productCategories: ['Vật tư phòng sạch', 'Đồ bảo hộ lao động'],
    link: '/contact'
  },
  {
    id: 'danang',
    name: 'Đà Nẵng',
    top: '55%',
    left: '65%',
    image: 'https://placehold.co/400x300/f4f5f7/007a3d?text=Da+Nang+Branch',
    description: 'Trung tâm phân phối khu vực miền Trung.',
    serviceArea: 'Đà Nẵng, Quảng Nam, Quảng Ngãi',
    productCategories: ['Vật tư phòng sạch', 'Trục cơ khí chính xác'],
    link: '/contact'
  },
  {
    id: 'hcm',
    name: 'TP. Hồ Chí Minh',
    top: '80%',
    left: '45%',
    image: 'https://placehold.co/400x300/f4f5f7/007a3d?text=HCM+Branch',
    description: 'Văn phòng & Kho trung tâm khu vực miền Nam.',
    serviceArea: 'TP.HCM, Bình Dương, Đồng Nai, Long An',
    productCategories: ['Vật tư phòng sạch', 'Vật tư tiêu hao', 'Thiết bị phụ trợ'],
    link: '/contact'
  }
];
