import type { Field } from 'payload'

export function linkField(): Field {
  return {
    name: 'link',
    type: 'group',
    fields: [
      {
        name: 'type',
        type: 'select',
        defaultValue: 'route',
        options: [
          { label: 'Ichki hujjat', value: 'internal' },
          { label: 'Tayyor boʻlim', value: 'route' },
          { label: 'Tashqi havola', value: 'custom' },
        ],
      },
      {
        name: 'route',
        type: 'select',
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'route',
        },
        options: [
          { label: 'Bosh sahifa', value: 'home' },
          { label: 'Maqolalar', value: 'posts' },
          { label: 'Davrlar', value: 'periods' },
          { label: 'Xronologiya', value: 'timeline' },
          { label: 'Shaxslar', value: 'persons' },
          { label: 'Arxiv', value: 'archive' },
          { label: 'Xarita', value: 'map' },
          { label: 'Qidiruv', value: 'search' },
        ],
      },
      {
        name: 'url',
        type: 'text',
        label: 'Tashqi havola',
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'custom',
        },
      },
      {
        name: 'newTab',
        type: 'checkbox',
        label: 'Yangi oynada ochilsin',
      },
    ],
  }
}