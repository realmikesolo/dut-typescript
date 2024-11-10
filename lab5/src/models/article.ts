import { BaseContent } from './base-content';

export interface Article extends BaseContent {
  title: string;
  content: string;
  authorId: string;
  tags?: string[];
}
