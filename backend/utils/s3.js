const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const config = require("../config");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const s3 = new S3Client({
  credentials: {
    accessKeyId: config.s3.accessKey,
    secretAccessKey: config.s3.secretAccessKey,
  },
  region: "us-west-1",
});

const s3Storage = multerS3({
  s3,
  bucket: "amazingimg",
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    const fileName =
      "products/" +           // Storing under products folder
      req.user.id + "/" +     // User's unique folder
      Date.now() + "_" +      // Timestamp to ensure unique filename
      file.originalname;      // The original uploaded filename
    cb(null, fileName);
  },
});
const s3ReviewStorage = multerS3({
  s3,
  bucket: "amazingimg",
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    const fileName =
      "reviewImages/" +
      req.user.id +
      `/${req.params.reviewId}/` +
      Date.now() +
      "_" +
      file.originalname;
    cb(null, fileName);
  },
});

function sanitizeFile(file, cb) {
  // Define the allowed extension
  const fileExts = [".png", ".jpg", ".jpeg", ".gif"];

  // Check allowed extensions
  const isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  );

  const isAllowedMimeType = file.mimetype.startsWith("image/");

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true);
  } else {
    cb("Error: File type not allowed!");
  }
}

const deleteS3Obj = async (key) => {
  const command = new DeleteObjectCommand({
    Bucket: "amazingimg",
    Key: key,
  });
  try {
    const response = await s3.send(command);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { s3, s3Storage, sanitizeFile, s3ReviewStorage, deleteS3Obj };
