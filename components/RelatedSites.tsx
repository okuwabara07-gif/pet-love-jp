import Link from 'next/link'

const RELATED_SITES = [
  { name: "AI LAB", url: "https://ai-lab-jp.vercel.app" },
  { name: "ベビーノート", url: "https://baby-note-jp.vercel.app" },
  { name: "バイクノート", url: "https://bike-note-jp.vercel.app" },
  { name: "カメラLAB", url: "https://camera-lab-jp.vercel.app" },
  { name: "childcare-jp", url: "https://childcare-jp.vercel.app" },
  { name: "coffee-note-jp", url: "https://coffee-note-jp.vercel.app" },
  { name: "cooking-note-jp", url: "https://cooking-note-jp.vercel.app" },
  { name: "english-lab-jp", url: "https://english-lab-jp.vercel.app" },

]

export default function RelatedSites() {
  return (
    <div style={{
      marginTop: '3rem',
      padding: '1.5rem',
      background: '#f8f9fa',
      borderRadius: '8px',
      borderTop: '2px solid #e9ecef'
    }}>
      <h3 style={{
        fontSize: '1rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#333'
      }}>関連サイト</h3>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        {RELATED_SITES.map((site) => (
          
            key={site.url}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.4rem 0.8rem',
              background: '#fff',
              border: '1px solid #dee2e6',
              borderRadius: '20px',
              fontSize: '0.8rem',
              color: '#495057',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}
          >
            {site.name}
          </a>
        ))}
      </div>
    </div>
  )
}
