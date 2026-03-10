import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../api/axios"
import { Link } from "react-router-dom"
import BackButton from "../components/ui/BackButton"

export default function Dashboard(){

  const queryClient = useQueryClient()

  const { data } = useQuery({

    queryKey:["adminArticles"],

    queryFn: async()=>{

      const res = await api.get("/articles")

      return res.data

    }

  })

  const deleteMutation = useMutation({

    mutationFn: (id) => api.delete(`/articles/${id}`),

    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ["adminArticles"] })

    }

  })

  if(!data) return <p>Loading...</p>

  return(

    <div className="max-w-6xl mx-auto p-6">

      <BackButton/>

      <div className="flex justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <Link
          to="/admin/editor"
          className="bg-black text-white px-4 py-2"
        >
          New Article
        </Link>

      </div>

      <div className="space-y-4">

        {data.map(article=>(
          <div
           key={article._id}
           className="border p-4 rounded flex justify-between items-center"
          >

            <span>
              {article.title}
            </span>

            <span>
              {article.status}
            </span>

            <div className="flex gap-2">

              <Link
  to={`/admin/editor/${article._id}`}
  className="text-blue-600"
>
  Edit
</Link>

              <button
                onClick={() => deleteMutation.mutate(article._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>

  )

}