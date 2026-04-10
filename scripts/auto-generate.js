const https = require('https');
const fs = require('fs');
const path = require('path');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const AMAZON_TRACKING_ID = process.env.AMAZON_TRACKING_ID || 'haircolorab22-22';
const RAKUTEN_AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID || '5253b9ed.08f9d938.5253b9ee.e71aefe8';
const MOSHIMO_ID = '1184522';
const SITE_NAME = 'ペットラブJP';
const TOPIC = 'ペット用品・犬猫グッズ・ペットフード';
const CRITERIA = '安全性・品質・コスパ・使いやすさ・口コミ';
const A8_PRODUCT_NAME = 'マツキヨ公式オンラインショップ';
const A8_PRODUCT_URL = 'https://px.a8.net/svt/ejp?a8mat=4AZR8U+HXZDEA+4LJK+5YZ75';
const A8_PRODUCT_DESC = '日用品・美容品が豊富に揃う';

function moshimoAmazonLink(keyword) {
  const searchUrl = encodeURIComponent('https://www.amazon.co.jp/s?k=' + encodeURIComponent(keyword) + '&tag=' + AMAZON_TRACKING_ID);
  return 'https://af.moshimo.com/af/c/click?a_id=' + MOSHIMO_ID + '&p_id=170&pc_id=185&pl_id=4062&url=' + searchUrl;
}

function moshimoRakutenLink(keyword) {
  const searchUrl = encodeURIComponent('https://search.rakuten.co.jp/search/mall/' + encodeURIComponent(keyword) + '/?f=1&af=' + RAKUTEN_AFFILIATE_ID);
  return 'https://af.moshimo.com/af/c/click?a_id=' + MOSHIMO_ID + '&p_id=54&pc_id=54&pl_id=616&url=' + searchUrl;
}

function request(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

function getKeywords() {
  const base = TOPIC.split('・')[0];
  return [
    base + 'おすすめランキング',
    base + '人気商品 比較',
    base + '選び方 失敗しない',
    base + '効果 口コミ',
    base + '初心者 どれがいい',
  ];
}

async function generateArticle(keyword) {
  const year = new Date().getFullYear();
  const amazonLink = moshimoAmazonLink(keyword);
  const rakutenLink = moshimoRakutenLink(keyword);
  const imgSeed = Math.abs(keyword.split('').reduce((a,c) => a + c.charCodeAt(0), 0));
  const title = '【' + year + '年最新】' + keyword + 'おすすめTOP5｜専門家が徹底比較';

  const prompt = 'あなたはプロのレビューライター兼SEO専門家です。\n' +
    '「' + keyword + '」について、読者が購入したくなる高品質な比較記事を日本語で書いてください。\n\n' +
    '必須条件:\n' +
    '1. 冒頭に結論（おすすめ1位）を書く\n' +
    '2. 実際の商品名を使う（架空の商品名は禁止）\n' +
    '3. 各商品のメリット・デメリットを正直に書く\n' +
    '4. 読者のタイプ別におすすめを提示する\n' +
    '5. 評価基準: ' + CRITERIA + '\n\n' +
    '以下の形式で出力:\n\n' +
    '---\n' +
    'title: "' + title + '"\n' +
    'date: "' + new Date().toISOString().split('T')[0] + '"\n' +
    'genre: "' + TOPIC.split('・')[0] + '"\n' +
    'excerpt: "' + keyword + 'のおすすめ商品を専門家が徹底比較。失敗しない選び方も解説。"\n' +
    '---\n\n' +
    '![' + keyword + '](https://picsum.photos/seed/' + imgSeed + '/800/450)\n\n' +
    '## 結論：迷ったらこれを買えば間違いなし\n\n' +
    '> **PR情報**: ' + A8_PRODUCT_NAME + 'は今注目の商品です。\n' +
    '> [→ ' + A8_PRODUCT_NAME + 'をチェックする](' + A8_PRODUCT_URL + ')\n\n' +
    '[→ Amazonで' + keyword + 'を探す](' + amazonLink + ')\n' +
    '[→ 楽天で' + keyword + 'を探す](' + rakutenLink + ')\n\n' +
    '## ' + keyword + ' おすすめTOP5 比較表\n\n' +
    '(実際の商品名を使って比較表を作成。各商品の特徴・価格・評価を記載)\n\n' +
    '## 選び方の3つのポイント\n\n' +
    CRITERIA.split('・').map(c => '### ' + c + '\n（詳しく解説）\n').join('\n') + '\n' +
    '## 第1位〜第5位 詳細レビュー\n\n' +
    '(各商品150文字以上。実際の商品名・価格・特徴・メリット・デメリット・おすすめの人)\n\n' +
    '## ' + A8_PRODUCT_DESC + '\n\n' +
    '[→ ' + A8_PRODUCT_NAME + 'の詳細を見る](' + A8_PRODUCT_URL + ')\n\n' +
    '[→ Amazonで今すぐ確認](' + amazonLink + ')\n' +
    '[→ 楽天で最安値を見る](' + rakutenLink + ')\n\n' +
    '## よくある質問\n\n' +
    '## まとめ\n\n' +
    '※本記事はアフィリエイト広告を含みます。';

  const body = JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 3000,
    messages: [{ role: 'user', content: prompt }]
  });

  const res = await request({
    hostname: 'api.anthropic.com',
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Length': Buffer.byteLength(body)
    }
  }, body);

  const data = JSON.parse(res.body);
  if (!data.content || !data.content[0]) throw new Error('API error: ' + res.body.slice(0, 200));
  return data.content[0].text;
}

async function main() {
  const blogDir = path.join(process.cwd(), 'content/blog');
  if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });
  const keywords = getKeywords();
  console.log('Generating ' + keywords.length + ' articles for ' + SITE_NAME);
  for (const keyword of keywords) {
    try {
      console.log('Generating: ' + keyword);
      const content = await generateArticle(keyword);
      const filename = Date.now() + '.mdx';
      fs.writeFileSync(path.join(blogDir, filename), content);
      console.log('Saved: ' + filename);
      await new Promise(r => setTimeout(r, 15000));
    } catch (e) {
      console.error('Error: ' + keyword, e.message);
    }
  }
  console.log('Done!');
}

main();
