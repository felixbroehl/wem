const fs = require('fs');
const { pipeline } = require('stream');

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile('public/index.html');
});
const multiUpload = upload.fields([
    { name: 'file1', maxCount: 1 },
    { name: 'file2', maxCount: 1 }
])
app.post('/upload', multiUpload, (req, res) => {
    pipeline(fs.createReadStream(req.files.file1[0].path), res, () => {});
    pipeline(fs.createReadStream(req.files.file2[0].path), res, () => {});
});
app.listen(3000, () => console.log('server started'));