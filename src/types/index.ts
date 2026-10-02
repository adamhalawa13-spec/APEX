export type ProductCategory =
  | 'ALL'
  | 'HOODIES'
  | 'OVERSIZED'
  | 'ESSENTIALS'
  | 'LIMITED EDITION';

export type CollectionName =
  | 'APEX CORE'
  | 'APEX MOTION'
  | 'APEX FORM'
  | 'APEX NIGHT'
  | 'APEX LIMITED';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductSpecs {
  materials: string;
  fit: string;
  care: string;
  shipping: string;
  returns: string;
}

export interface Product {
  id: string;
  name: string;
  price: number; // in EGP
  category: ProductCategory | 'T-SHIRTS';
  collection: CollectionName;
  colors: ProductColor[];
  sizes: string[];
  shortDescription: string;
  fullDescription: string;
  images: string[];
  isNew?: boolean;
  isLimited?: boolean;
  editionNumber?: string;
  totalStock?: number;
  remainingStock?: number;
  releaseDate?: string;
  gender?: 'unisex' | 'men' | 'women';
  matchingPairId?: string;
  matchingNote?: string;
  specs: ProductSpecs;
}

export interface CartItem {
  id: string; // unique item hash: product.id + size + color
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export type OrderStatus =
  | 'ORDER PLACED'
  | 'PROCESSING'
  | 'PACKED'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderItem {
  productId: string;
  productName: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
}

export interface OrderCustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  apartment: string;
}

export interface OrderPaymentDetails {
  method: 'Cash on Delivery' | 'Credit / Debit Card' | 'Apple Pay';
  cardBrand?: string;
  transactionRef?: string;
  status: string;
}

export interface Order {
  orderId: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: OrderCustomerInfo;
  customerEmail?: string; // Used to associate order with registered customer
  paymentMethod: 'Cash on Delivery' | 'Credit / Debit Card' | 'Apple Pay';
  paymentDetails?: OrderPaymentDetails;
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  apartment?: string;
  registeredAt: string;
}

export interface FilterState {
  category: ProductCategory;
  collection?: CollectionName | 'ALL';
  size?: string;
  color?: string;
  priceRange?: [number, number];
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc';
  gender?: 'all' | 'men' | 'women' | 'unisex';
}
