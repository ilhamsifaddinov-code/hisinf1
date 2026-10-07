import type { Field } from 'payload';
import { slugify } from '../lib/slugify';

export function slugField(sourceField = 'title'): Field {
  return {
    name: 'slug',
    type: 'text',
    unique: true,
    index: true,
    admin: {
      position: 'sidebar',
      description: "Avtomatik yaratiladi. Chop etilgandan keyin o'zgartirmang.",
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          if (value && typeof value === 'string') return slugify(value);
          if (data && data[sourceField] && typeof data[sourceField] === 'string') {
            return slugify(data[sourceField]);
          }
          return `item-${Date.now()}`;
        },
      ],
    },
  };
}

// Barcha import usullari uchun (Named va Default):
export default slugField;
export const slug = slugField;