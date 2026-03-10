import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import Select from "react-select"
import api from "../api/axios"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

export default function Editor(){

  const { id } = useParams()

  const [title,setTitle] = useState("")
  const [content,setContent] = useState("")
  const [category,setCategory] = useState("bollywood")
  const [tags,setTags] = useState([])
  const [videoUrl,setVideoUrl] = useState("")
  const [seoTitle,setSeoTitle] = useState("")
  const [seoDescription,setSeoDescription] = useState("")
  const [image,setImage] = useState(null)
  const [status,setStatus] = useState("draft")
  const [preview,setPreview] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {

  if(!id) return

  const loadArticle = async () => {

    const res = await api.get(`/articles/edit/${id}`)

    const article = res.data

    setTitle(article.title)
    setContent(article.content)
    setCategory(article.category)
    setTags(article.tags || [])
    setVideoUrl(article.videoUrl)
    setSeoTitle(article.seoTitle)
    setSeoDescription(article.seoDescription)

  }

  loadArticle()

},[id])

  const uploadImage = async () => {

    if(!image) return ""

    const formData = new FormData()
    formData.append("image", image)

    const res = await api.post("/upload/image", formData)

    return res.data.url
  }

  const publish = async () => {

  const imageUrl = await uploadImage()

  if(id){

  await api.put(`/articles/${id}`,{
    title,
    content,
    category,
    tags: tags,
    videoUrl,
    seoTitle,
    seoDescription,
    status
  })

}else{

  await api.post("/articles",{
    title,
    content,
    category,
    tags: tags.split(","),
    videoUrl,
    seoTitle,
    seoDescription,
    status
  })

}

  alert("Article published!")

  navigate("/")   // redirect to homepage
}

  return(

    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Article Editor
      </h1>

      {/* TITLE */}

      <input
        placeholder="Article Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
      />

      {/* CATEGORY */}

      <Select
        placeholder="Category"
        value={{ label: category.charAt(0).toUpperCase() + category.slice(1), value: category }}
        onChange={(selected) => setCategory(selected.value)}
        options={[
          { label: "Bollywood", value: "bollywood" },
          { label: "Hollywood", value: "hollywood" },
          { label: "TV Serials", value: "tv" },
          { label: "Web Series", value: "webseries" },
          { label: "Music", value: "music" },
          { label: "Reviews", value: "reviews" }
        ]}
        className="mb-4"
      />

      {/* IMAGE */}

      <input
        type="file"
        onChange={(e)=>setImage(e.target.files[0])}
        className="mb-4"
      />

      {/* VIDEO */}

      <input
        placeholder="Video URL (YouTube/Vimeo)"
        value={videoUrl}
        onChange={(e)=>setVideoUrl(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
      />

      {/* TAGS */}

      <Select
        isMulti
        placeholder="Tags"
        value={tags.map(tag => ({ label: tag, value: tag }))}
        onChange={(selected) => setTags(selected ? selected.map(s => s.value) : [])}
        className="mb-4"
      />

      {/* CONTENT */}

      <ReactQuill
        value={content}
        onChange={setContent}
        className="mb-6"
      />

      {/* SEO */}

      <h2 className="text-xl font-bold mt-6 mb-2">
        SEO Settings
      </h2>

      <input
        placeholder="SEO Title"
        value={seoTitle}
        onChange={(e)=>setSeoTitle(e.target.value)}
        className="border p-3 w-full mb-3 rounded"
      />

      <textarea
        placeholder="SEO Description"
        value={seoDescription}
        onChange={(e)=>setSeoDescription(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
      />

      {/* STATUS */}

      <Select
        placeholder="Status"
        value={{ label: status.charAt(0).toUpperCase() + status.slice(1), value: status }}
        onChange={(selected) => setStatus(selected.value)}
        options={[
          { label: "Draft", value: "draft" },
          { label: "Published", value: "published" }
        ]}
        className="mb-6"
      />


      {/* BUTTONS */}

      <div className="flex gap-4">

        <button
          onClick={()=>setPreview(!preview)}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Preview
        </button>

        <button
          onClick={publish}
          className="bg-red-600 text-white px-6 py-2 rounded"
        >
          Save Article
        </button>

      </div>


      {/* PREVIEW */}

      {preview && (

        <div className="mt-10 border-t pt-6">

          <h2 className="text-2xl font-bold mb-4">
            Article Preview
          </h2>

          <h3 className="text-xl font-bold">
            {title}
          </h3>

          <div
            dangerouslySetInnerHTML={{__html:content}}
            className="mt-4"
          />

        </div>

      )}

    </div>

  )

}