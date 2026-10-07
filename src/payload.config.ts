import { postgresAdapter } from '@payloadcms/db-postgres';
import { resendAdapter } from '@payloadcms/email-resend';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import { en } from '@payloadcms/translations/languages/en';
import { ru } from '@payloadcms/translations/languages/ru';
import path from 'path';
import { buildConfig, type Plugin } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Posts } from './collections/Posts';
import { Periods } from './collections/Periods';
import { Regions } from './collections/Regions';
import { Categories } from './collections/Categories';
import { Tags } from './collections/Tags';
import { Persons } from './collections/Persons';
import { Events } from './collections/Events';
import { Places } from './collections/Places';
import { ArchiveItems } from './collections/ArchiveItems';
import { Pages } from './collections/Pages';

import { Header } from './globals/Header';
import { Footer } from './globals/Footer';
import { SiteSettings } from './globals/SiteSettings';
import { HomePage } from './globals/HomePage';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

const plugins: Plugin[] = [];
if (process.env.R2_BUCKET && process.env.R2_ACCOUNT_ID) {
  plugins.push(
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) =>
            process.env.R2_PUBLIC_URL
              ? `${process.env.R2_PUBLIC_URL}/${prefix}/${filename}`
              : `/${prefix}/${filename}`,
        },
      },
      bucket: process.env.R2_BUCKET,
      config: {
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        region: 'auto',
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID!,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
        },
      },
      clientUploads: true,
    })
  );
}

export default buildConfig({
  serverURL,
  cors: [serverURL],
  csrf: [serverURL],
  graphQL: { disable: true },
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' — HISINF Admin' },
    importMap: { baseDir: path.resolve(dirname) },
  },
  i18n: { supportedLanguages: { en, ru } },
  localization: {
    locales: ['uz', 'kaa'],
    defaultLocale: 'uz',
    fallback: true,
  },
  collections: [
    Users, Media, Posts, Periods, Regions, Categories, Tags, Persons, Events, Places, ArchiveItems, Pages,
  ],
  globals: [Header, Footer, SiteSettings, HomePage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'hisinf-secret-key-32-chars-long-secure',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI || '' } }),
  sharp,
  plugins,
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        defaultFromAddress: process.env.EMAIL_FROM || 'noreply@hisinf.uz',
        defaultFromName: 'HISINF',
        apiKey: process.env.RESEND_API_KEY,
      })
    : undefined,
});