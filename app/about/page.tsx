import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'このサイトについて',
  description: 'サイト運営者情報・アフィリエイト・広告ポリシーについて',
}
export default function AboutPage() {
  return (
    <main style={{maxWidth:'700px',margin:'0 auto',padding:'3rem 1rem'}}>
      <h1 style={{fontSize:'1.6rem',marginBottom:'2rem',borderBottom:'2px solid #eee',paddingBottom:'1rem'}}>このサイトについて</h1>
      <section style={{marginBottom:'2rem'}}>
        <h2 style={{fontSize:'1.1rem',marginBottom:'0.8rem'}}>運営者情報</h2>
        <p style={{color:'#555',lineHeight:1.8}}>本サイトはAOKAE合同会社が運営する情報メディアです。</p>
      </section>
      <section style={{marginBottom:'2rem'}}>
        <h2 style={{fontSize:'1.1rem',marginBottom:'0.8rem'}}>広告・アフィリエイトについて</h2>
        <p style={{color:'#555',lineHeight:1.8}}>本サイトはAmazonアソシエイト・楽天アフィリエイト等のアフィリエイトプログラムおよびGoogle AdSenseによる広告を掲載しています。</p>
      </section>
      <section>
        <h2 style={{fontSize:'1.1rem',marginBottom:'0.8rem'}}>お問い合わせ</h2>
        <p style={{color:'#555',lineHeight:1.8}}>ご質問は <a href="https://aokae.net" style={{color:'#333'}}>AOKAE合同会社</a> までお問い合わせください。</p>
      </section>
    </main>
  )
}
