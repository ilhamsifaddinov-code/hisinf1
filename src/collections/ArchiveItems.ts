import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { anyone, isEditorOrAdmin } from '../access'

export const ArchiveItems: CollectionConfig = {
  slug: 'archive-items',
  labels: { singular: 'Arxiv birligi', plural: 'Media arxiv' },
  admin: {
    useAsTitle: 'title',
    group: 'Tarix',
    defaultColumns: ['title', 'kind', 'yearText'],
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
      label: 'Nomi',
    },
    slugField('title'),
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'photo',
      options: [
        { label: 'Fotosurat', value: 'photo' },
        { label: 'Tarixiy hujjat', value: 'document' },
        { label: 'Qoʻlyozma', value: 'manuscript' },
        { label: 'Xarita', value: 'map' },
        { label: 'Tanga / Numizmatika', value: 'coin' },
        { label: 'Boshqa', value: 'other' },
      ],
      label: 'Turi',
    },
    {
      name: 'files',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Fayl / Rasm',
    },
    {
      name: 'year',
      type: 'number',
      label: 'Yili (raqamda)',
    },
    {
      name: 'yearText',
      type: 'text',
      localized: true,
      label: 'Sana matni (masalan: XIV asr)',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Tavsif',
    },
    {
      name: 'source',
      type: 'text',
      label: 'Saqlanayotgan joy / fond',
    },
    {
      name: 'period',
      type: 'relationship',
      relationTo: 'periods',
      label: 'Tarixiy davr',
    },
    {
      name: 'regions',
      type: 'relationship',
      relationTo: 'regions',
      hasMany: true,
      label: 'Hududlar',
    },
  ],
}