import type { GlobalConfig } from 'payload'
import { linkField } from '../fields/link'
import { anyone, isEditorOrAdmin } from '../access'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Sayt etagi (Footer)',
  admin: { group: 'Sayt sozlamalari' },
  access: { read: anyone, update: isEditorOrAdmin },
  fields: [
    {
      name: 'columns',
      type: 'array',
      maxRows: 4,
      label: 'Ustunlar',
      fields: [
        { name: 'title', type: 'text', localized: true, required: true, label: 'Sarlavha' },
        {
          name: 'links',
          type: 'array',
          label: 'Havolalar',
          fields: [
            { name: 'label', type: 'text', localized: true, required: true, label: 'Nomi' },
            linkField(),
          ],
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      localized: true,
      label: 'Mualliflik huquqi matni',
    },
  ],
}