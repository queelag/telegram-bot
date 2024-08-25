import sharp from 'sharp'

export const BOT_ID: number = Number(process.env.VITE_BOT_ID)
export const BOT_NAME: string = process.env.VITE_BOT_NAME ?? ''
export const BOT_TOKEN: string = process.env.VITE_BOT_TOKEN ?? ''
export const GROUP_CHAT_ID: number = Number(process.env.VITE_GROUP_CHAT_ID)
export const PRIVATE_CHAT_ID: number = Number(process.env.VITE_PRIVATE_CHAT_ID)

export const SQUARE_512_WEBP: Buffer = await sharp({ create: { background: 'black', channels: 3, height: 512, width: 512 } })
  .webp()
  .toBuffer()

export const SQUARE_1024_WEBP: Buffer = await sharp({ create: { background: 'black', channels: 3, height: 1024, width: 1024 } })
  .webp()
  .toBuffer()

export const STRIPE_TOKEN: string = process.env.VITE_STRIPE_TOKEN ?? ''
export const SUPER_GROUP_CHAT_ID: number = Number(process.env.VITE_SUPER_GROUP_CHAT_ID)
