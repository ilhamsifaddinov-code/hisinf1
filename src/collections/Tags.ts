import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { anyone, isEditorOrAdmin } from '../access'

export const Tags: CollectionConfig = {
  slug: 'tags',
  labels: { singular: 'Teg', plural: 'Teglar' },
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
      label: 'Teg nomi',
    },
    slugField('title'),
  ],
}