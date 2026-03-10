import { useQuery } from "@tanstack/react-query"
import api from "../api/axios"
import ArticleGrid from "../components/article/ArticleGrid"

export default function Home(){

  const {data} = useQuery({

    queryKey:["articles"],

    queryFn: async()=>{

      const res = await api.get("/articles")

      return res.data

    }

  })

  if(!data) return <p className="p-6">Loading...</p>

  const trending = [...data]
  .sort((a,b)=>(b.views+b.likes)-(a.views+a.likes))
  .slice(0,5)

  const hero = data[0]

  return(

    <div className="max-w-7xl mx-auto px-6 py-8">


      {/* HERO ARTICLE */}

      {hero && (

        <div className="grid md:grid-cols-2 gap-6 mb-12">

          <img
            src={hero.featuredImage}
            className="w-full h-80 object-cover rounded-xl"
          />

          <div>

            <span className="text-red-600 font-bold uppercase text-sm">
              Featured
            </span>

            <h1 className="text-3xl font-bold mt-3">
              {hero.title}
            </h1>

            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Trending entertainment news from Bollywood, Hollywood and TV.
            </p>

          </div>

        </div>

      )}


      {/* MAIN GRID */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* NEWS */}

        <div className="md:col-span-3">

          <h2 className="text-2xl font-bold mb-6">
            Latest News
          </h2>

          <ArticleGrid articles={data}/>

        </div>


        {/* TRENDING SIDEBAR */}

        <aside>

          <h3 className="font-bold text-xl mb-4">
            🔥 Trending
          </h3>

          <div className="space-y-4">

            {trending.map(article=>(
              <div key={article._id}>

                <a
                  href={`/article/${article.slug}`}
                  className="font-medium hover:text-red-600"
                >
                  {article.title}
                </a>

              </div>
            ))}

          </div>

        </aside>

      </div>

    </div>

  )

}