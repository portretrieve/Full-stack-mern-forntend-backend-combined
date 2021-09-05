const multer = require("multer");

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, filee, callBack) => {
      callBack(null, "uploads/images");
    }
  })
});

module.exports = fileUpload;
