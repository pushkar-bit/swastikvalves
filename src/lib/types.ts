export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDesc: string;
  sizes: string;
  material: string;
}

export interface EnquiryInput {
  name: string;
  designation?: string;
  company: string;
  email: string;
  address?: string;
  city?: string;
  country: string;
  phone: string;
  query: string;
}
