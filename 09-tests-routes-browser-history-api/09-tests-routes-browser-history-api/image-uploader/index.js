// const IMGUR_CLIENT_ID = "28aaa2e823b03b1";
const IMGUR_CLIENT_ID = "5960b6f7d81a3c1";

// throws FetchError if upload failed
export default class ImageUploader {
  async upload(file) {

    const formData = new FormData();

    formData.append('image', file);
    formData.append('name', 'John');

    try {
      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          Authorization: `Client-ID ${IMGUR_CLIENT_ID}`
        },
        body: formData,
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }
}
