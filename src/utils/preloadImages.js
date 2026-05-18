/**
 * Preloads assets, including images and other file types.
 * @param {Array<{ imageUrl?: string, url?: string }|string>} items
 * @returns {Promise<{ loadedAssets: Array<any>, shouldLoadNext: boolean }>}
 */
export function preloadAsset(items = []) {
  const getUrl = (item) => {
    if (!item) return ''
    if (typeof item === 'string') return item
    return item.imageUrl || item.url || ''
  }

  const loadOne = (assetUrl) => {
    if (!assetUrl) {
      return Promise.resolve(null)
    }

    const lower = assetUrl.toLowerCase()
    const isImage = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'].some((ext) => lower.endsWith(ext))

    if (isImage) {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = assetUrl

        img.onload = () => resolve(img)
        img.onerror = () => {
          console.error(`Failed to load asset: ${assetUrl}`)
          resolve(null)
        }
      })
    }

    return fetch(assetUrl, { cache: 'force-cache' })
      .then((response) => (response.ok ? response : null))
      .catch((error) => {
        console.error(`Failed to preload asset: ${assetUrl}`, error)
        return null
      })
  }

  const promises = items.map((item) => loadOne(getUrl(item)))

  return Promise.all(promises).then((loadedAssets) => ({
    loadedAssets,
    shouldLoadNext: loadedAssets.some((asset) => asset !== null)
  }))
}
