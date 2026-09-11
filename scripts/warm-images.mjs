// Requests every optimised image the landing page references, so the first
// visitor after a deploy gets encoded images from the cache instead of waiting
// for sharp. Goes through nginx (WARM_ORIGIN) so its proxy cache fills too.
const origin = process.env.WARM_ORIGIN || 'https://capitalcareerclub.com'
const concurrency = 4

const html = await (await fetch(`${origin}/`)).text()
const urls = new Set()
for (const match of html.matchAll(/\/_next\/image\?[^"\s,]+/g)) {
  urls.add(match[0].replaceAll('&amp;', '&'))
}

const queue = [...urls]
let failed = 0
async function worker() {
  for (let url = queue.shift(); url; url = queue.shift()) {
    const res = await fetch(`${origin}${url}`, {
      headers: { Accept: 'image/webp,image/*,*/*;q=0.8' },
    }).catch(() => null)
    if (!res?.ok) failed++
    await res?.arrayBuffer().catch(() => {})
  }
}
await Promise.all(Array.from({ length: concurrency }, worker))

console.log(`Warmed ${urls.size - failed}/${urls.size} images`)
if (failed) process.exitCode = 1
