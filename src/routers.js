const express = require("express");
const router = express();
const {
  uploadSingleFile,
  uploadMultipleFiles,
  showThisFile,
} = require("./controllers/files");
const multer = require("./utils/multer");

router.post("/upload", multer.single("photo"), uploadSingleFile);
router.post("/upload-multiple", multer.array("photo"), uploadMultipleFiles);
router.get("/files/:id", showThisFile);

module.exports = router;
