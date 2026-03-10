import { Link } from "react-router-dom"

export default function HeroSlider({articles}){

  const hero = articles.slice(0,3)

  return(

    <div className="grid md:grid-cols-3 gap-6 mb-10">

      {hero.map(article=>(

        <Link
          key={article._id}
          to={`/article/${article.slug}`}
          className="relative group"
        >

          <img
            src={article.featuredImage}
            className="h-72 w-full object-cover rounded-lg"
          />

          <div className="absolute bottom-0 bg-black/60 text-white p-4 w-full">

            {article.title}

          </div>

        </Link>

      ))}

    </div>

  )

}