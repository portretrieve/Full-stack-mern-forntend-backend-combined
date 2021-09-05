const multer = require("multer");
const uuidv4 = require("uuid");

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
      callBack(null, uuid.v4() + "." + ext);
    }
  }),
  fileFilter: (req, file, callBack) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type");
    callBack(error, isValid);
  }
});

module.exports = fileUpload;
