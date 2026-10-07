import type { CollectionConfig } from 'payload';
import { slugField } from '../fields/slug';
import { anyone, isEditorOrAdmin } from '../access';

export const Periods: CollectionConfig = {
  slug: 'periods',
  labels: { singular: 'Davr', plural: 'Davrlar' },
  admin: {
    useAsTitle: 'title',
    group: 'Taksonomiya',
    defaultColumns: ['title', 'startYear', 'endYear', 'color'],
  },
  access: {
    read: anyone,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  defaultSort: 'startYear',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Davr nomi',
    },
    slugField('title'),
    {
      name: 'startYear',
      type: 'number',
      required: true,
      label: 'Boshlanish yili (mil. avv. manfiy)',
      admin: {
        description: 'Masalan: mil. avv. 500-yil uchun -500, milodiy 1370-yil uchun 1370',
      },
    },
    {
      name: 'endYear',
      type: 'number',
      label: 'Tugash yili',
    },
    {
      name: 'color',
      type: 'select',
      required: true,
      defaultValue: 'ochre',
      options: [
        { label: 'Ochre (Sariq-jigarrang)', value: 'ochre' },
        { label: 'Teal (Moviy-yashil)', value: 'teal' },
        { label: 'Brick (Gʻisht qizil)', value: 'brick' },
        { label: 'Olive (Zaytun rang)', value: 'olive' },
        { label: 'Indigo (Toʻq koʻk)', value: 'indigo' },
        { label: 'Sand (Qumrang)', value: 'sand' },
      ],
      label: 'Rang kodi',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Davr tavsifi',
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      label: 'Muqova rasmi',
    },
  ],
};