const fs = require('fs')
const path = require('path')
const dirs = ['content/blog','content/posts','content/articles']
let slugs = []
for (const d of dirs) {
  const full = path.join(__dirname, d)
  if (fs.existsSync(full)) {
    slugs = fs.readdirSync(full).filter(f => f.match(/\.(mdx?|md)$/)).map(f => f.replace(/\.(mdx?|md)$/, ''))
    if (slugs.length) break
  }
}
fs.mkdirSync(path.join(__dirname, 'public'), { recursive: true })
fs.writeFileSync(path.join(__dirname, 'public/slugs.json'), JSON.stringify(slugs))
console.log('slugs:', slugs.length)
