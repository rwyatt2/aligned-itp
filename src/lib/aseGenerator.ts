/**
 * aseGenerator.ts
 *
 * Generates an Adobe Swatch Exchange (.ase) binary file from brand colors.
 * This format can be imported directly into Photoshop, Illustrator, InDesign,
 * Sketch, Figma, and other design tools.
 *
 * Spec reference: http://www.selapa.net/swatchbooker/ase-spec.php
 */

import { brandColors, type ColorData } from './colors'

// ─── Helpers ────────────────────────────────────────────────────────────────

function hexToRgbFloat(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return [r, g, b]
}

function encodeUTF16BE(str: string): Uint8Array {
  // Null-terminated UTF-16 Big Endian
  const bytes = new Uint8Array((str.length + 1) * 2)
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i)
    bytes[i * 2] = (code >> 8) & 0xff
    bytes[i * 2 + 1] = code & 0xff
  }
  // Null terminator already 0x00 0x00 by default
  return bytes
}

function writeUint16BE(value: number): Uint8Array {
  const buf = new Uint8Array(2)
  buf[0] = (value >> 8) & 0xff
  buf[1] = value & 0xff
  return buf
}

function writeUint32BE(value: number): Uint8Array {
  const buf = new Uint8Array(4)
  buf[0] = (value >> 24) & 0xff
  buf[1] = (value >> 16) & 0xff
  buf[2] = (value >> 8) & 0xff
  buf[3] = value & 0xff
  return buf
}

function writeFloat32BE(value: number): Uint8Array {
  const buf = new ArrayBuffer(4)
  const view = new DataView(buf)
  view.setFloat32(0, value, false) // big-endian
  return new Uint8Array(buf)
}

// ─── ASE File Builder ───────────────────────────────────────────────────────

function buildColorEntry(color: ColorData): Uint8Array {
  const nameBytes = encodeUTF16BE(color.name)
  const nameLen = nameBytes.length / 2 // in 16-bit chars including null terminator

  // Color data: 'RGB ' (4 bytes) + 3 floats (12 bytes) = 16 bytes
  // Color mode: 2 bytes (0 = global)
  const colorDataSize = 2 + nameLen * 2 + 4 + 12 + 2

  const parts: Uint8Array[] = []

  // Block type: 0x0001 = color entry
  parts.push(writeUint16BE(0x0001))

  // Block length
  parts.push(writeUint32BE(colorDataSize))

  // Name length (in 16-bit chars, including null terminator)
  parts.push(writeUint16BE(nameLen))

  // Name data (UTF-16 BE, null-terminated)
  parts.push(nameBytes)

  // Color model: 'RGB '
  parts.push(new Uint8Array([0x52, 0x47, 0x42, 0x20])) // R G B space

  // Color values (3 × float32 BE)
  const [r, g, b] = hexToRgbFloat(color.hex)
  parts.push(writeFloat32BE(r))
  parts.push(writeFloat32BE(g))
  parts.push(writeFloat32BE(b))

  // Color type: 0 = Global
  parts.push(writeUint16BE(0x0000))

  // Concatenate all parts
  const total = parts.reduce((sum, p) => sum + p.length, 0)
  const result = new Uint8Array(total)
  let offset = 0
  for (const part of parts) {
    result.set(part, offset)
    offset += part.length
  }
  return result
}

function buildGroupStart(groupName: string): Uint8Array {
  const nameBytes = encodeUTF16BE(groupName)
  const nameLen = nameBytes.length / 2

  const parts: Uint8Array[] = []

  // Block type: 0xC001 = group start
  parts.push(writeUint16BE(0xc001))

  // Block length
  parts.push(writeUint32BE(2 + nameLen * 2))

  // Name length
  parts.push(writeUint16BE(nameLen))

  // Name data
  parts.push(nameBytes)

  const total = parts.reduce((sum, p) => sum + p.length, 0)
  const result = new Uint8Array(total)
  let offset = 0
  for (const part of parts) {
    result.set(part, offset)
    offset += part.length
  }
  return result
}

function buildGroupEnd(): Uint8Array {
  const parts: Uint8Array[] = []
  // Block type: 0xC002 = group end
  parts.push(writeUint16BE(0xc002))
  // Block length: 0
  parts.push(writeUint32BE(0))

  const total = parts.reduce((sum, p) => sum + p.length, 0)
  const result = new Uint8Array(total)
  let offset = 0
  for (const part of parts) {
    result.set(part, offset)
    offset += part.length
  }
  return result
}

/**
 * Generate an Adobe Swatch Exchange (.ase) binary blob from brand colors.
 */
export function generateAseBlob(): Blob {
  const blocks: Uint8Array[] = []

  // Group wrapper
  blocks.push(buildGroupStart('Aligned Technology Partners'))

  for (const color of brandColors) {
    blocks.push(buildColorEntry(color))
  }

  blocks.push(buildGroupEnd())

  // Count total blocks (group start + N colors + group end)
  const blockCount = 1 + brandColors.length + 1

  // Build header
  const header: Uint8Array[] = []

  // Signature: 'ASEF'
  header.push(new Uint8Array([0x41, 0x53, 0x45, 0x46]))

  // Version: 1.0
  header.push(writeUint16BE(1))
  header.push(writeUint16BE(0))

  // Number of blocks
  header.push(writeUint32BE(blockCount))

  // Concatenate header + blocks
  const allParts = [...header, ...blocks]
  const totalSize = allParts.reduce((sum, p) => sum + p.length, 0)
  const file = new Uint8Array(totalSize)
  let offset = 0
  for (const part of allParts) {
    file.set(part, offset)
    offset += part.length
  }

  return new Blob([file], { type: 'application/octet-stream' })
}
