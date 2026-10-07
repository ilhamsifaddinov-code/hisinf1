import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  let user: any = null
  let dbConnected = false

  try {
    const payloadConfig = await config
    if (process.env.DATABASE_URI) {
      const payload = await getPayload({ config: payloadConfig })
      const headers = await getHeaders()
      const authResult = await payload.auth({ headers })
      user = authResult?.user || null
      dbConnected = true
    }
  } catch (err: any) {
    dbConnected = false
  }

  return (
    <div className="home" style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div className="content" style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>

        <h1 style={{ marginTop: '1rem', fontSize: '1.8rem', fontWeight: 800 }}>
          HISINF — Tarixiy Ma'lumotlar Portali
        </h1>

        {dbConnected ? (
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#e6f4ea', borderRadius: '12px', border: '1px solid #34a853' }}>
            <p style={{ color: '#137333', fontWeight: 600 }}>
              ✅ PostgreSQL ma'lumotlar bazasi muvaffaqiyatli ulandi!
            </p>
            {user && (
              <p style={{ marginTop: '0.5rem', color: '#137333' }}>Xush kelibsiz, {user.email || user.displayName}</p>
            )}
            <div style={{ marginTop: '1rem' }}>
              <a
                href="/admin"
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  background: '#8c2f1b',
                  color: '#fff',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                Admin panelga kirish (/admin) →
              </a>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: '#fef7e0', borderRadius: '12px', border: '1px solid #f9ab00', textAlign: 'left' }}>
            <h3 style={{ color: '#b06000', margin: 0, fontWeight: 700, fontSize: '1.1rem' }}>
              ⚠️ PostgreSQL ulanishi kutilmoqda (DATABASE_URI)
            </h3>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#5f6368', lineHeight: 1.5 }}>
              Loyiha ildizidagi <code>.env</code> faylida <code>DATABASE_URI</code> kiritilmagan.
            </p>
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#fff', borderRadius: '8px', border: '1px solid #dadce0', fontSize: '0.85rem' }}>
              <strong>1 daqiqada bepul baza ulash:</strong>
              <p style={{ marginTop: '4px' }}>
                1. <a href="https://neon.tech" target="_blank" rel="noreferrer" style={{ color: '#1a73e8' }}>neon.tech</a> saytiga kiring va bepul PostgreSQL oching.<br />
                2. Berilgan Connection URL ni <code>.env</code> faylingizdagi <code>DATABASE_URI=...</code> ga yozing.
              </p>
            </div>
          </div>
        )}

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <a
            href="/admin"
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              background: '#8c2f1b',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            Admin panel (/admin)
          </a>
        </div>
      </div>
    </div>
  )
}