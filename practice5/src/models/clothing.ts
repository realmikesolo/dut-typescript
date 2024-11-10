import { BaseProduct } from './base-product';

export type Clothing = BaseProduct & {
  category: 'clothing';
  size: string;
  material: string;
};
