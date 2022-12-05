const aws = require("aws-sdk");

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);
const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.APP_KEY,
  },
});

const uploadFile = async (name, buffer, type) => {
  try {
    const photo = await s3
      .upload({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: name,
        Body: buffer,
        ContentType: type,
      })
      .promise();

    return photo.Location;
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

const showFile = async () => {
  try {
    const files = await s3
      .listObjects({
        Bucket: process.env.BACKBLAZE_BUCKET,
      })
      .promise();

    return files.Contents;
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

module.exports = { uploadFile, showFile };
