import { BaseContent } from '../models/base-content';

export type ContentOperations<T extends BaseContent> = {
  create: (content: T) => T;
  read: (id: string) => T | undefined;
  update: (id: string, content: T) => T;
  delete: (id: string) => boolean;
}
