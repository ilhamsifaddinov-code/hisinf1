import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { anyone, isEditorOrAdmin } from '../access'

export const Regions: CollectionConfig = {
  slug: 'regions',
  labels: { singular: 'Hudud', plural: 'Hududlar' },
  admin: {
    useAsTitle: 'title',
    group: 'Taksonomiya',
    defaultColumns: ['title', 'slug'],
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
      label: 'Hudud nomi',
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