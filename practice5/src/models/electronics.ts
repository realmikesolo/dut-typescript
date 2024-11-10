import { BaseProduct } from './base-product';

export type Electronics = BaseProduct & {
  category: 'electronics';
  warrantyPeriod: number;
};
