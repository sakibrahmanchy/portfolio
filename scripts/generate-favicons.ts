import sharp from 'sharp'

async function generateFavicons() {
  const source = './public/sakibur.png'

  // Generate favicon.ico (32x32)
  await sharp(source)
    .resize(32, 32)
    .toFile('./public/icon.png')

  // Generate apple-touch-icon (180x180)
  await sharp(source)
    .resize(180, 180)
    .toFile('./public/apple-icon.png')

  // Generate favicon.ico
  await sharp(source)
    .resize(32, 32)
    .toFile('./public/favicon.ico')
}

generateFavicons().catch(console.error) 