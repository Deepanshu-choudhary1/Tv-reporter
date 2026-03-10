import express from "express"

import {

  createArticle,
  getArticles,
  getArticle,
  getArticleById,
  likeArticle,
  updateArticle,
  deleteArticle,
  getTrending

} from "../controllers/article.controller.js"

import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()



router.get("/", getArticles)

router.get("/trending", getTrending)

router.get("/edit/:id", getArticleById)

router.get("/:slug", getArticle)



router.post("/", authMiddleware, createArticle)

router.put("/:id", authMiddleware, updateArticle)

router.delete("/:id", authMiddleware, deleteArticle)



router.post("/like/:id", likeArticle)



export default router