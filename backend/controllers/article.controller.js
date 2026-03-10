import Article from "../models/Article.js"
import { createSlug } from "../utils/slugify.js"

export const createArticle = async (req,res)=>{

  const article = new Article({

    ...req.body,

    slug:createSlug(req.body.title)

  })

  await article.save()

  res.json(article)

}

export const getArticleById = async (req, res) => {

  try {

    const article = await Article.findById(req.params.id)

    if (!article) {
      return res.status(404).json({ message: "Article not found" })
    }

    res.json(article)

  } catch (error) {

    res.status(500).json({ message: "Server error" })

  }

}



export const updateArticle = async (req,res)=>{

  const article = await Article.findByIdAndUpdate(

    req.params.id,

    req.body,

    {new:true}

  )

  res.json(article)

}



export const deleteArticle = async (req,res)=>{

  await Article.findByIdAndDelete(req.params.id)

  res.json({message:"Article deleted"})

}



export const getArticles = async (req,res)=>{

  const { page=1, limit=10, category, search } = req.query

  const filter={}

  if(category) filter.category = category

  if(search){

    filter.$text = { $search:search }

  }

  const articles = await Article
    .find(filter)
    .sort({createdAt:-1})
    .skip((page-1)*limit)
    .limit(limit)

  res.json(articles)

}



export const getArticle = async (req,res)=>{

  const article = await Article.findOne({slug:req.params.slug})

  if(!article){

    return res.status(404).json({
      message:"Article not found"
    })

  }

  article.views++

  await article.save()

  res.json(article)

}



export const likeArticle = async (req,res)=>{

  const article = await Article.findById(req.params.id)

  article.likes++

  await article.save()

  res.json({likes:article.likes})

}



export const getTrending = async (req,res)=>{

  const articles = await Article
    .find()
    .sort({views:-1, likes:-1})
    .limit(5)

  res.json(articles)

}