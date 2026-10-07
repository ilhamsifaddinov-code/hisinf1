import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { anyone, isEditorOrAdmin } from '../access'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Kategoriya', plural: 'Kategoriyalar' },
  admin: {
    useAsTitle: 'title',
    group: 'Taksonomiya',
  },
  access: {
    read: anyone,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Kategoriya nomi',
    },
    slugField('title'),
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Tavsif',
    },
  ],
}