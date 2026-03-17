/**
 * Generates icon-192.png and icon-512.png using only Node.js built-ins.
 * Writes a raw RGBA bitmap and encodes it as a valid PNG using zlib.
 */
import { createDeflateRaw } from 'zlib'
import { writeFileSync } from 'fs'
import { promisify } from 'util'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const deflateRaw = promisify(createDeflateRaw)

const __dir = dirname(fileURLToPath(import.meta.url))

// ── helpers ──────────────────────────────────────────────────────────────────

function crc32(buf) {
  let crc = 0xffffffff
  const table = crc32.table || (crc32.table = buildTable())
  for (const b of buf) crc = (crc >>> 8) ^ table[(crc ^ b) & 0xff]
  return (crc ^ 0xffffffff) >>> 0
}
function buildTable() {
  const t = new Uint32Array(256)
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[i] = c
  }
  return t
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii')
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const crcBuf = Buffer.concat([typeBytes, data])
  const crcVal = Buffer.alloc(4)
  crcVal.writeUInt32BE(crc32(crcBuf))
  return Buffer.concat([len, typeBytes, data, crcVal])
}

async function buildPNG(size) {
  const W = size, H = size

  // Allocate RGBA bitmap
  const pixels = new Uint8Array(W * H * 4)

  // Background color: #FF6B35 with rounded corners
  const R = 0xff, G = 0x6b, B = 0x35
  const radius = Math.round(size * 0.1875) // ~96/512 ≈ 18.75% → produces a nice rounded square

  // Fill pixels
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * 4

      // Distance from nearest corner for rounded rect check
      const cx = Math.max(radius - x, 0, x - (W - 1 - radius))
      const cy = Math.max(radius - y, 0, y - (H - 1 - radius))
      const inRect = cx * cx + cy * cy <= radius * radius

      if (inRect) {
        pixels[idx]     = R
        pixels[idx + 1] = G
        pixels[idx + 2] = B
        pixels[idx + 3] = 255
      } else {
        // Transparent outside rounded corners
        pixels[idx]     = 0
        pixels[idx + 1] = 0
        pixels[idx + 2] = 0
        pixels[idx + 3] = 0
      }
    }
  }

  // Draw a bold "Y" in white
  // We'll rasterise the letter manually using Bezier/line segments on a grid
  drawY(pixels, W, H)

  // Build PNG scanlines: each row is filter-byte (0) + raw RGBA bytes
  const scanlines = Buffer.alloc(H * (1 + W * 4))
  for (let y = 0; y < H; y++) {
    const rowStart = y * (1 + W * 4)
    scanlines[rowStart] = 0 // filter type None
    for (let x = 0; x < W; x++) {
      const src = (y * W + x) * 4
      const dst = rowStart + 1 + x * 4
      scanlines[dst]     = pixels[src]
      scanlines[dst + 1] = pixels[src + 1]
      scanlines[dst + 2] = pixels[src + 2]
      scanlines[dst + 3] = pixels[src + 3]
    }
  }

  const compressed = await new Promise((res, rej) => {
    const zlib = createDeflateRaw({ level: 6 })
    const chunks = []
    zlib.on('data', d => chunks.push(d))
    zlib.on('end', () => res(Buffer.concat(chunks)))
    zlib.on('error', rej)
    zlib.end(scanlines)
  })

  const IHDR = Buffer.alloc(13)
  IHDR.writeUInt32BE(W, 0)
  IHDR.writeUInt32BE(H, 4)
  IHDR[8]  = 8   // bit depth
  IHDR[9]  = 6   // color type RGBA
  IHDR[10] = 0   // compression
  IHDR[11] = 0   // filter
  IHDR[12] = 0   // interlace

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), // PNG signature
    chunk('IHDR', IHDR),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

// ── Draw "Y" on the pixel buffer ─────────────────────────────────────────────
function drawY(pixels, W, H) {
  // We'll draw on a normalised 0-1 coordinate space.
  // The Y consists of:
  //   - two diagonal arms going from top-left and top-right down to center
  //   - one vertical stem going from center down to bottom

  const stroke = W * 0.11  // stroke width relative to icon size

  // Y geometry (normalised 0–1)
  // Top-left arm:   (0.18, 0.12) → (0.50, 0.52)
  // Top-right arm:  (0.82, 0.12) → (0.50, 0.52)
  // Stem:           (0.50, 0.52) → (0.50, 0.88)

  const segments = [
    [0.18, 0.12, 0.50, 0.52],
    [0.82, 0.12, 0.50, 0.52],
    [0.50, 0.52, 0.50, 0.88],
  ]

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const nx = x / W
      const ny = y / H
      let onStroke = false
      for (const [x1, y1, x2, y2] of segments) {
        if (distToSegment(nx, ny, x1, y1, x2, y2) * W < stroke / 2) {
          onStroke = true
          break
        }
      }
      if (onStroke) {
        const idx = (y * W + x) * 4
        pixels[idx]     = 255
        pixels[idx + 1] = 255
        pixels[idx + 2] = 255
        pixels[idx + 3] = 255
      }
    }
  }
}

function distToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay
  const lenSq = dx * dx + dy * dy
  let t = lenSq > 0 ? ((px - ax) * dx + (py - ay) * dy) / lenSq : 0
  t = Math.max(0, Math.min(1, t))
  const qx = ax + t * dx, qy = ay + t * dy
  return Math.hypot(px - qx, py - qy)
}

// ── Main ─────────────────────────────────────────────────────────────────────
const publicDir = resolve(__dir, '../public')

for (const size of [192, 512]) {
  const png = await buildPNG(size)
  const out = resolve(publicDir, `icon-${size}.png`)
  writeFileSync(out, png)
  console.log(`wrote ${out} (${png.length} bytes)`)
}
