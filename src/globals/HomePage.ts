import type { GlobalConfig } from 'payload'
import { linkField } from '../fields/link'
import { anyone, isEditorOrAdmin } from '../access'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Bosh sahifa konfiguratsiyasi',
  admin: { group: 'Sayt sozlamalari' },
  access: { read: anyone, update: isEditorOrAdmin },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Asosiy banner',
      fields: [
        { name: 'title', type: 'text', localized: true, label: 'Sarlavha' },
        { name: 'subtitle', type: 'textarea', localized: true, label: 'Quyi matn' },
        { name: 'ctaLabel', type: 'text', localized: true, label: 'Tugma matni' },
        linkField(),
      ],
    },
    {
      name: 'featuredPeriods',
      type: 'relationship',
      relationTo: 'periods',
      hasMany: true,
      label: 'Tavsiya etilgan davrlar',
    },
  ],
}