import Link from 'next/link'

const RELATED_SITES = [
  { name: 'アフィリエイトLAB', url: 'https://affiliate-lab-jp.vercel.app' },
  { name: 'FXノート', url: 'https://fx-note-jp.vercel.app' },
  { name: 'ローンノート', url: 'https://loan-note-jp.vercel.app' },
  { name: 'マネーノート', url: 'https://money-note-jp.vercel.app' },
  { name: 'NISAノート', url: 'https://nisa-note-jp.vercel.app' },
  { name: '節約LAB', url: 'https://saving-lab-jp.vercel.app' },
]

export default function RelatedSites() {
  return (
    <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}>関連サイト</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {RELATED_SITES.map((site) => (
          <a key={site.url} href={site.url} target="_blank" rel="noopener noreferrer"
            style={{ padding: '0.4rem 0.8rem', background: '#fff', border: '1px solid #dee2e6', borderRadius: '20px', fontSize: '0.8rem', color: '#495057', textDecoration: 'none' }}>
            {site.name}
          </a>
        ))}
      </div>
    </div>
  )
}
