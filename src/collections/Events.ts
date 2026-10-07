import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { sourcesField } from '../fields/sources'
import { anyone, isEditorOrAdmin } from '../access'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: { singular: 'Voqea', plural: 'Voqealar' },
  admin: {
    useAsTitle: 'title',
    group: 'Tarix',
    defaultColumns: ['title', 'year', 'period', 'importance'],
  },
  access: {
    read: anyone,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  defaultSort: 'year',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Voqea sarlavhasi',
    },
    slugField('title'),
    {
      name: 'year',
      type: 'number',
      required: true,
      label: 'Yili (mil. avv. manfiy)',
    },
    {
      name: 'endYear',
      type: 'number',
      label: 'Tugash yili (oraliq boʻlsa)',
    },
    {
      name: 'approximate',
      type: 'checkbox',
      label: 'Taxminiy sana',
    },
    {
      name: 'importance',
      type: 'select',
      required: true,
      defaultValue: '2',
      options: [
        { label: '1 — Asosiy burilish nuqtasi (Eng muhim)', value: '1' },
        { label: '2 — Muhim tarixiy voqea', value: '2' },
        { label: '3 — Qoʻshimcha maʼlumot', value: '3' },
      ],
      label: 'Muhimlik darajasi',
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Qisqacha bayon',
      maxLength: 500,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Surati',
    },
    {
      name: 'period',
      type: 'relationship',
      relationTo: 'periods',
      required: true,
      label: 'Tarixiy davr',
    },
    {
      name: 'place',
      type: 'relationship',
      relationTo: 'places',
      label: 'Tarixiy joy',
    },
    {
      name: 'persons',
      type: 'relationship',
      relationTo: 'persons',
      hasMany: true,
      label: 'Bogʻliq shaxslar',
    },
    sourcesField(),
  ],
}