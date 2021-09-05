const multer = require("multer");
const uuid = require("uuid");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg"
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, filee, callBack) => {
      callBack(null, "uploads/images");
    },
    filename: (req, file, callBack) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      callBack(null);
    }
  })
});

module.exports = fileUpload;
