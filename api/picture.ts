import axios from 'axios';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Proxy for picsum, cause it do not work in Russia
export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { width = '1000', height = width } = request.query;
  // Narrow params to strings
  if (!Array.isArray(width) && !Array.isArray(height)) {
    // Get image with provided params
    const image = await axios
      .get(`https://picsum.photos/${width}/${height}`, {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          return Buffer.from(res.data);
        }
      });

    // Send image file
    return response
      .status(200)
      .setHeader('Content-Type', 'image/png')
      .send(image);
  }

  // Ignore request if params is incorrect
  return response.status(200);
}
