/**
 * Preloads an array of image URLs and resolves when all images are loaded.
 * @param {string[]} urls - Array of image URL strings
 * @returns {Promise<HTMLImageElement[]>} - Resolves with the loaded HTMLImageElement array
 */
export function preloadImages(items = []) {
  const promises = items.map(item => {
    const url = item && item.imageUrl ? item.imageUrl : '';
    return new Promise(resolve => {
      const img = new Image();
      img.src = url;

      img.onload = () => resolve(img);
      img.onerror = () => {
        console.error(`Failed to load image: ${url}`);
        resolve(null);
      };
    });
  });

  return Promise.all(promises).then(images => ({
    loadedImages: images,
    shouldLoadNext: images.some(img => img instanceof HTMLImageElement)
  }));
}