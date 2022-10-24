const path = require('path');
const multer = require('multer');
const express = require('express');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, file.filename())
    }
});