import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { sourcesField } from '../fields/sources'
import { anyone, isEditorOrAdmin } from '../access'

export const Places: CollectionConfig = {
  slug: 'places',
  labels: { singular: 'Tarixiy joy', plural: 'Tarixiy joylar' },
  admin: {
    useAsTitle: 'name',
    group: 'Tarix',
    defaultColumns: ['name', 'placeType', 'region'],
  },
  access: {
    read: anyone,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: 'Joy nomi',
    },
    slugField('name'),
    {
      name: 'lat',
      type: 'number',
      required: true,
      label: 'Kenglik (Latitude)',
    },
    {
      name: 'lng',
      type: 'number',
      required: true,
      label: 'Uzunlik (Longitude)',
    },
    {
      name: 'placeType',
      type: 'select',
      required: true,
      defaultValue: 'fortress',
      options: [
        { label: 'Qalʼa / Qoʻrgʻon', value: 'fortress' },
        { label: 'Shahar', value: 'city' },
        { label: 'Maqbara', value: 'mausoleum' },
        { label: 'Masjid / Madrasa', value: 'mosque' },
        { label: 'Arxeologik yodgorlik', value: 'archaeological' },
        { label: 'Jang maydoni', value: 'battle' },
        { label: 'Boshqa', value: 'other' },
      ],
      label: 'Obida turi',
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
      label: 'Qisqacha tavsif',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Surati',
    },
    {
      name: 'region',
      type: 'relationship',
      relationTo: 'regions',
      label: 'Hudud',
    },
    {
      name: 'periods',
      type: 'relationship',
      relationTo: 'periods',
      hasMany: true,
      label: 'Davrlar',
    },
    sourcesField(),
  ],
}