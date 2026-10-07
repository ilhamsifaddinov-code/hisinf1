import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { sourcesField } from '../fields/sources'
import { anyone, isEditorOrAdmin } from '../access'

export const Persons: CollectionConfig = {
  slug: 'persons',
  labels: { singular: 'Tarixiy shaxs', plural: 'Tarixiy shaxslar' },
  admin: {
    useAsTitle: 'name',
    group: 'Tarix',
    defaultColumns: ['name', 'birthYear', 'deathYear', 'roles'],
  },
  access: {
    read: anyone,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  defaultSort: 'name',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: 'Shaxs ismi / taxallusi',
    },
    slugField('name'),
    {
      name: 'birthYear',
      type: 'number',
      label: 'Tugʻilgan yili (mil. avv. manfiy)',
    },
    {
      name: 'deathYear',
      type: 'number',
      label: 'Vafot etgan yili',
    },
    {
      name: 'yearsApproximate',
      type: 'checkbox',
      label: 'Yillari taxminiy',
    },
    {
      name: 'roles',
      type: 'text',
      localized: true,
      label: 'Faoliyati / kasbi',
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      label: 'Portret surati',
    },
    {
      name: 'shortBio',
      type: 'textarea',
      localized: true,
      label: 'Qisqacha tarjimai hol',
      maxLength: 300,
    },
    {
      name: 'biography',
      type: 'richText',
      localized: true,
      label: 'Batafsil biografiya',
    },
    {
      name: 'period',
      type: 'relationship',
      relationTo: 'periods',
      label: 'Tegishli davri',
    },
    {
      name: 'regions',
      type: 'relationship',
      relationTo: 'regions',
      hasMany: true,
      label: 'Faoliyat hududlari',
    },
    sourcesField(),
  ],
}