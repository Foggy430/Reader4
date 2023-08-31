const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");

// Установка папки для сохранения загруженных PDF-файлов
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploaded_pdfs");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, "public")));

app.post("/upload", upload.single("pdf"), function(req, res) {
    res.send("PDF file uploaded successfully!");
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});