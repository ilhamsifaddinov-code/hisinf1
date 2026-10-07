import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { anyone, isEditorOrAdmin } from '../access'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Statik sahifa', plural: 'Statik sahifalar' },
  admin: {
    useAsTitle: 'title',
    group: 'Kontent',
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
      label: 'Sarlavha',
    },
    slugField('title'),
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      label: 'Sahifa matni',
    },
    {
      name: 'showInFooter',
      type: 'checkbox',
      label: 'Footerda koʻrsatilsin',
    },
  ],
}