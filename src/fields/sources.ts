import type { Field } from 'payload';

export function sourcesField(): Field {
  return {
    name: 'sources',
    type: 'array',
    label: 'Manbalar',
    labels: { singular: 'Manba', plural: 'Manbalar' },
    admin: { initCollapsed: true },
    fields: [
      {
        name: 'type',
        type: 'select',
        required: true,
        defaultValue: 'book',
        options: [
          { label: 'Kitob', value: 'book' },
          { label: 'Maqola', value: 'article' },
          { label: 'Arxiv hujjati', value: 'archive' },
          { label: 'Qoʻlyozma', value: 'manuscript' },
          { label: 'Veb-sayt', value: 'website' },
          { label: 'Boshqa', value: 'other' },
        ],
      },
      { name: 'title', type: 'text', required: true, label: 'Nomi' },
      { name: 'author', type: 'text', label: 'Muallif(lar)' },
      { name: 'year', type: 'text', label: 'Yili' },
      { name: 'publisher', type: 'text', label: 'Nashriyot' },
      { name: 'url', type: 'text', label: 'Havola' },
    ],
  };
}