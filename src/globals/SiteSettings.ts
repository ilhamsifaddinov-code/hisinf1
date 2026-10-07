import type { GlobalConfig } from 'payload'
import { anyone, isEditorOrAdmin } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Umumiy sayt sozlamalari',
  admin: { group: 'Sayt sozlamalari' },
  access: { read: anyone, update: isEditorOrAdmin },
  fields: [
    { name: 'siteName', type: 'text', localized: true, label: 'Sayt nomi' },
    { name: 'tagline', type: 'text', localized: true, label: 'Shior / Tavsif' },
    { name: 'contactEmail', type: 'text', label: 'Aloqa emaili' },
  ],
}