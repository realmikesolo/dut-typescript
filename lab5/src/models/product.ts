import { BaseContent } from './base-content';

export interface Product extends BaseContent {
  name: string;
  description: string;
  price: number;
  inStock: boolean;
}
