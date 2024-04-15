import express, { Router } from 'express'
import { auth } from '../middleware/auth.js'
// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/auth");
// const { fnSequelize } = require("../db/config");

// const multer = require("multer");
// const path = require("path");

import multer from 'multer'
import path from 'path'
import * as url from 'url'
import { tokenApi } from '../middleware/tokenApi.js'

export const routerImages = Router()

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const dir = path.join(__dirname, 'images')
routerImages.use(express.static(dir))

routerImages.get('/uploads/:img', function (req, res) {
  console.log(dir)
  const img = req.params.img
  const pFinal = dir.replace('routes\\', '')
  console.log(`${pFinal}/${img}`)
  res.sendFile(`${pFinal}/${img}`)
})

// routes uploadFile
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

routerImages.post(
  '/uploads',
  tokenApi,
  auth,
  upload.single('file'),
  function (req, res) {
    res.json({ msg: 'imagen ok' })
  }
)
