import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import api from "../api/axios"
import ArticleGrid from "../components/article/ArticleGrid"
import BackButton from "../components/ui/BackButton"

export default function CategoryPage(){

  const { name } = useParams()

  const { data } = useQuery({

    queryKey:["category",name],

    queryFn: async()=>{

      const res = await api.get(`/articles?category=${name}`)

      return res.data

    }

  })

  if(!data) return <p className="p-6">Loading...</p>

  return(

    <div className="max-w-7xl mx-auto p-6">
      <BackButton/>

      <h1 className="text-3xl font-bold mb-6 capitalize">
        {name} News
      </h1>

      <ArticleGrid articles={data}/>

    </div>

  )

}