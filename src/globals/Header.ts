import type { GlobalConfig } from 'payload'
import { linkField } from '../fields/link'
import { anyone, isEditorOrAdmin } from '../access'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Asosiy menyu (Header)',
  admin: { group: 'Sayt sozlamalari' },
  access: { read: anyone, update: isEditorOrAdmin },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      maxRows: 8,
      label: 'Menyu boʻlimlari',
      fields: [
        { name: 'label', type: 'text', localized: true, required: true, label: 'Nomi' },
        linkField(),
        {
          name: 'children',
          type: 'array',
          maxRows: 12,
          label: 'Quyi menyu (Submenu)',
          fields: [
            { name: 'label', type: 'text', localized: true, required: true, label: 'Quyi boʻlim nomi' },
            { name: 'description', type: 'text', localized: true, label: 'Izoh' },
            linkField(),
          ],
        },
      ],
    },
  ],
}