export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  badge: string;
  featured: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  reviewText: string;
  rating: number;
  avatarUrl?: string;
}
