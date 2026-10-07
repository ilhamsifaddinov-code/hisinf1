import type { Access, FieldAccess, PayloadRequest } from 'payload';

export type Role = 'admin' | 'editor' | 'author';

export function isStaffUser(user: any): boolean {
  return Boolean(user && user.collection === 'users' && user.isActive !== false);
}

export function hasRole(user: any, ...roles: Role[]): boolean {
  return isStaffUser(user) && roles.includes(user.role);
}

export const anyone: Access = () => true;
export const isStaff: Access = ({ req }: { req: PayloadRequest }) => isStaffUser(req.user);
export const isAdmin: Access = ({ req }: { req: PayloadRequest }) => hasRole(req.user, 'admin');
export const isEditorOrAdmin: Access = ({ req }: { req: PayloadRequest }) =>
  hasRole(req.user, 'admin', 'editor');

export const publishedOrStaff: Access = ({ req }: { req: PayloadRequest }) => {
  if (isStaffUser(req.user)) return true;
  return { _status: { equals: 'published' } };
};

export const fieldIsAdmin: FieldAccess = ({ req }) => hasRole(req.user, 'admin');
export const fieldIsEditorOrAdmin: FieldAccess = ({ req }) => hasRole(req.user, 'admin', 'editor');