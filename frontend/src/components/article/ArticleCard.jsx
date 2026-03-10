import { Link } from "react-router-dom"

export default function ArticleCard({article}){

  return(

    <Link to={`/article/${article.slug}`}>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition overflow-hidden">

        <img
          src={article.featuredImage}
          className="w-full h-52 object-cover"
        />

        <div className="p-4">

          <span className="text-xs uppercase text-red-600 font-bold">
            {article.category}
          </span>

          <h2 className="font-semibold text-lg mt-2 leading-snug">
            {article.title}
          </h2>

          <div className="flex justify-between mt-4 text-sm text-gray-500">

            <span>👁 {article.views}</span>

            <span>❤️ {article.likes}</span>

          </div>

        </div>

      </div>

    </Link>

  )

}