import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import api from "../api/axios"
import BackButton from "../components/ui/BackButton"

export default function ArticlePage() {

  const { slug } = useParams()

  const { data } = useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      const res = await api.get(`/articles/${slug}`)
      return res.data
    }
  })

  const like = async()=>{

  await api.post(`/articles/like/${data._id}`)

  window.location.reload()

}

  if (!data) return <p>Loading...</p>

  return (
    

    <div className="max-w-4xl mx-auto p-6">
      <BackButton/>

      <h1 className="text-4xl font-bold mb-4">
        {data.title}
      </h1>

      <img src={data.featuredImage} className="mb-6"/>

      <div
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
      <button
 onClick={like}
 className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
>
❤️ Like ({data.likes})
</button>

    </div>

  )
}