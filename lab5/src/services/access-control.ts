import { BaseContent } from '../models/base-content';

type Role = 'admin' | 'editor' | 'viewer';
type Permission = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};

export type AccessControl<T extends BaseContent> = {
  role: Role;
  permissions: Permission;
  contentFilter?: (content: T) => boolean;
}
