const axios = require('axios');

export default async function handler(request, response) {
  const { width = 1000, height = width } = request.query;
  const image = await axios
    .get(`https://picsum.photos/${width}/${height}`, {
      responseType: 'arraybuffer',
    })
    .then((res) => Buffer.from(res.data));
  return response
    .status(200)
    .setHeader('Content-Type', 'image/png')
    .send(image);
}
