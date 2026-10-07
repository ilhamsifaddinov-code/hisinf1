import type { CollectionConfig } from 'payload';
import { slugField } from '../fields/slug';
import { sourcesField } from '../fields/sources';
import { publishedOrStaff, isEditorOrAdmin, isStaff } from '../access';

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Maqola', plural: 'Maqolalar' },
  admin: {
    useAsTitle: 'title',
    group: 'Kontent',
    defaultColumns: ['title', 'author', 'period', '_status'],
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  access: {
    read: publishedOrStaff,
    create: isStaff,
    update: isStaff,
    delete: isEditorOrAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Sarlavha',
    },
    slugField('title'),
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Qisqacha mazmun',
      maxLength: 280,
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Muqova rasmi',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      label: 'Maqola matni',
    },
    {
      name: 'readingTime',
      type: 'number',
      label: "O'qish vaqti (daqiqa)",
      admin: { position: 'sidebar' },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Muallif',
      admin: { position: 'sidebar' },
    },
    {
      name: 'period',
      type: 'relationship',
      relationTo: 'periods',
      required: true,
      label: 'Tarixiy davr',
      admin: { position: 'sidebar' },
    },
    {
      name: 'regions',
      type: 'relationship',
      relationTo: 'regions',
      hasMany: true,
      label: 'Hududlar',
      admin: { position: 'sidebar' },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'Kategoriyalar',
      admin: { position: 'sidebar' },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      label: 'Teglar',
      admin: { position: 'sidebar' },
    },
    sourcesField(),
  ],
};

export default Posts;