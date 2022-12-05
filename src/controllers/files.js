const { uploadFile, showFile } = require("../utils/storage");

const uploadSingleFile = async (req, res) => {
  const { file } = req;

  try {
    const photo = await uploadFile(
      `imagens/${file.originalname}`,
      file.buffer,
      file.mimetype
    );

    return res.status(201).json(photo);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

const uploadMultipleFiles = async (req, res) => {
  const { files } = req;

  try {
    const allFiles = [];

    for (let file of files) {
      const photo = await uploadFile(
        `imagens/${file.originalname}`,
        file.buffer,
        file.mimetype
      );

      allFiles.push(photo);
    }

    return res.status(201).json(allFiles);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

const showThisFile = async (req, res) => {
  const { id } = req.params;

  try {
    const files = await showFile();
    const keys = [];

    for (let file of files) {
      keys.push(file.Key);
    }

    const thisFile = keys.filter((key) => {
      if (key.includes(id + ".")) {
        return key;
      }
    });

    if (thisFile.length < 1) {
      return res
        .status(404)
        .json({ mensagem: "We didn't found the photo your looking for :(" });
    }

    return res
      .status(200)
      .json(
        `https://collage-generator.s3.us-west-004.backblazeb2.com/${thisFile}`
      );
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles,
  showThisFile,
};
